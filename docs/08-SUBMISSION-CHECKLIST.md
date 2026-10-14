# 08 — Submission checklist (Tally: https://tally.so/r/KY7Ao8)

Deadline: **Wed 14 Oct 2026, 9:26 PM IST**. Aim to submit by 8:30 PM.

## Code and repo
- [ ] Repo is **public**, has a clear commit history
- [ ] `.env.local` NOT committed; `.env.example` committed
- [ ] `git log -p | grep -iE "service_role|secret|password|sk_"` shows nothing real (rotate keys if it does)
- [ ] `pnpm lint && pnpm typecheck && pnpm build` pass
- [ ] `/_design` test page deleted
- [ ] `TODO(human)` markers resolved or removed (`grep -r "TODO(human)" src`)

## Live site (Vercel production URL)
- [ ] All env vars set in Vercel (Production)
- [ ] Function region `bom1`; Supabase region Mumbai
- [ ] Real Turnstile keys (not the dummy ones) in production
- [ ] Contact form → row in Supabase → visible in /admin
- [ ] No console errors on `/`, `/services`, `/about`, `/contact`, `/hi`, `/privacy`, 404, `/admin/login`, `/admin`
- [ ] No broken links (`npx linkinator https://YOUR-URL --recurse`)
- [ ] Tested on a real phone (Android Chrome) over mobile data
- [ ] Dark/light consistent, favicon + OG preview OK (check with a link preview)

## PageSpeed Insights (https://pagespeed.web.dev) — on the LIVE URL
- [ ] Mobile ≥ 90 (Performance), screenshot saved
- [ ] Desktop ≥ 90 (Performance), screenshot saved
- [ ] Accessibility / Best Practices / SEO ≥ 90 (bonus)
- [ ] Screenshots show the URL and the 4 score circles; saved in `/docs/pagespeed/` and linked in README

## Admin demo
- [ ] Create a dedicated **demo admin** account (email + password), add to `ADMIN_EMAILS`
- [ ] Put 3–5 sample leads (clearly fake names, e.g. "Demo Lead") so the dashboard isn't empty
- [ ] Credentials written in README and in the Tally form
- [ ] After judging, rotate or delete the demo password

## README
- [ ] Live URL, repo URL
- [ ] Tech stack
- [ ] Setup + env var table
- [ ] **Design rationale** (India-specific decisions, why, improvements over current site)
- [ ] Security + spam protection explanation
- [ ] Demo admin login
- [ ] PageSpeed screenshots embedded
- [ ] Assumptions and honesty notes (concept projects, indicative prices)
- [ ] AI tools disclosure (AI tools were used; I can explain every choice)

## Bonus video (1–2 min, screen recording, upload unlisted to YouTube / Loom / Drive with link access)
Script (≈ 100 seconds):
1. (10s) Home hero on mobile + desktop: "India-first: WhatsApp, Hindi toggle, ₹, IST, jaali motif."
2. (20s) Scroll: services, concept work, process, pricing; mention performance approach (static, CSS-only motion).
3. (25s) Contact: submit a real enquiry; show validation error + success.
4. (25s) /admin: login, new lead appears, change status, add note, export CSV.
5. (10s) PageSpeed result: 90+ mobile and desktop.
6. (10s) Repo: schema + API + security (RLS, Turnstile, honeypot, rate limit).

## Tally form
- [ ] Live URL · GitHub URL · README link · PageSpeed screenshots (mobile + desktop) · Demo admin login · Video link
- [ ] Submit, then screenshot the confirmation

## Interview prep — be ready to explain
1. **Why India-specific this way?** WhatsApp is the primary business channel in India; Hindi expands reach; ₹/GST/UPI remove purchase friction; IST support is a real promise; jaali + red are culturally grounded and keep the brand.
2. **Why Next.js + Supabase?** Static-first for speed, Postgres for real leads, built-in Auth for admin, Mumbai region for latency.
3. **Why CSS-only motion?** PageSpeed 20% of score; main-thread-free animations; Reduced-motion support.
4. **How is the admin secure?** Supabase Auth + allowlist re-checked on every route, `getUser()` not `getSession()`, RLS with no public policies, service key server-only.
5. **How does spam protection work?** Honeypot → time-trap → Turnstile → DB rate limit; why each exists.
6. **What did you take from Covix and Apple references, and what did you change?**
7. **What would you do with another week?** Real case studies, CMS for content, WhatsApp Cloud API auto-reply, Hindi on all pages, analytics with consent, automated tests (Playwright) for the lead flow.
