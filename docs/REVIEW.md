# REVIEW — how to check each phase before moving on

Three layers. Do all three at every gate. The point: catch problems while they are small.

## Layer 1 — Automated (agent runs, pastes output)
```bash
pnpm lint && pnpm typecheck && pnpm build        # must be green; read the "First Load JS" table
npx linkinator http://localhost:3000 --recurse    # after pnpm start; 0 broken links (from Phase 4)
# Lighthouse on the production build (pnpm start), Chrome incognito, mobile + desktop
```

## Layer 2 — Human check (5 minutes, yourself)
- Open on your **phone** (real device) and a desktop at 1440px.
- Tab through with the keyboard: can you see focus everywhere?
- Open DevTools console: any red or yellow? (must be none)
- Turn on "Reduce motion" in your OS: does it still look right?
- Read all text on the page once: any invented claims, typos, dead buttons?

## Layer 3 — Agent as reviewer (paste after each phase; the agent must NOT edit files in this step)
```
Act as a strict reviewer for Phase N only. Do not edit any file.
Use docs/01-REQUIREMENTS.md and the judging weights (Design+India 30, UI/UX 20, Backend+code 20, PageSpeed 20, Polish 10).
1. List every issue you find with: severity (BLOCKER / MAJOR / MINOR), file:line, what's wrong, the fix.
2. Check against the phase's "Review focus" and gate boxes in docs/PHASES.md.
3. Check for: hardcoded colours, invented facts or lorem ipsum, missing labels/alt/aria, missing reduced-motion, layout shift risks, unnecessary "use client", new dependencies, secrets in client code.
4. Score this phase /100 on the relevant criteria and give the 3 cheapest improvements.
Then stop and wait.
```
Then: *"Fix all BLOCKERS and the two cheapest MAJORS. Log the rest in docs/BACKLOG.md. Re-run lint/typecheck/build."*

## Severity rules
| Level | Meaning | Rule |
|---|---|---|
| BLOCKER | Broken feature, security hole, console error, broken link, PSI < 90, invented claim | Fix **before** the gate |
| MAJOR | Poor mobile layout, weak contrast, missing state (empty/error), inconsistent component | Fix now if < 10 min, else log in BACKLOG |
| MINOR | Spacing nits, copy polish | BACKLOG, handled in Phase 11 |

## Specialised review prompts

### UI phases (1–4, 9, 10)
```
Review the UI built in Phase N against docs/02-DESIGN-SYSTEM.md. Check at 360/390/768/1440: overflow, tap targets, hierarchy, two-tone headings, red usage (<5%), no shadows/gradients, radius consistency, contrast (4.5:1 body, 3:1 large), heading order. Also: is anything generic or template-like that I should replace? Report only; do not edit.
```

### Backend phases (5–8) — security review
```
Security-review the backend built so far. Do not edit. Check: (1) service-role key only in server files, (2) RLS enabled with no anon policies, (3) every admin route and page calls requireAdmin() using getUser() + ADMIN_EMAILS, (4) Zod validation on the server, (5) honeypot, time-trap, Turnstile, rate limit all in the right order, (6) raw IPs never stored, (7) errors are generic and use the {ok,error} shape with correct status codes, (8) CSV export escapes = + - @, (9) no secrets in logs or client bundles, (10) body size limit. List findings with severity and fixes.
```

### Performance phases (2, 4, 6, 12)
```
Performance-review the current build. Run the production build and report First Load JS per route, the 5 largest client chunks, and Lighthouse mobile + desktop for /, /services, /about, /contact. Identify the LCP element and anything delaying it, CLS sources, unused JS, third-party scripts. List fixes ranked by score impact. Do not edit yet.
```

## Phase scorecard (fill in at each gate; ≥ 80 to proceed)
| Phase | Design/India /30 | UI/UX /20 | Code/Backend /20 | Perf /20 | Polish /10 | Total | Blockers left |
|---|---|---|---|---|---|---|---|
| 2 | | | | | | | |
| 4 | | | | | | | |
| 6 | | | | | | | |
| 8 | | | | | | | |
| 10 | | | | | | | |
| 12 | | | | | | | |
(Score only the columns that apply to the phase; scale the rest.)

## Bug report format (when something fails, give the agent this)
```
Phase: N          Page/route: /...         Device: iPhone / Chrome desktop
Expected: ...     Actual: ...              Console/network error: (paste)
Steps: 1) 2) 3)   Screenshot: (attach)
Constraint: fix only this bug, do not refactor, then re-run the phase verify checks.
```

## Final review (Phase 13)
Run the reviewer prompt once for the *whole site* as a hiring manager: "Score /100 using the judging weights, list the 5 weakest points, fix the cheapest two." Then do interview prep from `docs/08-SUBMISSION-CHECKLIST.md`.
