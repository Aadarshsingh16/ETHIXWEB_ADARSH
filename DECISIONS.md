# DECISIONS — log every choice (this is your interview cheat-sheet)

Rule: when you or the agent make a choice that is not obvious, add a row. One line each. If you can't explain the "Why" in one sentence, reconsider the decision.

## Decided (pre-filled — change only with a reason)
| ID | Decision | Why | Alternatives rejected | Trade-off |
|---|---|---|---|---|
| D1 | Next.js (App Router) + TypeScript + Tailwind v4 | Brief prefers it; static-first rendering for PageSpeed; route handlers give a clean API | Astro (less natural for admin + API), plain React SPA (slower, more JS) | Slightly larger framework baseline |
| D2 | Supabase Mumbai + Vercel `bom1` | Lowest latency for Indian users; Postgres + Auth in one place | Firebase / MongoDB (less relational, extra auth work) | Free-tier limits |
| D3 | Supabase Auth + `ADMIN_EMAILS` allowlist, checked in every admin route | Real auth without building password handling; allowlist stops other users | Hardcoded password / basic auth (weak) | Needs manual admin user creation |
| D4 | Rate limit by hashed IP counted in the `leads` table | No extra service (Redis); works on serverless | In-memory (resets per instance), Upstash (extra dependency) | Counts only successful inserts; fine for this scale |
| D5 | Red `#C1272D` (verify against the logo) | Brand colour; auspicious in Indian culture | Saffron / tricolour (cliché, off-brand) | Must keep red ≤ 5% to feel premium |
| D6 | Logo as inline SVG | No image request, crisp, themeable | PNG (heavier, can't recolour) | Need to obtain the SVG |
| D7 | Inter Tight + Inter, Noto Sans Devanagari on `/hi` only | Matches the editorial reference; good Devanagari pairing; few font files | Many families (slower) | Inter is a common choice |
| D8 | Hero H1: "Your business, online and booked solid." | Reimagines (not reuses) the current tagline; outcome-focused | Reusing "We run the tech…" (not a rethink) | Needs Ethixweb approval in real life |
| D9 | Services use the 6 real categories, sub-services from ethixweb.com | Honest; matches the real site | Invented services | Must read the real site |
| D10 | Prices shown as "Indicative" | Brief says nothing hardcoded/fake; honesty | No prices (loses ₹ India signal) | Numbers are placeholders |
| D11 | Form fields: name, email, +91 mobile, company, city, service, budget, contact preference, message, consent | Gives sales real context; WhatsApp preference is India-specific | Name+email only (low lead quality) | Longer form → keep it clean |
| D12 | Hindi via `/en` and `/hi` routes + plain-link toggle | Static, SEO-friendly, zero JS | Client-side i18n lib (JS cost) | Content duplicated in dictionaries |
| D13 | Motion is CSS-only; H1 never starts at opacity 0 | PageSpeed 20% + LCP safety | Framer Motion / GSAP (heavy) | Fewer fancy effects |
| D14 | Featured work = labelled "Concept project" CSS mockups | No fake clients; no image weight | Stock photos / fake case studies | Less "real" feeling → offset with clear storytelling |
| D15 | Services not numbered; Process numbered | Numbers only for true sequences | Numbering everything (template tell) | Deviates slightly from Covix |

## Open decisions (you must answer — agent can't)
| ID | Question | Needed by | Answer |
|---|---|---|---|
| O1 | Exact red hex from the real logo | Phase 1 | |
| O2 | Logo SVG source | Phase 1 | |
| O3 | Real WhatsApp number (or a clearly marked demo number) | Phase 2 | |
| O4 | Support hours in IST | Phase 10 | |
| O5 | Real service sub-names from ethixweb.com/services | Phase 3 | |
| O6 | About facts (founding year, India team/location) — or leave out | Phase 9 | |
| O7 | Demo admin email + password | Phase 7 | |

## New decisions (append as you build)
| ID | Phase | Decision | Why | Alternatives | Trade-off |
|---|---|---|---|---|---|
| D16 | Phase 6 | Lazy Turnstile with 65px reserved container + client-side useEffect timestamp | Zero CLS on lazy challenge load; avoids Next.js 16 SSR Date.now() prerender error | Static Date.now() in state init | Milliseconds difference on hydration |
