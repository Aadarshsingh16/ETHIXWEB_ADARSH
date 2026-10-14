---
name: leads-backend
description: Use for the Ethixweb enquiry form backend and admin: Supabase schema, POST /api/leads, Zod validation, honeypot, time-trap, Cloudflare Turnstile, rate limiting, admin login/auth guard, /admin dashboard, CSV export, error handling, env vars and secrets.
---

# Leads backend skill

Source of truth: `docs/04-BACKEND.md` and `supabase/schema.sql`. Follow them exactly; if you deviate, say why.

## Non-negotiables
- Real Supabase Postgres. Nothing hardcoded, no mock data in production code paths.
- `SUPABASE_SERVICE_ROLE_KEY` only in server files (`lib/supabase/admin.ts`), never in a `"use client"` file, never `NEXT_PUBLIC_`, never logged, never committed.
- RLS **on**, no policies for anon/authenticated. The browser never talks to the `leads` table.
- Validate with the **same Zod schema** on client and server. The server is the authority; never trust the client.
- Admin authorization = valid Supabase session via `supabase.auth.getUser()` (not `getSession()`) **and** email in `ADMIN_EMAILS`, checked in **every** admin route and page, not only in middleware.
- All API responses use the `{ ok, data?, error? }` shape with correct HTTP status codes. Never leak stack traces or SQL errors.

## POST /api/leads — order of operations
1. Reject non-JSON or body > 10 KB → 400/413.
2. Parse with Zod → 422 with `fields` map on failure.
3. Honeypot `website` non-empty → return 201 `{ ok:true }` and **insert nothing** (silent).
4. Time-trap: `elapsed = now - startedAt`; `< 3000` or `> 7_200_000` → 400 `too_fast` / `expired`.
5. Turnstile server verify (`siteverify` with secret, token, remoteip); fail → 403 `turnstile_failed`.
6. Rate limit: `ip_hash = sha256(ip + IP_HASH_SALT)`; count rows in last 10 min; `>= 3` → 429 + `Retry-After`.
7. Insert with service-role client (map camelCase → snake_case; phone stored as 10 digits). Store `ip_hash`, `user_agent`, `source_page`.
8. 201 `{ ok:true, data:{ id } }`. Any thrown error → `fail(e)` → 500 generic.

## Admin
- `/admin/login` page → POST `/api/admin/login` (server-side `signInWithPassword` via `@supabase/ssr` cookies). Generic error "Invalid email or password". Disable public signups in Supabase.
- `/admin` server component: `requireAdmin()` → fetch leads (service-role) with filters/pagination → render table; mutations via fetch to `PATCH/DELETE /api/admin/leads/[id]`.
- Actions: change status (new/contacted/won/lost), edit notes, delete (confirm), search, filter, export CSV (sanitise `= + - @` leading cells), logout.
- `noindex`, excluded from sitemap/robots, `dynamic = "force-dynamic"`.

## Code organisation
`lib/validation.ts` (Zod + constants) · `lib/http.ts` (HttpError, ok, fail) · `lib/supabase/{server,admin}.ts` · `lib/turnstile.ts` · `lib/rate-limit.ts` · `app/api/**/route.ts` thin handlers calling lib functions. Keep route handlers < 60 lines.

## Client form rules
Visible labels, `autocomplete` attributes, `inputmode`, inline errors from API `fields`, disabled-while-pending, `aria-live` status, preserve input on error, success state, hidden honeypot (`aria-hidden`, `tabIndex={-1}`, `autoComplete="off"`, off-screen via CSS, not `display:none`), Turnstile script loaded lazily on first focus, container min-height 65px.

## Verify (run and show output)
curl cases: valid (201), invalid phone (422), honeypot (201, no row), too fast (400), bad token (403), 4th rapid request (429), admin route without cookie (401), non-allowlisted user (403). Then `git grep -n "service_role\|SUPABASE_SERVICE_ROLE_KEY" -- src` must only hit server files.
