# 04 — Backend: leads, admin, security

## Architecture in one picture
```
Browser (Contact form)
  └─ POST /api/leads ──► [validate Zod] ─► [honeypot + time-trap] ─► [Turnstile verify]
                            ─► [rate limit by ip_hash in DB] ─► insert (service-role) ─► 201
Browser (Admin)
  └─ /admin/login ─► POST /api/admin/login ─► Supabase Auth (email+password) ─► httpOnly cookies
  └─ /admin (server component) ─► verify session + ADMIN_EMAILS ─► query leads (service-role)
  └─ PATCH/DELETE /api/admin/leads/[id], GET /api/admin/leads/export  (same auth guard)
```
**Why this is safe:** RLS is on with *no* public policies, so the anon key can't touch `leads`. The service-role key only exists in server code/env. Every admin route re-checks the session *and* the email allowlist (defence in depth; never trust middleware alone).

## Setup steps
1. Supabase → new project, **region Mumbai (ap-south-1)**.
2. SQL editor → run `supabase/schema.sql`.
3. Authentication → Users → add admin user (email + strong password). Disable public sign-ups (Auth → Providers → Email → turn off "Allow new users to sign up").
4. Cloudflare Turnstile → add site → get site key + secret (dummy keys in `.env.example` work for local dev).
5. Copy `.env.example` → `.env.local`, fill values. Add the same vars in Vercel (Production + Preview).
6. Vercel project settings → Function region **bom1**.

## Validation (`src/lib/validation.ts`, shared by client + server)
```ts
import { z } from "zod";

export const CITIES = ["Delhi NCR","Mumbai","Bengaluru","Hyderabad","Chennai","Kolkata","Pune","Ahmedabad","Jaipur","Lucknow","Chandigarh","Kochi","Indore","Other"] as const;
export const SERVICES = ["Website","AI chatbot / receptionist","Growth (SEO / Ads / Social)","Data and reporting","Accessibility","Support","Not sure yet"] as const;
export const BUDGETS = ["Under ₹25,000","₹25,000–75,000","₹75,000–2,00,000","₹2,00,000+","Not sure"] as const;

// strip +91 / 0 / spaces / dashes first, then require a 10-digit mobile starting 6-9
export const normalizePhone = (v: string) => v.replace(/[\s-]/g, "").replace(/^(\+91|91|0)/, "");

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(254),
  phone: z.string().transform(normalizePhone).refine(v => /^[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile number"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.enum(CITIES, { message: "Choose your city" }),
  service: z.enum(SERVICES, { message: "Choose a service" }),
  budget: z.enum(BUDGETS).optional(),
  contactPref: z.enum(["whatsapp","call","email"]).default("whatsapp"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Please agree so we can contact you" }),
  // spam fields
  website: z.string().max(0).optional(),              // honeypot: must stay empty (hidden, aria-hidden, tabindex -1)
  startedAt: z.number().int(),                        // time-trap: ms timestamp when form rendered
  turnstileToken: z.string().min(1, "Please complete the verification"),
});
export type LeadInput = z.infer<typeof leadSchema>;
```

## Spam protection layers (explain all four in the interview)
| Layer | What it stops | Implementation |
|---|---|---|
| **Honeypot** | Dumb bots that fill every field | Hidden `website` input. If non-empty → return **201 success** silently (don't tip off the bot), insert nothing |
| **Time-trap** | Bots that submit instantly | Reject if `now - startedAt < 3000ms` or `> 2h` (stale form). Return 400 with friendly message |
| **Cloudflare Turnstile** | Smarter bots | Server-side `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` with secret + token + remote IP. Reject on `success:false`. Load the widget script **lazily** (on first field focus / IntersectionObserver) for PageSpeed |
| **Rate limit** | Floods from one source | Count rows with same `ip_hash` in last 10 min; if ≥ 3 → **429** with `Retry-After`. `ip_hash = sha256(ip + IP_HASH_SALT)`; raw IP never stored. Get IP from `x-forwarded-for` (first value) |

Also: reject bodies > 10 KB, require `Content-Type: application/json`, return the same generic error for unknown failures (never leak stack traces), log server errors with `console.error` only.

## API contract
All responses: `{ ok: boolean, data?: T, error?: { code: string, message: string, fields?: Record<string,string> } }`

| Method + path | Auth | Success | Errors |
|---|---|---|---|
| `POST /api/leads` | public | `201 { ok:true, data:{ id } }` | `400 invalid_json/too_fast`, `403 turnstile_failed`, `422 validation_failed (fields)`, `429 rate_limited`, `500 server_error` |
| `POST /api/admin/login` | public | `200` + cookies | `401 invalid_credentials`, `403 not_admin`, `429` |
| `POST /api/admin/logout` | admin | `200` | — |
| `GET /api/admin/leads?status=&q=&page=&pageSize=` | admin | `200 { items, total, page }` | `401`, `403` |
| `PATCH /api/admin/leads/[id]` body `{ status?, notes? }` | admin | `200 { lead }` | `401`, `403`, `404`, `422` |
| `DELETE /api/admin/leads/[id]` | admin | `200` | `401`, `403`, `404` |
| `GET /api/admin/leads/export?status=&q=` | admin | `200 text/csv` attachment | `401`, `403` |

Login hardening: generic "Invalid email or password" message, small server-side delay on failure, rate-limit by ip_hash (reuse a tiny `login_attempts` approach or count via Supabase Auth's built-in limits and document it).

## Admin auth guard (`src/lib/supabase/admin.ts`)
```ts
export async function requireAdmin() {
  const supabase = await createServerClient();              // @supabase/ssr, reads cookies
  const { data: { user } } = await supabase.auth.getUser(); // getUser() validates the JWT with Supabase; do NOT trust getSession() on the server
  const allow = (process.env.ADMIN_EMAILS ?? "").split(",").map(s => s.trim().toLowerCase());
  if (!user) throw new HttpError(401, "unauthenticated");
  if (!user.email || !allow.includes(user.email.toLowerCase())) throw new HttpError(403, "not_admin");
  return user;
}
```
- Middleware (`middleware.ts`; in Next.js 16+ the file is named `proxy.ts` — check the docs for the installed version) redirects unauthenticated `/admin/*` (except `/admin/login`) to login and refreshes the session cookie.
- `/admin` pages and every admin route handler call `requireAdmin()` themselves.
- Admin pages: `export const dynamic = "force-dynamic"`, `robots: noindex`, excluded from sitemap and `robots.txt`.

## Admin dashboard features (P0 → P2)
- **P0:** table (name, phone, city, service, budget, status, created), status dropdown (New/Contacted/Won/Lost) with optimistic update, delete with confirm, logout.
- **P0:** counts per status at top; search (name/email/phone/company); status filter; pagination (20/page).
- **P1:** lead detail drawer with message + notes (editable), "Open WhatsApp" link `https://wa.me/91XXXXXXXXXX`, mailto link, copy phone.
- **P1:** CSV export. Sanitise cells starting with `= + - @` by prefixing `'` (CSV injection) and quote fields.
- **P2:** sort, date range, empty/loading/error states polished.

## Error handling pattern
```ts
// src/lib/http.ts
export class HttpError extends Error { constructor(public status:number, public code:string, msg?:string, public fields?:Record<string,string>){ super(msg ?? code) } }
export const ok = <T>(data:T, status=200) => Response.json({ ok:true, data }, { status });
export const fail = (e:unknown) => {
  if (e instanceof HttpError) return Response.json({ ok:false, error:{ code:e.code, message:e.message, fields:e.fields } }, { status:e.status });
  console.error(e);
  return Response.json({ ok:false, error:{ code:"server_error", message:"Something went wrong. Please try again." } }, { status:500 });
};
```
Client form: disable submit while pending, show field-level errors from `fields`, keep user input on failure, focus first invalid field, `aria-live="polite"` status region, success state replaces form.

## Test checklist (do all before submit)
- [ ] Valid submit → row appears in Supabase and in /admin
- [ ] Phone `+91 98765 43210`, `09876543210` and `9876543210` all normalise to `9876543210`; `5123456789` rejected
- [ ] Honeypot filled → no row, user still sees success
- [ ] Submit < 3s after load → rejected
- [ ] Turnstile token missing/invalid → 403
- [ ] 4th submit in 10 min from same IP → 429
- [ ] `/admin` while logged out → redirect to login; `/api/admin/leads` without cookie → 401
- [ ] Logged in as a non-allowlisted user → 403
- [ ] `curl` with the anon key directly against Supabase REST `leads` → denied (RLS)
- [ ] `git log -p | grep -i service_role` finds nothing; `.env.local` is in `.gitignore`
- [ ] Update status/notes, delete lead, export CSV all work
