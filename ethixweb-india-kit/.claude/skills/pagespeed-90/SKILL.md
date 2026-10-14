---
name: pagespeed-90
description: Use for performance work on the Ethixweb India site: PageSpeed Insights / Lighthouse 90+ on mobile and desktop, LCP, CLS, TBT, bundle size, fonts, images, third-party scripts, SEO and best-practices fixes, and final measurement.
---

# PageSpeed 90+ skill

Source of truth: `docs/05-PERFORMANCE.md`. Performance is 20% of the grade and the brief says **90+ on mobile and desktop**. Treat it as a feature, not a final-hour fix.

## Principles
1. **Text is the LCP.** Hero is type-led; no hero image/video. The H1 must paint on first frame (animate transform/clip only, never `opacity:0` start).
2. **Ship less JS.** Server Components by default. Client islands: form, status pill, reveal observer, mobile menu. No animation libs, no Supabase SDK on public pages, no analytics.
3. **Fonts:** `next/font`, ≤ 4 files (Inter Tight 600/700, Inter 400/500), latin subset, `display: swap`. Noto Sans Devanagari only on `/hi`.
4. **Third parties lazy:** Turnstile loads on first form focus. Nothing else third-party.
5. **No layout shift:** reserve sizes (nav, cards, form fields, Turnstile 65px).
6. **Static first:** `generateStaticParams`, no needless `dynamic`; admin is the only dynamic area.
7. **India latency:** Vercel `bom1`, Supabase Mumbai.
8. **Cheap points:** `lang`, one `h1`, titles/descriptions, canonical + hreflang, sitemap, robots, favicon, alt/aria labels, contrast, no console errors.

## Workflow
1. `pnpm build` → read the "First Load JS" table; any route > 100 kB gzipped needs justification.
2. `ANALYZE=true pnpm build` with `@next/bundle-analyzer` → fix top offenders.
3. Run Lighthouse on `pnpm start` (production build), Chrome incognito, mobile + desktop.
4. Deploy; run PageSpeed Insights on the **live production URL** ×3, use the median; check `/`, `/services`, `/about`, `/contact`.
5. Save screenshots to `docs/pagespeed/` (`mobile.png`, `desktop.png`).

## Diagnose quickly
| Problem | Likely cause → fix |
|---|---|
| LCP > 2.5s | H1 animated from opacity 0; font blocking; huge hero DOM; `backdrop-filter` → remove / simplify |
| TBT high | Large client chunk; heavy hydration → move to server, lazy-load island |
| CLS > 0.1 | Unsized cards / late font / Turnstile → reserve space, fallback font metrics |
| Accessibility < 90 | Contrast (fade grey), missing labels, heading order, `aria-hidden` focusables |
| Best practices < 90 | Console errors, mixed content, deprecated APIs |
| SEO < 90 | Missing meta description, no `lang`, non-descriptive link text |

## Guardrails
Ask before adding any dependency > 10 kB gzipped. Never regress a previously passing page without noting it. Report numbers (before/after) every time.
