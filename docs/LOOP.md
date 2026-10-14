# Autonomous Execution Loop (LOOP.md)

This document establishes the mandatory autonomous development loop for building the Ethixweb India site.

## The Autonomous Law
The agent must **implement, verify, review, update context & trackers, and automatically advance** to the next phase without pausing or asking the user for confirmation. 

Do **NOT** ask: *"Should I proceed to Phase N?"* or *"Shall I start next phase?"*.
If all phase gate criteria pass, proceed to the next phase immediately.

---

## The 5-Step Phase Loop

```
┌────────────────────────────────────────────────────────┐
│ 1. IMPLEMENT                                           │
│    - Read Phase N card in PHASES.md & docs/            │
│    - Query graphify / check component architecture     │
│    - Write clean, modular, production-ready code       │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. VERIFY                                              │
│    - pnpm lint (0 errors)                              │
│    - pnpm typecheck (0 errors)                         │
│    - pnpm build (Clean Next.js output)                 │
│    - Integration / API checks (curl/tests)             │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. REVIEW                                              │
│    - Design System: @theme tokens, no raw hex, red ≤ 5%│
│    - Security: server-only secrets, sanitized inputs   │
│    - UX & A11y: semantic HTML, visible focus, aria     │
│    - Performance: zero unnecessary client components   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 4. UPDATE CONTEXT & TRACKERS                           │
│    - Mark Phase N done in PHASES.md with commit hash   │
│    - Record architecture choices in DECISIONS.md       │
│    - Run `python -m graphify update .` (AST refresh)   │
│    - Git commit & tag `phase-N`                        │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 5. AUTO-ADVANCE GATE                                   │
│    - Gate Passed? ──► AUTO-START Phase N+1             │
│    - Exception: ONLY pause if a missing external API   │
│      key / credential strictly blocks execution.       │
└────────────────────────────────────────────────────────┘
```

---

## Detailed Step Protocol

### Step 1: Implement (Scope-Enforced)
1. Read the phase definition in `PHASES.md` and related documents in `docs/`.
2. Inspect codebase symbols and patterns using `graphify` (`graphify-out/`).
3. Touch ONLY files relevant to the active phase. Do not add premature abstractions or unrelated refactors.
4. Keep all UI components faithful to the Ethixweb India design system:
   - High-contrast, editorial typography (`Inter Tight` + `Inter` + `Noto Sans Devanagari`).
   - `#C1272D` brand red used exclusively as an intentional accent (≤ 5% viewport area).
   - CSS-only animations (no Framer Motion or GSAP).
   - Zero layout shift, mobile-first at 360px/390px.

### Step 2: Verify (Automated Evidence)
Every phase must pass automated verification:
1. `pnpm lint` — must pass with **0 errors and 0 warnings**.
2. `pnpm typecheck` — must pass with **0 TypeScript errors**.
3. `pnpm build` — must pass with all static and dynamic routes compiling cleanly.
4. Functional verification:
   - For UI components: verify responsive render, states (default, hover, focus, active, disabled, error).
   - For API endpoints: run test scripts / curl verifying status codes (201, 400, 422, 403, 429, 401).

### Step 3: Review (Quality & Security Guardrails)
- **Security**: No secrets or service role keys leaked to the browser (`NEXT_PUBLIC_` prohibited for backend keys). All user inputs validated with Zod.
- **Spam & Abuse**: Honeypot, time-trap, Turnstile, and hashed-IP rate limits enforced.
- **Performance**: Dynamic components hydrated minimally. Text painted immediately on first paint.
- **Accessibility**: ARIA landmarks, `aria-live` for dynamic alerts, labels for all form inputs, keyboard tab navigation.

### Step 4: Update Context & Checklists
1. Update `PHASES.md` Progress Tracker: mark `[x]` with commit/tag.
2. Log decisions into `DECISIONS.md`.
3. Update knowledge graph: run `python -m graphify update .`.
4. Stage and commit changes:
   ```bash
   git add .
   git commit -m "feat(phase-N): <description>"
   git tag phase-N
   ```

### Step 5: Auto-Advance Gate
- Verify all gate criteria are satisfied.
- Print a concise milestone summary:
  ```markdown
  ### Phase N Complete
  - **Built**: [list of files/features]
  - **Verification**: lint 0, typecheck 0, build passed, functional tests verified
  - **Gate Status**: PASSED
  - **Advancing**: Auto-initiating Phase N+1 immediately
  ```
- **DO NOT STOP TO ASK FOR CONFIRMATION**. Immediately start Phase N+1.
- **Stop Condition**: Pause ONLY if an unconfigured third-party secret (e.g. live production API key) is physically unavailable and cannot be mocked or configured locally.

---

## Phases Roadmap

| Phase | Milestone | Primary Output | Gate Requirement |
|---|---|---|---|
| **P0** | Setup | Next.js, Tailwind v4, env, schema | `git check-ignore .env.local`, pnpm build |
| **P1** | Foundation | Design tokens, components, fonts | 0 lint errors, components testable |
| **P2** | Hero & Marquee | High-impact hero, jaali, marquee | LCP on first paint, no overflow 360px |
| **P3** | Home A | About scroll-fill, zero-JS Services | Zero-JS accordion, accurate numbers |
| **P4** | Home B | Work, Process, Bento, Pricing, FAQ | Honest badges, no dead links |
| **P5** | Database & Lead API | `POST /api/leads` + 4-tier spam protection | 6/6 test cases (201, 400, 422, 403, 429) |
| **P6** | Contact Page & Form | `/contact` end-to-end with WhatsApp fallback | Inline validation, lazy Turnstile, success state |
| **P7** | Admin Auth & Shell | `/admin/login`, session auth, route protection | 401 unauth, 403 forbidden, login/logout |
| **P8** | Admin Dashboard | Lead table, status filters, search, CSV export | Full CRUD/status mutation, injection guard |
| **P9** | Inner Pages | `/services`, `/about`, `/privacy`, `404` | 0 broken links, metadata per page |
| **P10** | India Layer & Hindi | `/hi` localization, Noto Sans, IST time pill | Dual language sync, 0 layout shifts |
| **P11** | Polish & A11y | Focus rings, reduced-motion, meta tags | a11y score ≥ 95, keyboard navigation |
| **P12** | Performance (PSI 90+) | Asset optimization, chunk tuning | Mobile & desktop ≥ 90 on all routes |
| **P13** | Ship & Submission | Final README, checklist validation, delivery | 08-SUBMISSION-CHECKLIST fully checked |
