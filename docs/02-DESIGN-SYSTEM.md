# 02 — Design system

## Where this comes from
| Source | What we take | What we do NOT take |
|---|---|---|
| **Covix (Dribbble reference)** | Black hero card on light-grey page, giant tight headline, pill nav, small ✦ section label, **two-tone headlines (dark → grey)**, chamfered-corner cards, dark accordion services, stacked work cards, 4-step process cards, dark FAQ, brand marquee, giant footer wordmark | Their images, copy, smoke texture, stock people photos, their name |
| **Apple style reference** | Discipline: flat surfaces, **no shadows, no gradients**, white ↔ `#f5f5f7` section alternation, 28px radius cards, tight tracking on big type, accent colour only on links/CTAs, generous section gaps | Product-photo-heavy layout, Apple blue, SF Pro |
| **Current ethixweb.com** | Red brand, pill navbar, dark/light toggle, 6 service categories, Trustpilot 4.0 | WebGL globe, spiderweb hero, US time-zone strip, heavy hero |
| **Frontend-design guardrails** | One memorable moment (the hero), restraint elsewhere; numbers only where content is a sequence; no scattered fade-ups | — |

## Brand tokens (Tailwind v4 `@theme` in `src/styles/globals.css`)
```css
@theme {
  /* Brand */
  --color-red-500: #C1272D;   /* SAMPLE the exact hex from the real logo with an eyedropper */
  --color-red-600: #A51F25;   /* hover / pressed */
  --color-red-50:  #FDECEC;   /* tint for icon chips */

  /* Neutrals */
  --color-ink:     #0C0C0D;   /* dark sections */
  --color-ink-2:   #161617;   /* dark cards */
  --color-ink-3:   #242426;   /* dark card borders / hover */
  --color-paper:   #FFFFFF;
  --color-mist:    #F5F5F7;   /* alternate light band */
  --color-line:    #E6E6E8;   /* hairlines on light */
  --color-mute:    #6E6E73;   /* secondary text on light — passes 4.5:1 on white */
  --color-fade:    #A1A1A6;   /* ONLY for large faded headline words (>= 28px), never body */
  --color-mute-dark: #A1A1A6; /* secondary text on dark */

  /* Functional */
  --color-wa: #25D366;        /* WhatsApp green, only on the WhatsApp button/icon */
  --color-ok: #16A34A;        /* "online now" dot */

  /* Fonts (next/font variables) */
  --font-display: var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif;
  --font-sans:    var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-deva:    var(--font-noto-deva), var(--font-inter), sans-serif; /* hi only */

  /* Radius */
  --radius-card: 28px;  --radius-pill: 9999px;  --radius-input: 14px;

  /* Easing (see ethixweb-motion) */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
}
```
**Rules:** red ≤ ~5% of any viewport. No gradients (one very subtle red radial glow in the hero corner is the only exception). No shadows; separation comes from colour change, hairlines and radius.

## Typography
- **Display:** Inter Tight 600/700, tracking `-0.03em` at ≥ 56px (not tighter: the Stitch draft's `-0.06em` made words touch). Line-height 0.98–1.05.
- **Body/UI:** Inter 400/500, tracking `-0.011em`, 16–17px body, line-height 1.5.
- **Hindi:** Noto Sans Devanagari 500/700, loaded **only on `/hi/*`**, tracking 0, line-height 1.35.
- Max line length 68ch.

| Token | Mobile | Desktop |
|---|---|---|
| `display-xl` (hero) | 44px | `clamp(56px, 8vw, 112px)` |
| `display-lg` (section H2) | 32px | 56px |
| `title` | 22px | 28px |
| `body-lg` | 17px | 19px |
| `body` | 16px | 16px |
| `label` | 13px, **sentence case** | 13px |

**Two-tone headline (signature):** first clause in full ink, remainder in `--color-fade` (light sections) or `#6B6B70` (dark sections). Example: `Websites that sell` + faded `across every Indian city.` This is the *main* emphasis device. Red goes on the ✦ marker and CTAs, not on random headline words.

## Spacing and layout
- 4px base unit. Section gap **96px desktop / 64px mobile**. Container max 1200px, side padding 20px mobile / 40px desktop.
- Page background `--color-mist`; each major section is either a **dark inset card** (radius 28, 12px from viewport edge, like Covix) or a light band.
- Hero, Services and FAQ are dark cards. Everything else is light.

## Components (`src/components/ui`)
| Component | Spec |
|---|---|
| **Logo** | Inline SVG of the Ethixweb wordmark (copy from the ethixweb.com header via DevTools → Copy → SVG; fall back to "ETHIXWEB" in Inter Tight 800). White on dark, ink on light. Small red `IN` chip after it |
| **PillNav** | Floating, centred, dark glass (`rgba(22,22,23,.8)` + 1px `rgba(255,255,255,.12)` border). Active link = white pill with ink text. Mobile: logo + "Menu" button opening a full-width panel. Skip `backdrop-filter` if it hurts performance |
| **StatusPill** | Green dot + "Online · IST". Client component only to compute open/closed from IST; static fallback text |
| **LangToggle** | `EN | हिं` as plain `<a>` links to `/en/...` and `/hi/...` (no JS) |
| **Button** | Pill, 48px high. `primary` = white on dark / ink on light; `accent` = red bg, white text; `outline` = 1px hairline; `whatsapp` = `--color-wa` + icon. Arrow variant: 36px circle that nudges 2px on hover (hover-gated). Press = `scale(.97)` |
| **SectionLabel** | Red ✦ + 13px sentence-case label ("About us", "Services") |
| **TwoToneHeading** | `<h2>` with a `<span class="text-fade">` tail |
| **ChamferCard** | White card with `clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))`. Clip-path removes borders, so use background contrast instead |
| **FeatureCard** | 28px radius, flat, `paper` on `mist` |
| **ServiceAccordion** | Native `<details name="services">` (exclusive, zero JS). Row: category icon, title, sub-service chips, +/− toggle. Open panel: description + "Explore" button. **No 01–05 numbers** (services aren't a sequence) |
| **WorkCard (stacked)** | `position: sticky; top: calc(96px + var(--i) * 16px)` so cards pile up like Covix. Content = **CSS/SVG mockup** (browser frame, WhatsApp chat bubble, listing card) on a flat colour. Badge: "Concept project" |
| **ProcessCard** | 4 cards (Discover → Design → Build → Launch and grow), numbered 01–04 (this *is* a sequence), icon chip in `red-50`; staggered vertical offsets on desktop |
| **PricingCard** | Two cards (light + dark), "Starts at ₹…", label "Indicative · final quote after discovery" |
| **FAQ** | Dark card with `<details>` rows; right side is a quiet WhatsApp CTA panel, not a stock photo |
| **Marquee** | CSS `linear` infinite, duplicated list, pause on hover, static + wrap under reduced motion |
| **Footer** | Link columns, WhatsApp, email, and a **giant "Ethixweb" wordmark** cropped at the bottom (`aria-hidden`) |
| **Form fields** | 52px high, radius 14px, visible `<label>`, inline error with `aria-describedby`, focus ring 2px red-500 offset 2px |

## India layer (30% of the score — make it visible above the fold)
1. **WhatsApp** is a first-class CTA beside "Book a call": hero, sticky bottom bar on mobile, contact page, footer.
2. **EN | हिं** toggle in the nav + Hindi sub-headline in the hero.
3. **₹ + GST + UPI** in the hero paragraph, pricing and FAQ.
4. **IST "Online now" pill** replaces the US time-zone strip.
5. **Indian industries** marquee and tiles: D2C, Coaching and edtech, Clinics, Real estate, Jewellery, Restaurants, Exporters.
6. **Jaali-inspired pattern** as faint texture in hero/footer/CTA. Rationale: red is auspicious in India (weddings, festivals); lattice screens (jaali) are a signature of Indian architecture.
7. **Indian form UX:** +91 prefix, mobile validation `^[6-9]\d{9}$`, city dropdown, ₹ budget ranges, preferred contact (WhatsApp / Call / Email).
8. **Local marketing story** in services/about: Diwali and wedding-season campaigns, IPL, Google Business Profile, regional-language SEO.

### Jaali pattern (tiny inline SVG)
```css
.jaali {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56' fill='none' stroke='%23C1272D' stroke-opacity='.22'%3E%3Cpath d='M28 4l8 16 16 8-16 8-8 16-8-16-16-8 16-8z'/%3E%3Cpath d='M0 0l8 16M56 0l-8 16M0 56l8-16M56 56l-8-16' stroke-opacity='.12'/%3E%3C/svg%3E");
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at 80% 20%, #000 0%, transparent 65%);
  -webkit-mask-image: radial-gradient(ellipse at 80% 20%, #000 0%, transparent 65%);
}
```

## Home page layout (top → bottom)
```
[PillNav floating]
┌ HERO (dark inset card) ────────────────────────────────────────┐
│ ✦ Digital operations team for Indian businesses                │
│ Your business, online            [jaali texture, top-right]     │
│ and booked solid.  (two-tone)                                   │
│ आपका बिज़नेस, अब ऑनलाइन और हमेशा चालू।                          │
│ paragraph (₹ · GST · UPI · WhatsApp)                           │
│ [Book a call ↗] [WhatsApp us]        [ConceptCard][ConceptCard] │
│                                      progress line 01 ── 04     │
└─────────────────────────────────────────────────────────────────┘
Marquee: D2C ✦ Coaching ✦ Clinics ✦ Real estate ✦ Jewellery ✦ Restaurants ✦ Exporters
About     two-tone scroll-fill text + 2 ChamferCards (Trustpilot 4.0 · 22 services / 6 categories)
Services  dark inset card, 6 accordion rows
Work      sticky stacked concept cards x5
Process   4 cards
Why       bento: IST support · WhatsApp-first · transparent ₹ · 22 services · Trustpilot 4.0
Pricing   2 indicative cards
FAQ       dark card
CTA band  flat red-500 block + jaali  → [Book a call] [WhatsApp us]
Footer    columns + giant wordmark
```
The final CTA band is the **only** large red surface on the site.

## Inner pages
- **/services** — light hero, 6 category sections (anchor-linked) with sub-services, an India example each, CTA; FAQ strip.
- **/about** — "Our India story" narrative, values, global ↔ India delivery model, CTA. Only true facts about Ethixweb; leave `TODO(human)` markers for anything unknown (founding year, team size, office city) rather than inventing.
- **/contact** — left: form (Zod + Turnstile); right: WhatsApp card, email, response-time promise, hours. Success state replaces the form.

## Responsive rules
- 390px first: stacked layout, 44px+ tap targets, hero H1 44px, one concept card visible, sticky bottom bar `[WhatsApp] [Book a call]` (hidden on /contact).
- ≥ 768: two-column hero lower row. ≥ 1024: full Covix layout. ≥ 1440: cap container, enlarge display type.

## Quality bar for every section
- [ ] Right at 360 / 390 / 768 / 1024 / 1440
- [ ] Keyboard focus visible, contrast ≥ 4.5:1 body / 3:1 large text
- [ ] Reduced motion tested
- [ ] No layout shift (explicit sizes on anything that loads late)
- [ ] Copy comes from `docs/03-CONTENT.md`, not invented
