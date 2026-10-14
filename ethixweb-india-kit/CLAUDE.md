# CLAUDE.md — Ethixweb India (Full Stack Developer Assessment)

You are building a submission for the Ethixweb Full Stack Developer assessment: a **redesigned, India-specific version of ethixweb.com**. The human must be able to explain every design and code choice in an interview, so keep code simple, readable and commented where a choice is non-obvious.

## Hard deadline
Submission via https://tally.so/r/KY7Ao8 within 24h of the brief (brief received Tue 13 Oct 2026, 9:26 PM IST → **deadline Wed 14 Oct 2026, 9:26 PM IST**). Late submissions are not reviewed. Plan for feature freeze 3 hours before.

## Judging weights (optimise for these)
Design + India fit 30% · UI/UX 20% · Backend + code 20% · PageSpeed 20% · Detail + polish 10%

## Read these first
- `docs/01-REQUIREMENTS.md` — every requirement as a checklist
- `docs/02-DESIGN-SYSTEM.md` — tokens, components, section layouts
- `docs/03-CONTENT.md` — all copy (no lorem ipsum), EN + HI
- `docs/04-BACKEND.md` — schema, API, auth, spam protection
- `docs/05-PERFORMANCE.md` — PageSpeed 90+ rules
- `docs/06-BUILD-PLAN.md` — phases and cut lines

## Stack (do not change without asking)
- Next.js (latest, App Router) + TypeScript + Tailwind CSS v4
- Supabase: Postgres (leads) + Auth (admin login). `@supabase/ssr`
- Zod validation (shared client/server), honeypot + time-trap + Cloudflare Turnstile + DB-backed rate limit
- Deploy: Vercel, function region `bom1` (Mumbai). Supabase project region: Mumbai (ap-south-1)
- Motion: **CSS only**. No Framer Motion, GSAP, Lottie, WebGL or video backgrounds.

## Non-negotiable rules
1. **Brand:** Ethixweb logo + red (#C1272D, sample the exact hex from the real logo). Red is an accent on a black/white base, never a full-page fill.
2. **No lorem ipsum, no fake clients, no invented testimonials.** Featured work is labelled "Concept project". Only claim numbers that are true (22 services, 6 categories, 4.0 Trustpilot as shown on ethixweb.com). Illustrative prices are labelled "indicative".
3. **No broken links, no console errors, no dead buttons.** Every footer/nav link resolves to a real page.
4. **Secrets only in env vars.** Never commit `.env*` except `.env.example`. Service-role key is server-only, never imported in a client component, never prefixed `NEXT_PUBLIC_`.
5. **Server Components by default.** `"use client"` only when unavoidable (form, reveal observer, language/theme toggle). No Supabase client SDK in public pages.
6. **PageSpeed 90+ on mobile AND desktop** on the deployed production URL. See `docs/05-PERFORMANCE.md`.
7. **Accessibility floor:** semantic landmarks, visible focus, 4.5:1 text contrast, labels on every input, `prefers-reduced-motion` respected, `lang` set (`en` / `hi`).
8. **Mobile first.** Design at 390px, then scale up. Tap targets ≥ 44px.
9. **Error handling:** every API returns JSON `{ ok, data?, error?: { code, message, fields? } }` with correct status codes (400, 401, 403, 404, 409, 422, 429, 500).
10. Run `pnpm lint && pnpm typecheck && pnpm build` before declaring any phase done.

## Skills (in `.claude/skills/`) — use them
| Task | Skill |
|---|---|
| Any UI work | `ethixweb-design-system` |
| Any animation / hover / reveal | `ethixweb-motion` |
| Copy, Hindi, ₹, WhatsApp, phone, city, industries | `india-localization` |
| Leads API, admin, auth, Supabase | `leads-backend` |
| Fonts, images, bundle, Lighthouse | `pagespeed-90` |

## Folder structure
```
src/
  app/
    [lang]/(site)/{page.tsx, services/, about/, contact/, privacy/}   # lang = en | hi
    admin/{login/, page.tsx}
    api/{leads/route.ts, admin/leads/route.ts, admin/leads/[id]/route.ts, admin/leads/export/route.ts, admin/login/route.ts, admin/logout/route.ts}
    sitemap.ts  robots.ts  not-found.tsx  error.tsx
  components/{ui/, sections/, layout/}
  lib/{supabase/{server.ts,admin.ts,middleware.ts}, validation.ts, rate-limit.ts, turnstile.ts, i18n.ts, site.ts}
  content/{en.ts, hi.ts}
  styles/globals.css   # Tailwind @theme tokens
supabase/schema.sql
```

## Working style
- Build in the phases from `docs/06-BUILD-PLAN.md`; finish and verify each before the next.
- After each phase: list what was done, what was verified, what is left.
- If something in the docs conflicts with the brief, the brief (docs/01) wins.
- Prefer small, boring, explainable code over clever code.
- Ask the human before: adding dependencies > 10 kB gzipped, changing the stack, or inventing business claims.
