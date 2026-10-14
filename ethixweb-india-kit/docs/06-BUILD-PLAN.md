# 06 — Build plan (deadline: Wed 14 Oct 2026, 9:26 PM IST)

Work backwards from the deadline. **Feature freeze 3 hours before** (6:26 PM). Last 3 hours = deploy, test, measure, README, video, submit. Submit ~1 hour early (8:30 PM) to leave buffer for Tally issues.

Priority: **P0 = must ship**, P1 = should ship, P2 = only if time remains.

| Phase | Time | Goal | Output |
|---|---|---|---|
| 0. Setup | 0:45 | Next.js + Tailwind + TS repo, GitHub public repo, Vercel linked, Supabase project (Mumbai), env vars, schema run, admin user created | Empty site deploys on Vercel |
| 1. Design system | 1:15 | Tokens, fonts, Logo SVG, Button, PillNav, Footer, SectionLabel, TwoToneHeading, cards, jaali, motion tokens | `/` shows nav + footer + style test |
| 2. Home | 3:00 | Hero → Marquee → About → Services accordion → Work stack → Process → Why → Pricing → FAQ → CTA | Home complete, mobile + desktop |
| 3. Backend | 3:00 | `POST /api/leads` (Zod + honeypot + time-trap + Turnstile + rate limit), admin login, guard, dashboard, PATCH/DELETE, CSV | Form → DB → /admin works end-to-end |
| 4. Inner pages | 2:00 | /services, /about, /contact (form UI), /privacy, 404 | All nav links live |
| 5. India layer + Hindi | 1:15 | EN/HI routes for nav, hero, CTA, form, footer; WhatsApp sticky bar; IST pill | Toggle works, no layout break |
| 6. Polish | 1:00 | Motion pass, focus states, reduced motion, empty/error states, favicon, OG, metadata, sitemap | Console clean |
| 7. Performance | 1:30 | Bundle check, PSI mobile/desktop on prod, fixes | 90+ both |
| 8. Ship | 1:30 | README + design rationale, screenshots, demo admin, video, Tally submit | Submitted |
| **Total** | **≈ 15:15** | buffer ≈ 1:45 | |

## Cut lines (if behind)
1. Drop Hindi on inner pages (keep nav, hero, CTA, contact form, footer).
2. Drop pricing section → keep one "Starts at ₹" line.
3. Drop lead detail drawer + CSV export (keep table + status + delete).
4. Replace stacked Work cards with a simple 3-card grid.
5. **Never cut:** DB-backed form, validation, spam protection, admin login, README rationale, PSI 90+, WhatsApp CTA, EN/HI toggle on hero.

## Phase exit checks
- Phase 1: Storybook-free visual page at `/_design` (delete before submit) showing all tokens/components.
- Phase 2: Lighthouse mobile ≥ 90 already (don't postpone perf to the end).
- Phase 3: run the full test checklist in `docs/04-BACKEND.md`.
- Phase 7: PSI on the live production URL, both devices.
- Phase 8: `docs/08-SUBMISSION-CHECKLIST.md` fully ticked.

## Git hygiene
- Commit after each phase with clear messages (judges read history). Branch not needed.
- Before first push: confirm `.gitignore` has `.env*` (except `.env.example`), `.next`, `node_modules`.
- Before final push: `git log -p | grep -iE "service_role|secret|password"` → nothing real.
- If a secret was ever committed: rotate it in Supabase/Cloudflare immediately.
