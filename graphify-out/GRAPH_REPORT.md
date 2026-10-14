# Graph Report - ETHIXWEB  (2026-10-14)

## Corpus Check
- 115 files · ~65,304 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 2, .css 2)

## Summary
- 785 nodes · 962 edges · 72 communities (66 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `78b584e0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- WorkSection.tsx
- package.json
- (site)/page.tsx
- ContactForm.tsx
- PricingSection.tsx
- compilerOptions
- next
- What You Must Do When Invoked
- ServicesSection.tsx
- ethixweb-india-kit/supabase/schema.sql
- contact/page.tsx
- supabase/schema.sql
- Detailed Step Protocol
- PHASES — build in small milestones, verify, then move on
- PHASES — build in small milestones, verify, then move on
- 03 — Content (EN + HI). No lorem ipsum. No invented facts.
- 03 — Content (EN + HI). No lorem ipsum. No invented facts.
- 02 — Design system
- REVIEW — how to check each phase before moving on
- 02 — Design system
- Ethixweb India
- Ethixweb India
- REVIEW — how to check each phase before moving on
- 04 — Backend: leads, admin, security
- 07 — Copy-paste prompts for the agent
- 04 — Backend: leads, admin, security
- 07 — Copy-paste prompts for Claude Code (or any coding agent)
- Leads backend skill
- AGENTS.md — Ethixweb India (Full Stack Developer Assessment)
- CLAUDE.md — Ethixweb India (Full Stack Developer Assessment)
- 01 — Requirements checklist (from the Ethixweb brief)
- 08 — Submission checklist (Tally: https://tally.so/r/KY7Ao8)
- CLAUDE.md — Ethixweb India (Full Stack Developer Assessment)
- 01 — Requirements checklist (from the Ethixweb brief)
- 08 — Submission checklist (Tally: https://tally.so/r/KY7Ao8)
- graphify reference: extra exports and benchmark
- WhySection.tsx
- ProcessSection.tsx
- Ethixweb design system (India edition)
- Ethixweb motion
- Leads backend skill
- Ethixweb design system (India edition)
- Ethixweb motion
- Leads backend skill
- Ethixweb design system (India edition)
- Ethixweb motion
- leads/route.ts
- India localization
- India localization
- India localization
- design/page.tsx
- SectionLabel.tsx
- graphify reference: query, path, explain
- PageSpeed 90+ skill
- PageSpeed 90+ skill
- PageSpeed 90+ skill
- Ethixweb India — Assessment Instructions
- DECISIONS — log every choice (this is your interview cheat-sheet)
- 06 — Build plan (deadline: Wed 14 Oct 2026, 9:26 PM IST)
- DECISIONS — log every choice (this is your interview cheat-sheet)
- 06 — Build plan (deadline: Wed 14 Oct 2026, 9:26 PM IST)
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- rules/graphify.md
- extraction-spec.md
- workflows/graphify.md
- Detailed Step Protocol
- loop.md
- requireAdmin

## God Nodes (most connected - your core abstractions)
1. `next` - 21 edges
2. `PHASES — build in small milestones, verify, then move on` - 19 edges
3. `PHASES — build in small milestones, verify, then move on` - 19 edges
4. `03 — Content (EN + HI). No lorem ipsum. No invented facts.` - 18 edges
5. `03 — Content (EN + HI). No lorem ipsum. No invented facts.` - 18 edges
6. `compilerOptions` - 16 edges
7. `react` - 13 edges
8. `HttpError` - 12 edges
9. `requireAdmin()` - 12 edges
10. `What You Must Do When Invoked` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Admin` --references--> `requireAdmin()`  [INFERRED]
  .agents/skills/leads-backend/SKILL.md → src/lib/supabase/admin.ts
- `Admin` --references--> `requireAdmin()`  [INFERRED]
  .claude/skills/leads-backend/SKILL.md → src/lib/supabase/admin.ts
- `Admin` --references--> `requireAdmin()`  [INFERRED]
  ethixweb-india-kit/.claude/skills/leads-backend/SKILL.md → src/lib/supabase/admin.ts
- `PHASE 6 — Contact page + form, end-to-end (45m)` --references--> `ContactForm()`  [INFERRED]
  docs/PHASES.md → src/components/sections/ContactForm.tsx
- `PHASE 6 — Contact page + form, end-to-end (45m)` --references--> `ContactForm()`  [INFERRED]
  PHASES.md → src/components/sections/ContactForm.tsx

## Import Cycles
- None detected.

## Communities (72 total, 6 thin omitted)

### Community 0 - "WorkSection.tsx"
Cohesion: 0.25
Nodes (7): ProjectItem, WorkData, WorkSection(), WorkSectionProps, ProjectItem, WorkCard(), WorkCardProps

### Community 1 - "package.json"
Cohesion: 0.05
Nodes (40): eslintConfig, dependencies, next, react, react-dom, @supabase/ssr, @supabase/supabase-js, zod (+32 more)

### Community 2 - "(site)/page.tsx"
Cohesion: 0.27
Nodes (7): DesignTokensPage(), generateMetadata(), HomePage(), AboutTeaser(), Marquee(), MarqueeProps, getDictionary()

### Community 3 - "ContactForm.tsx"
Cohesion: 0.18
Nodes (13): invalidPhoneResult, testPhones, validLeadResult, ContactFormProps, TurnstileWidget(), TurnstileWidgetProps, Window, BUDGETS (+5 more)

### Community 4 - "PricingSection.tsx"
Cohesion: 0.25
Nodes (7): PlanItem, PricingData, PricingSection(), PricingSectionProps, PlanItem, PricingCard(), PricingCardProps

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 6 - "next"
Cohesion: 0.06
Nodes (33): nextConfig, next, react, metadata, SiteLayout(), metadata, AdminLogoutButton(), Footer() (+25 more)

### Community 7 - "What You Must Do When Invoked"
Cohesion: 0.07
Nodes (26): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+18 more)

### Community 8 - "ServicesSection.tsx"
Cohesion: 0.25
Nodes (7): ServiceItem, ServicesData, ServicesSection(), ServicesSectionProps, ServiceAccordion(), ServiceAccordionProps, ServiceItem

### Community 9 - "ethixweb-india-kit/supabase/schema.sql"
Cohesion: 0.36
Nodes (6): leads_created_at_idx, leads_ip_hash_idx, leads_set_updated_at, leads_status_idx, public.leads, public.set_updated_at

### Community 10 - "contact/page.tsx"
Cohesion: 0.27
Nodes (7): ContactPage(), generateMetadata(), en, hi, DEFAULT_LOCALE, isValidLocale(), Lang

### Community 11 - "supabase/schema.sql"
Cohesion: 0.36
Nodes (6): leads_created_at_idx, leads_ip_hash_idx, leads_set_updated_at, leads_status_idx, public.leads, public.set_updated_at

### Community 12 - "Detailed Step Protocol"
Cohesion: 0.18
Nodes (10): Autonomous Execution Loop (LOOP.md), Detailed Step Protocol, Phases Roadmap, Step 1: Implement (Scope-Enforced), Step 2: Verify (Automated Evidence), Step 3: Review (Quality & Security Guardrails), Step 4: Update Context & Checklists, Step 5: Auto-Advance Gate (+2 more)

### Community 13 - "PHASES — build in small milestones, verify, then move on"
Cohesion: 0.11
Nodes (17): Agent report format (agent must end every phase with this), Hours left? Compress like this, PHASE 0 — Setup (30m), PHASE 10 — India layer + Hindi (60m), PHASE 11 — Polish + accessibility (45m), PHASE 12 — Performance (60m), PHASE 13 — Ship (75m), PHASE 1 — Foundation (45m) (+9 more)

### Community 14 - "PHASES — build in small milestones, verify, then move on"
Cohesion: 0.05
Nodes (37): 05 — PageSpeed Insights 90+ (mobile AND desktop), Budget rules for the agent, If a score is below 90, Measuring correctly, Targets (mobile), What we do, PHASE 6 — Contact page + form, end-to-end (45m), 05 — PageSpeed Insights 90+ (mobile AND desktop) (+29 more)

### Community 15 - "03 — Content (EN + HI). No lorem ipsum. No invented facts."
Cohesion: 0.11
Nodes (18): 03 — Content (EN + HI). No lorem ipsum. No invented facts., About (home teaser, two-tone scroll-fill), About page — "Our India story" outline (fill facts with the human), Contact page, FAQ (India-relevant), Featured work (all labelled **Concept project**; built as CSS/SVG mockups), Final CTA, Hero (+10 more)

### Community 16 - "03 — Content (EN + HI). No lorem ipsum. No invented facts."
Cohesion: 0.11
Nodes (18): 03 — Content (EN + HI). No lorem ipsum. No invented facts., About (home teaser, two-tone scroll-fill), About page — "Our India story" outline (fill facts with the human), Contact page, FAQ (India-relevant), Featured work (all labelled **Concept project**; built as CSS/SVG mockups), Final CTA, Hero (+10 more)

### Community 17 - "02 — Design system"
Cohesion: 0.15
Nodes (12): 02 — Design system, Brand tokens (Tailwind v4 `@theme` in `src/styles/globals.css`), Components (`src/components/ui`), Home page layout (top → bottom), India layer (30% of the score — make it visible above the fold), Inner pages, Jaali pattern (tiny inline SVG), Quality bar for every section (+4 more)

### Community 18 - "REVIEW — how to check each phase before moving on"
Cohesion: 0.15
Nodes (12): Backend phases (5–8) — security review, Bug report format (when something fails, give the agent this), Final review (Phase 13), Layer 1 — Automated (agent runs, pastes output), Layer 2 — Human check (5 minutes, yourself), Layer 3 — Agent as reviewer (paste after each phase; the agent must NOT edit files in this step), Performance phases (2, 4, 6, 12), Phase scorecard (fill in at each gate; ≥ 80 to proceed) (+4 more)

### Community 19 - "02 — Design system"
Cohesion: 0.15
Nodes (12): 02 — Design system, Brand tokens (Tailwind v4 `@theme` in `src/styles/globals.css`), Components (`src/components/ui`), Home page layout (top → bottom), India layer (30% of the score — make it visible above the fold), Inner pages, Jaali pattern (tiny inline SVG), Quality bar for every section (+4 more)

### Community 20 - "Ethixweb India"
Cohesion: 0.15
Nodes (12): AI tools, Assumptions and honesty notes, Backend and security, Design rationale, Ethixweb India, Features, PageSpeed Insights, Run locally (+4 more)

### Community 21 - "Ethixweb India"
Cohesion: 0.15
Nodes (12): AI tools, Assumptions and honesty notes, Backend and security, Design rationale, Ethixweb India, Features, PageSpeed Insights, Run locally (+4 more)

### Community 22 - "REVIEW — how to check each phase before moving on"
Cohesion: 0.15
Nodes (12): Backend phases (5–8) — security review, Bug report format (when something fails, give the agent this), Final review (Phase 13), Layer 1 — Automated (agent runs, pastes output), Layer 2 — Human check (5 minutes, yourself), Layer 3 — Agent as reviewer (paste after each phase; the agent must NOT edit files in this step), Performance phases (2, 4, 6, 12), Phase scorecard (fill in at each gate; ≥ 80 to proceed) (+4 more)

### Community 23 - "04 — Backend: leads, admin, security"
Cohesion: 0.20
Nodes (9): 04 — Backend: leads, admin, security, Admin dashboard features (P0 → P2), API contract, Architecture in one picture, Error handling pattern, Setup steps, Spam protection layers (explain all four in the interview), Test checklist (do all before submit) (+1 more)

### Community 24 - "07 — Copy-paste prompts for the agent"
Cohesion: 0.18
Nodes (10): 07 — Copy-paste prompts for the agent, Prompt 0 — orientation, Prompt 1 — Phase 0 + 1 (setup + design system), Prompt 2 — Phase 2 (home), Prompt 3 — Phase 3 (backend), Prompt 4 — Phase 4 (inner pages + contact), Prompt 5 — Phase 5 (India layer + Hindi), Prompt 6 — Phase 6/7 (polish + performance) (+2 more)

### Community 25 - "04 — Backend: leads, admin, security"
Cohesion: 0.20
Nodes (9): 04 — Backend: leads, admin, security, Admin dashboard features (P0 → P2), API contract, Architecture in one picture, Error handling pattern, Setup steps, Spam protection layers (explain all four in the interview), Test checklist (do all before submit) (+1 more)

### Community 26 - "07 — Copy-paste prompts for Claude Code (or any coding agent)"
Cohesion: 0.18
Nodes (10): 07 — Copy-paste prompts for Claude Code (or any coding agent), Prompt 0 — orientation, Prompt 1 — Phase 0 + 1 (setup + design system), Prompt 2 — Phase 2 (home), Prompt 3 — Phase 3 (backend), Prompt 4 — Phase 4 (inner pages + contact), Prompt 5 — Phase 5 (India layer + Hindi), Prompt 6 — Phase 6/7 (polish + performance) (+2 more)

### Community 27 - "Leads backend skill"
Cohesion: 0.25
Nodes (7): Admin, Client form rules, Code organisation, Leads backend skill, Non-negotiables, POST /api/leads — order of operations, Verify (run and show output)

### Community 28 - "AGENTS.md — Ethixweb India (Full Stack Developer Assessment)"
Cohesion: 0.20
Nodes (9): AGENTS.md — Ethixweb India (Full Stack Developer Assessment), Folder structure, Hard deadline, Judging weights (optimise for these), Non-negotiable rules, Read these first, Skills (in `.agents/skills/`) — use them, Stack (do not change without asking) (+1 more)

### Community 29 - "CLAUDE.md — Ethixweb India (Full Stack Developer Assessment)"
Cohesion: 0.20
Nodes (9): CLAUDE.md — Ethixweb India (Full Stack Developer Assessment), Folder structure, Hard deadline, Judging weights (optimise for these), Non-negotiable rules, Read these first, Skills (in `.claude/skills/`) — use them, Stack (do not change without asking) (+1 more)

### Community 30 - "01 — Requirements checklist (from the Ethixweb brief)"
Cohesion: 0.20
Nodes (9): 01 — Requirements checklist (from the Ethixweb brief), A. Pages, B. Frontend — must look premium, C. Backend — must actually work, D. README, E. Submission (Tally: https://tally.so/r/KY7Ao8), F. Judging map (where the marks are), G. Interview readiness (AI tools allowed, but you must explain everything) (+1 more)

### Community 31 - "08 — Submission checklist (Tally: https://tally.so/r/KY7Ao8)"
Cohesion: 0.20
Nodes (9): 08 — Submission checklist (Tally: https://tally.so/r/KY7Ao8), Admin demo, Bonus video (1–2 min, screen recording, upload unlisted to YouTube / Loom / Drive with link access), Code and repo, Interview prep — be ready to explain, Live site (Vercel production URL), PageSpeed Insights (https://pagespeed.web.dev) — on the LIVE URL, README (+1 more)

### Community 32 - "CLAUDE.md — Ethixweb India (Full Stack Developer Assessment)"
Cohesion: 0.20
Nodes (9): CLAUDE.md — Ethixweb India (Full Stack Developer Assessment), Folder structure, Hard deadline, Judging weights (optimise for these), Non-negotiable rules, Read these first, Skills (in `.claude/skills/`) — use them, Stack (do not change without asking) (+1 more)

### Community 33 - "01 — Requirements checklist (from the Ethixweb brief)"
Cohesion: 0.20
Nodes (9): 01 — Requirements checklist (from the Ethixweb brief), A. Pages, B. Frontend — must look premium, C. Backend — must actually work, D. README, E. Submission (Tally: https://tally.so/r/KY7Ao8), F. Judging map (where the marks are), G. Interview readiness (AI tools allowed, but you must explain everything) (+1 more)

### Community 34 - "08 — Submission checklist (Tally: https://tally.so/r/KY7Ao8)"
Cohesion: 0.20
Nodes (9): 08 — Submission checklist (Tally: https://tally.so/r/KY7Ao8), Admin demo, Bonus video (1–2 min, screen recording, upload unlisted to YouTube / Loom / Drive with link access), Code and repo, Interview prep — be ready to explain, Live site (Vercel production URL), PageSpeed Insights (https://pagespeed.web.dev) — on the LIVE URL, README (+1 more)

### Community 35 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 36 - "WhySection.tsx"
Cohesion: 0.29
Nodes (6): WhyCard, WhyData, WhySection(), WhySectionProps, FeatureCard(), FeatureCardProps

### Community 37 - "ProcessSection.tsx"
Cohesion: 0.25
Nodes (7): ProcessData, ProcessSection(), ProcessSectionProps, StepItem, ProcessCard(), ProcessCardProps, StepItem

### Community 38 - "Ethixweb design system (India edition)"
Cohesion: 0.25
Nodes (7): Anti-patterns to reject, Before you finish a section, Design intent, Ethixweb design system (India edition), Layout skeleton, One memorable moment, Rules

### Community 39 - "Ethixweb motion"
Cohesion: 0.25
Nodes (7): Ethixweb motion, Feel-check before finishing, Gate every animation (in order), Implementation notes, Never ship, The approved motion list (everything else: don't add), Tokens (`globals.css`)

### Community 40 - "Leads backend skill"
Cohesion: 0.25
Nodes (7): Admin, Client form rules, Code organisation, Leads backend skill, Non-negotiables, POST /api/leads — order of operations, Verify (run and show output)

### Community 41 - "Ethixweb design system (India edition)"
Cohesion: 0.25
Nodes (7): Anti-patterns to reject, Before you finish a section, Design intent, Ethixweb design system (India edition), Layout skeleton, One memorable moment, Rules

### Community 42 - "Ethixweb motion"
Cohesion: 0.25
Nodes (7): Ethixweb motion, Feel-check before finishing, Gate every animation (in order), Implementation notes, Never ship, The approved motion list (everything else: don't add), Tokens (`globals.css`)

### Community 43 - "Leads backend skill"
Cohesion: 0.25
Nodes (7): Admin, Client form rules, Code organisation, Leads backend skill, Non-negotiables, POST /api/leads — order of operations, Verify (run and show output)

### Community 44 - "Ethixweb design system (India edition)"
Cohesion: 0.25
Nodes (7): Anti-patterns to reject, Before you finish a section, Design intent, Ethixweb design system (India edition), Layout skeleton, One memorable moment, Rules

### Community 45 - "Ethixweb motion"
Cohesion: 0.25
Nodes (7): Ethixweb motion, Feel-check before finishing, Gate every animation (in order), Implementation notes, Never ship, The approved motion list (everything else: don't add), Tokens (`globals.css`)

### Community 46 - "leads/route.ts"
Cohesion: 0.23
Nodes (16): ref_crypto, loginSchema, POST(), POST(), POST(), fail(), HttpError, ok() (+8 more)

### Community 47 - "India localization"
Cohesion: 0.29
Nodes (6): Accessibility for Hindi, Checklist of India features, Honesty rules, India localization, README design-rationale template, The India concept (one sentence)

### Community 48 - "India localization"
Cohesion: 0.29
Nodes (6): Accessibility for Hindi, Checklist of India features, Honesty rules, India localization, README design-rationale template, The India concept (one sentence)

### Community 49 - "India localization"
Cohesion: 0.29
Nodes (6): Accessibility for Hindi, Checklist of India features, Honesty rules, India localization, README design-rationale template, The India concept (one sentence)

### Community 50 - "design/page.tsx"
Cohesion: 0.27
Nodes (6): AboutTeaserData, AboutTeaserProps, ChamferCard(), ChamferCardProps, TwoToneHeading(), TwoToneHeadingProps

### Community 51 - "SectionLabel.tsx"
Cohesion: 0.20
Nodes (9): FaqData, FaqItem, FaqSection(), FaqSectionProps, Hero(), HeroData, HeroProps, SectionLabel() (+1 more)

### Community 52 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 53 - "PageSpeed 90+ skill"
Cohesion: 0.33
Nodes (5): Diagnose quickly, Guardrails, PageSpeed 90+ skill, Principles, Workflow

### Community 54 - "PageSpeed 90+ skill"
Cohesion: 0.33
Nodes (5): Diagnose quickly, Guardrails, PageSpeed 90+ skill, Principles, Workflow

### Community 55 - "PageSpeed 90+ skill"
Cohesion: 0.33
Nodes (5): Diagnose quickly, Guardrails, PageSpeed 90+ skill, Principles, Workflow

### Community 56 - "Ethixweb India — Assessment Instructions"
Cohesion: 0.33
Nodes (5): Core Rules, Ethixweb India — Assessment Instructions, Hard Deadline, Project Identity, Stack

### Community 57 - "DECISIONS — log every choice (this is your interview cheat-sheet)"
Cohesion: 0.40
Nodes (4): Decided (pre-filled — change only with a reason), DECISIONS — log every choice (this is your interview cheat-sheet), New decisions (append as you build), Open decisions (you must answer — agent can't)

### Community 58 - "06 — Build plan (deadline: Wed 14 Oct 2026, 9:26 PM IST)"
Cohesion: 0.40
Nodes (4): 06 — Build plan (deadline: Wed 14 Oct 2026, 9:26 PM IST), Cut lines (if behind), Git hygiene, Phase exit checks

### Community 59 - "DECISIONS — log every choice (this is your interview cheat-sheet)"
Cohesion: 0.40
Nodes (4): Decided (pre-filled — change only with a reason), DECISIONS — log every choice (this is your interview cheat-sheet), New decisions (append as you build), Open decisions (you must answer — agent can't)

### Community 60 - "06 — Build plan (deadline: Wed 14 Oct 2026, 9:26 PM IST)"
Cohesion: 0.40
Nodes (4): 06 — Build plan (deadline: Wed 14 Oct 2026, 9:26 PM IST), Cut lines (if behind), Git hygiene, Phase exit checks

### Community 61 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 62 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 63 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 69 - "Detailed Step Protocol"
Cohesion: 0.18
Nodes (10): Autonomous Execution Loop (LOOP.md), Detailed Step Protocol, Phases Roadmap, Step 1: Implement (Scope-Enforced), Step 2: Verify (Automated Evidence), Step 3: Review (Quality & Security Guardrails), Step 4: Update Context & Checklists, Step 5: Auto-Advance Gate (+2 more)

### Community 71 - "requireAdmin"
Cohesion: 0.33
Nodes (6): Admin auth guard (`src/lib/supabase/admin.ts`), PHASE 7 — Admin auth + protected shell (45m), Admin auth guard (`src/lib/supabase/admin.ts`), PHASE 7 — Admin auth + protected shell (45m), AdminContent(), requireAdmin()

## Knowledge Gaps
- **491 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+486 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 565 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `package.json`, `(site)/page.tsx`, `ServicesSection.tsx`, `contact/page.tsx`, `leads/route.ts`, `design/page.tsx`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `requireAdmin()` connect `requireAdmin` to `next`, `Leads backend skill`, `Leads backend skill`, `leads/route.ts`, `Leads backend skill`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `react` connect `next` to `WorkSection.tsx`, `package.json`, `ContactForm.tsx`, `WhySection.tsx`, `PHASES — build in small milestones, verify, then move on`, `design/page.tsx`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _491 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.057912457912457915 - nodes in this community are weakly interconnected._