# PHASES — build in small milestones, verify, then move on

**Never build everything in one go.** One phase at a time. Each phase ends with a verified, committed state. If a phase fails its gate, fix it *inside that phase*; never carry bugs forward.

## The loop (repeat for every phase)
1. **Plan (2 min):** agent reads the phase card, replies with a plan + files it will touch. You approve. *No code yet.*
2. **Build:** agent builds ONLY the phase scope. Files outside the scope are off-limits.
3. **Verify (agent):** agent runs the verify commands and pastes the evidence.
4. **Verify (you):** run the human checks on your own screen/phone. Evidence beats "it should work".
5. **Review:** run the review prompt from `docs/REVIEW.md`. Fix every *blocker*; log majors/minors.
6. **Decide:** write any choice made into `docs/DECISIONS.md` (one line each).
7. **Gate:** all boxes ticked → `git commit` + `git tag phase-N` + push (Vercel redeploys) → next phase.

**Time box:** if a phase runs 30% over, stop and apply that phase's cut line. Do not polish early phases; polish lives in P11.

## Agent report format (agent must end every phase with this)
```
PHASE N REPORT
Done:        what was built (files)
Verified:    each check + the actual output/evidence
Not done:    anything skipped and why
Decisions:   choices made (for DECISIONS.md)
Risks:       anything that might break later
Next:        wait for my "gate passed"
```
Add to every build prompt: *"Do only Phase N. Stop after the report. Do not start the next phase."*

## Progress tracker
| # | Phase | Box | Status | Commit/tag |
|---|---|---|---|---|
| 0 | Setup | 30m | ☑ | `29cbbca` |
| 1 | Foundation (tokens, fonts, shell) | 45m | ☑ | `4600189` |
| 2 | Hero + marquee | 60m | ☑ | `b802c81` |
| 3 | Home A: About + Services | 60m | ☑ | `b802c81` |
| 4 | Home B: Work, Process, Why, Pricing, FAQ, CTA | 75m | ☑ | `b802c81` |
| 5 | Database + lead API (no UI) | 60m | ☑ | phase-5 |
| 6 | Contact page + form (end-to-end) | 45m | ☑ | phase-6 |
| 7 | Admin auth + protected shell | 45m | ☑ | phase-7 |
| 8 | Admin dashboard | 60m | ☑ | phase-8 |
| 9 | Inner pages (Services, About, Privacy, 404) | 60m | ☑ | phase-9 |
| 10 | India layer + Hindi | 60m | ☑ | phase-10 |
| 11 | Polish + accessibility | 45m | ☑ | phase-11 |
| 12 | Performance (PSI 90+) | 60m | ☑ | phase-12 |
| 13 | Ship (README, video, Tally) | 75m | ☑ | phase-13 |
| 14 | Full-width Dark Panels, Image Prompts & Theme Toggle | 45m | ☑ | phase-14 |
| 15 | SVZ High-Fashion Editorial Transformation | 60m | ☑ | phase-15 |
| | **Total** | **≈ 14.75h** | | |

## Hours left? Compress like this
Check the clock now. Deadline Wed 14 Oct 2026, 9:26 PM IST; feature freeze 3h before.
| Hours until freeze | Plan |
|---|---|
| 10+ | All phases as written |
| 6–10 | Merge P3+P4 (Work = simple 3-card grid, drop Pricing). P10 Hindi = nav, hero, CTA, contact form, footer only. P8 skip CSV + notes drawer. Skip P11 as a separate phase (fold into P12) |
| 3–6 | P0 → P1 → P2 → P5 → P6 → P7 → P8 (table, status, delete only) → P9 (Services/About short) → P12 → P13. Home = hero + services + process + CTA only |
| < 3 | Hero, Contact + DB + admin, README. Be honest in README about what's not built |
**Never cut:** DB-backed form, validation, spam protection, admin login, README rationale, WhatsApp CTA, EN/HI toggle on hero, PSI 90+.

---

## PHASE 0 — Setup (30m)
**Goal:** empty project deploys; database and keys ready.
**Scope:** `create-next-app` (TS, Tailwind, App Router, src dir, pnpm) · kit files in repo root · public GitHub repo · Vercel linked (region `bom1`) · Supabase project (Mumbai) · run `supabase/schema.sql` · create admin user, disable public sign-ups · Turnstile site · `.env.local` + same vars in Vercel.
**Out of scope:** any UI or API code.
**Prompt:** `Read AGENTS.md/CLAUDE.md and docs/. Summarise goal, stack, rules, phases in 10 lines. List anything you need from me. Then do Phase 0 steps that are code/config only. Stop after the report.`
**Verify (agent):** `pnpm dev` starts · `pnpm build` passes · `git check-ignore .env.local` prints the path.
**Verify (you):** Vercel URL loads · Supabase → Table Editor shows `leads` with **RLS enabled** · Auth → sign-ups disabled · env vars present in Vercel · repo is public and has no `.env.local`.
**Review focus:** secrets not committed; correct region; kit files present.
**Decisions:** stack confirmed (D1), regions (D2), repo name.
**Gate:** ☐ deploys ☐ table exists, RLS on ☐ no secrets in git ☐ admin user created
**Commit:** `chore: project setup, schema, env`

## PHASE 1 — Foundation (45m)
**Goal:** design tokens + shell that every page reuses.
**Scope:** Tailwind v4 tokens (docs/02) · `next/font` (Inter Tight, Inter) · `app/[lang]` routing with `en` only for now · Logo, Button, PillNav, Footer (with giant wordmark), SectionLabel, TwoToneHeading, ChamferCard, `.jaali` · motion tokens + reduced-motion block · temp `/_design` page.
**Out of scope:** page content, Hindi text, forms.
**Prompt:** `Do only Phase 1 from docs/PHASES.md using ethixweb-design-system and ethixweb-motion. Show a plan first. After building, run lint, typecheck, build and report First Load JS per route. Stop after the report.`
**Verify (agent):** lint/typecheck/build pass · First Load JS < 100 kB.
**Verify (you):** `/_design` at 390px and 1440px: nav, buttons (hover/press/focus), cards, footer · Tab key shows visible focus · no console errors · red matches the real logo.
**Review focus:** tokens only (no hardcoded hex), no shadows/gradients, contrast, Logo accessible name.
**Decisions:** exact red hex (D5), logo source (D6), fonts (D7).
**Gate:** ☐ tokens in one place ☐ components reused, not duplicated ☐ build green ☐ looks right on mobile
**Cut line:** skip StatusPill/LangToggle (they come in P10).
**Commit:** `feat: design system foundation`

## PHASE 2 — Hero + marquee (60m)  ← biggest design-score moment
**Goal:** a hero you'd be proud to screenshot.
**Scope:** hero per docs/02 + docs/03 (two-tone H1, Hindi sub-line static for now, paragraph, 2 CTAs, 2 CSS concept cards, jaali, progress line) · industries marquee · hero load animation (transform only).
**Out of scope:** other sections, real language switching.
**Prompt:** `Do only Phase 2. Build the hero + marquee from docs/02 and docs/03. H1 must paint on first frame (no opacity:0 start). No images. Then run Lighthouse mobile on the production build (pnpm build && pnpm start) and report scores. Stop after the report.`
**Verify (agent):** Lighthouse mobile Performance ≥ 90, CLS < 0.05.
**Verify (you):** compare with the Covix reference for *structure*; 360/390/768/1440 · headline never overflows · tracking readable (not -0.06em) · CTAs ≥ 44px · reduced-motion shows static hero.
**Review focus:** one memorable moment; red used sparingly; India cues visible above the fold (WhatsApp, ₹/GST/UPI text, Hindi line).
**Decisions:** H1 wording (D8), hero cards content.
**Gate:** ☐ Lighthouse ≥ 90 mobile ☐ H1 paints instantly ☐ no overflow at 360px ☐ India cues visible
**Cut line:** drop the progress line and second concept card.
**Commit:** `feat: hero and industries marquee`

## PHASE 3 — Home A: About + Services (60m)
**Scope:** About two-tone scroll-fill text + 2 chamfer cards (Trustpilot 4.0, 22 services/6 categories) · Services dark card with 6 `<details name="services">` rows (no numbers).
**Out of scope:** Work, Process, Pricing, FAQ.
**Verify (agent):** build; JS still < 100 kB (accordion must be zero JS).
**Verify (you):** accordion opens one at a time, keyboard accessible (Enter/Space), content readable with JS disabled · about text fills on scroll, static text under reduced motion · category counts match 4/4/6/3/2/3 = 22.
**Review focus:** no invented stats; real sub-service names from ethixweb.com/services.
**Decisions:** sub-service names (D9).
**Gate:** ☐ accordion works no-JS ☐ numbers are true ☐ Lighthouse still ≥ 90
**Cut line:** drop scroll-fill animation (static two-tone).
**Commit:** `feat: about and services sections`

## PHASE 4 — Home B: Work, Process, Why, Pricing, FAQ, CTA (75m)
**Scope:** sticky stacked Work cards (5 concept mockups in CSS/SVG, badge "Concept project") · Process (4 cards, numbered) · Why bento · Pricing (2 indicative cards) · FAQ (dark) · final red CTA band · footer wired.
**Verify (agent):** build; Lighthouse mobile ≥ 90 on `/`.
**Verify (you):** work cards stack smoothly on a real phone · "Indicative" and "Concept project" labels visible · FAQ keyboard accessible · CTA band is the only large red area · every link goes somewhere real.
**Review focus:** honesty labels; no stock photos; consistent spacing (96/64px).
**Decisions:** indicative prices (D10), concept project list.
**Gate:** ☐ labels present ☐ no dead links ☐ Lighthouse ≥ 90 ☐ page reads well top-to-bottom
**Cut line:** Work → 3-card grid; drop Pricing (keep one "Starts at ₹" line).
**Commit:** `feat: home page sections complete`

## PHASE 5 — Database + lead API, no UI (60m)
**Goal:** a bulletproof `POST /api/leads` proven by curl, before any form exists.
**Scope:** `lib/validation.ts`, `lib/http.ts`, `lib/turnstile.ts`, `lib/rate-limit.ts`, `lib/supabase/admin.ts` (server-only), `app/api/leads/route.ts`.
**Out of scope:** form UI, admin.
**Prompt:** `Do only Phase 5 using the leads-backend skill and docs/04-BACKEND.md. Build the lead API. Then run curl for: valid (201), invalid phone (422), honeypot (201, no row), too fast (400), bad token (403), 4th rapid request (429). Show each response and the DB rows. Stop after the report.`
**Verify (agent):** all six curl cases with outputs; `git grep -n "SUPABASE_SERVICE_ROLE_KEY" -- src` hits server files only.
**Verify (you):** open Supabase table → rows match expectations; try the request with the **anon key against Supabase REST** → denied; response JSON shape is `{ok, data|error}`.
**Review focus:** order of checks, generic errors, no secrets in logs, raw IP never stored.
**Decisions:** rate-limit storage (D4), time-trap thresholds.
**Gate:** ☐ 6/6 curl cases ☐ RLS blocks anon ☐ service key server-only ☐ errors are generic
**Cut line:** none (this phase is mandatory).
**Commit:** `feat: lead API with validation and spam protection`

## PHASE 6 — Contact page + form, end-to-end (45m)
**Scope:** `/contact` page, `ContactForm` client component (shared Zod schema, +91 prefix, city/service/budget selects, honeypot, startedAt, lazy Turnstile, field errors, success state), WhatsApp side card.
**Verify (agent):** build; Lighthouse mobile on `/contact` ≥ 90 (Turnstile must be lazy).
**Verify (you):** submit a real enquiry → row in Supabase · all validation messages appear inline · double-click submit sends once · works on a phone · error state keeps your input · screen reader announces success (aria-live).
**Review focus:** labels, autocomplete attributes, error text quality, no layout shift when Turnstile loads.
**Decisions:** form fields final (D11).
**Gate:** ☐ form → DB works on production URL ☐ validation UX good ☐ Lighthouse ≥ 90 ☐ no console errors
**Commit:** `feat: contact page with working enquiry form`

## PHASE 7 — Admin auth + protected shell (45m)
**Scope:** `/admin/login`, login/logout routes, `requireAdmin()`, middleware (or `proxy.ts` on Next 16), protected `/admin` placeholder page, noindex.
**Verify (agent):** curl: `/api/admin/leads` no cookie → 401 · non-allowlisted user → 403.
**Verify (you):** logged-out `/admin` redirects to login · wrong password → generic error · correct login → shell · logout works · `getUser()` (not `getSession()`) is used on the server.
**Review focus:** allowlist re-checked in every route, cookies httpOnly, no admin links on public pages.
**Decisions:** auth method (D3).
**Gate:** ☐ 401 ☐ 403 ☐ redirect ☐ logout ☐ demo admin works on production
**Commit:** `feat: admin authentication`

## PHASE 8 — Admin dashboard (60m)
**Scope (P0):** leads table, counts per status, status dropdown (optimistic), delete with confirm, search, status filter, pagination. **(P1):** notes drawer, WhatsApp/mailto links, CSV export with formula-injection guard.
**Verify (agent):** PATCH/DELETE/export routes via curl with a valid cookie; CSV opens cleanly.
**Verify (you):** submit a lead on the public form → appears in admin · change status persists after refresh · delete works · search by phone/name · empty state shows a clear message · mobile table scrolls inside its container.
**Review focus:** every mutation re-checks admin; errors surfaced; no flash of unauthorised content.
**Gate:** ☐ create→view→update→delete loop works ☐ search/filter ☐ mobile usable
**Cut line:** skip notes drawer + CSV.
**Commit:** `feat: admin dashboard`

## PHASE 9 — Inner pages (60m)
**Scope:** `/services` (6 anchored sections), `/about` (India story, only true facts, `TODO(human)` where unknown), `/privacy` (simple, honest), `404`, `error.tsx`, `sitemap.ts`, `robots.ts`.
**Verify:** `npx linkinator http://localhost:3000 --recurse` → 0 broken · each page has one H1, title, description.
**Review focus:** same components as home (consistency); no invented facts; unresolved TODOs listed for you.
**Gate:** ☐ 0 broken links ☐ TODOs resolved or removed ☐ consistent look
**Cut line:** About short (3 sections), Services as one page with 6 cards.
**Commit:** `feat: inner pages`

## PHASE 10 — India layer + Hindi (60m)
**Scope:** `/hi` dictionary (nav, hero, CTA, contact form, footer), EN|हिं toggle (plain links), Noto Sans Devanagari only on `/hi`, WhatsApp sticky bar (mobile), StatusPill (IST), `hreflang`.
**Verify (you):** toggle keeps you on the same page · Hindi renders without clipped lines at 360px · missing Hindi keys fall back to English (never show a key) · WhatsApp link opens with prefilled text · `lang="hi"` on `<html>` · Lighthouse unchanged on `/`.
**Review focus:** Hindi naturalness (loanwords OK), font loads only on `/hi`.
**Decisions:** Hindi scope (D12), business hours (D13).
**Gate:** ☐ toggle works ☐ no layout break ☐ font lazy ☐ PSI unchanged
**Commit:** `feat: Hindi and India-specific UX`

## PHASE 11 — Polish + accessibility (45m)
**Scope:** favicon, apple-touch icon, OG image, metadata per page, focus states, reduced-motion pass, empty/loading/error states, hover gating, copy proofreading.
**Verify:** axe or Lighthouse accessibility ≥ 95 · keyboard-only run through the whole site · console clean on every route.
**Gate:** ☐ a11y ≥ 95 ☐ keyboard-only works ☐ zero console errors ☐ OG preview OK
**Commit:** `chore: polish and accessibility`

## PHASE 12 — Performance (60m)
**Scope:** bundle analysis, fix largest client chunks, final PSI on the live URL (3 runs, median) for `/`, `/services`, `/about`, `/contact`; screenshots to `docs/pagespeed/`.
**Verify:** mobile ≥ 90 and desktop ≥ 90 on all four pages.
**Review focus:** LCP element is text; Turnstile lazy; no third-party leaks.
**Gate:** ☐ 4 pages × 2 devices ≥ 90 ☐ screenshots saved
**Commit:** `perf: final optimisations and PSI evidence`

## PHASE 13 — Ship (75m)
**Scope:** fill `README.md` from the template · delete `/_design` · resolve TODOs · demo admin + 3–5 clearly fake sample leads · video (≤ 2 min) · run `docs/08-SUBMISSION-CHECKLIST.md` · submit on Tally ~1h before the deadline.
**Gate:** ☐ checklist 08 fully ticked ☐ Tally confirmation screenshot saved
**Commit:** `docs: README and submission`
