# 07 — Copy-paste prompts for the agent

Setup once:
```bash
npx create-next-app@latest ethixweb-india --ts --tailwind --app --src-dir --eslint --use-pnpm
cd ethixweb-india
# copy this kit's AGENTS.md, docs/, supabase/, .env.example and .agents/ into the project root
npx skills add emilkowalski/skills@animate        # optional: original motion skill, complements ethixweb-motion
```

## Prompt 0 — orientation
```
Read AGENTS.md and every file in docs/. Summarise in 10 lines: the goal, the stack, the non-negotiable rules and the build phases. Then list any ambiguity or missing info you need from me (logo SVG, exact red, WhatsApp number, real service names). Do not write code yet.
```

## Prompt 1 — Phase 0 + 1 (setup + design system)
```
Do Phase 0 and Phase 1 from docs/06-BUILD-PLAN.md using the ethixweb-design-system and ethixweb-motion skills.
- Configure Tailwind v4 tokens from docs/02-DESIGN-SYSTEM.md in src/styles/globals.css
- Set up next/font: Inter Tight, Inter; Noto Sans Devanagari only for /hi
- Create app/[lang] routing (en, hi) with generateStaticParams and a dictionary loader in src/lib/i18n.ts
- Build Logo (use a text-wordmark placeholder if I haven't supplied the SVG), Button, PillNav, StatusPill, LangToggle, SectionLabel, TwoToneHeading, ChamferCard, Footer with giant wordmark, Marquee, and the .jaali utility
- Create a temporary /_design page that shows all of them
Run lint, typecheck and build. Report First Load JS per route.
```

## Prompt 2 — Phase 2 (home)
```
Build the home page per docs/02-DESIGN-SYSTEM.md "Home page layout" and docs/03-CONTENT.md. Use only the copy in 03-CONTENT.md. Hero must be server-rendered, H1 painted at first frame (no opacity:0 start). Services = native <details name="services">. Work cards = sticky stack with CSS/SVG mockups labelled "Concept project". No photos, no new dependencies. Mobile first at 390px. After building, run build and Lighthouse mobile on the local production build and fix anything below 90.
```

## Prompt 3 — Phase 3 (backend)
```
Implement the backend exactly as docs/04-BACKEND.md using the leads-backend skill: schema is in supabase/schema.sql (already run), Zod schema in src/lib/validation.ts, POST /api/leads with honeypot, time-trap, Turnstile verify and DB-backed rate limit, admin login via Supabase Auth, requireAdmin() on every admin route, /admin dashboard (table, status update, notes, delete, search, filter, pagination, CSV export). Use the JSON response shape and HttpError helper from the doc. Then write and run the test checklist at the bottom of the doc (curl commands for API cases) and show me the results.
```

## Prompt 4 — Phase 4 (inner pages + contact)
```
Build /services, /about, /contact, /privacy and the 404 page using docs/02 and docs/03. The contact form is a client component using the shared Zod schema, lazy-loads Turnstile on first focus, shows field errors from the API, and has a success state. About page: use only facts in docs/03-CONTENT.md; leave TODO(human) comments where facts are missing and list them for me at the end.
```

## Prompt 5 — Phase 5 (India layer + Hindi)
```
Apply the india-localization skill. Add the EN/HI toggle (links, no JS), Hindi dictionary for nav/hero/CTA/contact form/footer, the WhatsApp sticky bar on mobile, the WhatsApp button using NEXT_PUBLIC_WHATSAPP_NUMBER with prefilled text, +91 phone UX, Indian cities/budget selects, and the IST status pill. Verify Hindi text renders without layout breaks at 360px.
```

## Prompt 6 — Phase 6/7 (polish + performance)
```
Run a polish pass with ethixweb-motion and pagespeed-90 skills: reduced-motion, hover gating, focus states, empty/loading/error states, favicon, apple-touch-icon, OG image, metadata, sitemap.ts, robots.ts, hreflang. Then run @next/bundle-analyzer, list the 5 largest client chunks, and fix anything hurting LCP/TBT/CLS. Check for console errors on every route and broken links with linkinator against the local production server.
```

## Prompt 7 — Phase 8 (ship)
```
Fill README.template.md into README.md: tech stack, features, setup, env vars, design rationale (India-specific decisions, why, improvements over the current ethixweb.com), security notes, assumptions (concept projects, indicative prices), AI usage disclosure. Leave placeholders for live URL, demo admin credentials and PageSpeed screenshots. Then run the full docs/08-SUBMISSION-CHECKLIST.md and tell me what's still open.
```

## Review prompt (use after any big change)
```
Act as the hiring reviewer using the judging weights in docs/01-REQUIREMENTS.md. Score the current build /100, list the 5 weakest points, and fix the cheapest two.
```
