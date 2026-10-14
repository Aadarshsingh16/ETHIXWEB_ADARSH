# 05 — PageSpeed Insights 90+ (mobile AND desktop)

PSI mobile simulates a mid-range Android on slow 4G. This design is *deliberately* type-led so it can score 95+: the LCP element is the H1 text, not an image.

## Targets (mobile)
LCP < 2.0s · CLS < 0.05 · TBT < 150ms · INP good · First-load JS (home) **< 100 kB gzipped** · Accessibility, Best Practices, SEO all ≥ 95 (judges will likely look at the whole PSI card).

## What we do
**Rendering**
- Server Components + static generation (`generateStaticParams` for `[lang]`). Public pages ship near-zero JS.
- Client islands only: `ContactForm`, `StatusPill`, `Reveal/ScrollFill` observer, mobile menu. Everything else is server-rendered.
- No Supabase SDK, no analytics, no chat widgets on public pages.

**Fonts** (`next/font/google`)
- Inter Tight (600, 700) + Inter (400, 500), `subset: ["latin"]`, `display: "swap"`, `adjustFontFallback` on. Max 4 font files.
- Noto Sans Devanagari loaded **only in `app/[lang]/layout.tsx` when `lang === "hi"`**.

**Images**
- Zero stock photos. Mockups are CSS/SVG. Logo, icons and the jaali pattern are inline SVG.
- If an image is unavoidable: `next/image`, explicit width/height, AVIF/WebP, `priority` only on the LCP image, lazy elsewhere.
- OG image generated once, not shipped in the page.

**CSS / JS**
- Tailwind v4 (purged by default). One global CSS file < 25 kB gzipped.
- No animation libraries. Scroll-linked effects via one shared `IntersectionObserver` (< 1 kB) or CSS `animation-timeline: view()` as progressive enhancement.
- Dynamic-import the Turnstile script **on first form interaction** (focus on any field) — it's the heaviest third-party on the site.
- Avoid `backdrop-filter` on large areas; avoid `filter: blur` > 20px.

**LCP protection (important with motion)**
- The H1 must paint on first frame. Animate its **transform / clip-path only**; never start it at `opacity: 0`.
- Nothing above the fold waits for JS to appear.

**Layout stability**
- Reserve space: fixed heights for nav, hero cards, form fields, Turnstile container (65px).
- No late-injected banners. Fonts use fallback metrics.

**Network (India-specific bonus)**
- Vercel function region `bom1`; Supabase Mumbai. Cache static pages at the edge. Set long `Cache-Control` on static assets (Vercel does by default).
- `<link rel="preconnect">` only for hosts actually used above the fold (none if fonts are self-hosted by next/font).

**SEO + best practices (cheap points)**
- `<html lang>` correct per route; one `<h1>` per page; descriptive `<title>` + meta description per page; canonical + `hreflang` en/hi; `sitemap.xml`, `robots.txt`; favicon + apple-touch icon; `theme-color`.
- Links have discernible text; buttons have accessible names; icon-only buttons have `aria-label`.
- HTTPS only (Vercel). No console errors/warnings. No deprecated APIs.

## Measuring correctly
1. Deploy to Vercel **production** (not preview, not `next dev`).
2. Test the **live URL** at pagespeed.web.dev for Mobile and Desktop, 3 runs each; use the median.
3. Also run Lighthouse in Chrome Incognito (extensions off) → Mobile + Desktop.
4. Screenshot both PSI results (full card visible with the URL) for the submission.
5. Re-test `/`, `/services`, `/about`, `/contact`. Scores must hold on all four; `/contact` is the risky one (Turnstile) — keep it lazy.

## If a score is below 90
| Symptom | Fix |
|---|---|
| LCP high | Is the H1 hidden by animation? Is the font blocking? Reduce hero DOM; remove backdrop-filter |
| TBT / unused JS | Find large client chunks with `@next/bundle-analyzer`; move code server-side; lazy-load island |
| CLS | Missing sizes on cards, late font swap, Turnstile container height |
| Accessibility | Contrast (`--color-fade` is for large text only), missing labels, heading order |
| Best practices | Console errors, mixed content, missing `lang`, third-party cookies |
| Cold server response | `force-static` the public pages; check region |

## Budget rules for the agent
- Before adding any dependency: check its bundlephobia size; ask the human if > 10 kB gzipped.
- After each phase run `pnpm build` and read the "First Load JS" table; flag any route > 100 kB.
