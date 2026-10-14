# 02 — Design System (SVZ High-Fashion Editorial × India Adaptation)

## Design Philosophy & Inspiration (svz.io)
**Black gallery wall, blood-red punctuation** — Oversized white display type floats on a void-like dark canvas, interrupted by a single vivid red accent and dramatic ornamental display faces that feel like gallery signage rather than conventional web UI.

SVZ operates in the visual register of a high-fashion editorial:
- **Canvas:** Pitch-black void (`#080808`), bone white typography (`#fcfcfc`), and a single arterial red (`#fe1e34`) that appears like a wound in the monochrome.
- **Chrome:** Deliberately sparse — surfaces carry no noisy chrome or bubble buttons, letting type, photographic collage, and oversized background shapes do the work.
- **Hierarchy:** Achieved through dramatic scale contrast (160px display stepping down to 10px tracked uppercase labels) and weight contrast (300 whisper-thin body against 700 blocky caps), never through rainbow colors.
- **Two-Family Typographic Dialogue:** Bold geometric sans caps (Inter Tight / Kmr Waldenburg) paired with delicate serif italic whispers (Playfair Display Italic / Editorialnew) on the same baseline.
- **Indian Market Integration:** Authentic `ethixweb.com` Indian business context (22 services across 6 categories, DPDP compliance, WhatsApp-first communication, ₹ pricing, GST invoicing, UPI payments, and IST business hours).

---

## Token Architecture (`src/styles/globals.css`)

### 1. Color Palette

| Token Name | Hex Value | Role |
|---|---|---|
| **Void Canvas** | `#080808` | Primary page background; the base upon which all display type and floating shapes sit |
| **Absolute Black**| `#000000` | Deepest surface, behind decorative shapes and image overlays |
| **Charcoal Plate**| `#171617` | Footer and elevated card surfaces, slightly elevated off the base void |
| **Smoke Plate** | `#262525` | Secondary surface for content blocks, hairline borders, and image frames |
| **Graphite Lift**| `#393939` | Subtle elevation border and hover platform |
| **Iron** | `#525252` | Hairline dividers, nav separators, link underlines on dark |
| **Ash** | `#d4d2d2` | Muted secondary text, nav labels, subtle borders |
| **Pebble** | `#b5b2b2` | Low-priority metadata, tertiary helper text, disabled states |
| **Linen** | `#f3efef` | Inverted body sections — warm-white content surface ("turning a magazine page") |
| **Bone White** | `#fcfcfc` | Primary text, hairline borders, icon outlines — the dominant light tone |
| **Arterial Red** | `#fe1e34` | Sole brand accent — card borders, cursor dot, live pulse; used as punctuation, not paint |
| **Crimson Pure** | `#ff0000` | Heading underline accent and decorative typographic emphasis |

---

## 2. Typography System

### A. Primary Display & UI (Inter Tight & Inter)
- **Role:** Display headings, bold caps, technical metadata, and UI controls.
- **Display Weights:** 700 Bold, with negative tracking (`tracking-[-0.05em]` to `tracking-[-0.075em]`), tight line heights (0.90 to 1.05).
- **Metadata & Nav Labels:** 10–12px uppercase, tracked OUT to `+0.071em` to `+0.308em` (`tracking-[0.18em]` to `tracking-[0.22em]`).

### B. Editorial Serif Italic Companion (Playfair Display Italic / Editorialnew)
- **Role:** Soft serif whisper words sitting inline between display caps (e.g., *"for Indian"*, *"crafting"*, *"online &"*), creating editorial prestige.

### C. Devanagari Companion (Noto Sans Devanagari)
- **Role:** Dedicated typography for `/hi` Hindi routes, preserving proportional balance.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token / Utility |
|---|---|---|---|---|
| **display-xl** (Hero H1) | 96px–124px | 0.90–0.94 | `-0.06em` | `text-display-xl` |
| **display-lg** (Section H2) | 48px–64px | 0.98–1.02 | `-0.045em` | `text-display-lg` |
| **heading-sm** (Card H3) | 24px–32px | 1.05–1.10 | `-0.035em` | `text-heading-sm` |
| **body** (Content) | 14px–16px | 1.50 | `-0.015em` | `text-body` |
| **label-meta** (Nav & Chips)| 10px–12px | 1.20 | `+0.18em`–`+0.22em` | `text-caption` (uppercase) |

---

## 3. Shapes, Radii & Spacing

- **Base Spacing Unit:** 8px
- **Border Radii:**
  - Navigation & Inline Links: `3px`
  - Cards, Buttons, and Inputs: `8px`
  - Large Surface Panels: `14.4px`
- **Strict Rule:** No bubbly 28px/9999px bubble pills. Rounding is a whisper (3px to 8px), not a bubble.
- **Elevation & Shadows:**
  - Dark variant card highlight: `rgba(255, 255, 255, 0.08) 0px 1px 3px 0px inset`
  - Zero heavy drop shadows; separation is achieved through color contrast and hairline borders (`1px solid #262525`).

---

## 4. Component Affordances

### 1. Ghost CTA Link
- Primary action across editorial sections: 12px uppercase tracked text (`tracking-[0.16em]`), bone-white text, paired with a 45° arrow icon (`↗`). No fill, no border.

### 2. Discovery Call Outlined Button
- High-intent action: 8px border-radius rectangle with 1px hairline border at `#d4d2d2`/40 on the void, containing a diagonal arrow `↗`. Internal padding: 10px 20px.

### 3. Arterial Red Accent Dot (`#fe1e34`)
- Solid 6px–16px circle acting as a living pulse (e.g. `pulse-dot`), placed sparingly near CTAs and status indicators. The red is a heartbeat, never a background coat.

### 4. Bordered Brand Card (`card-featured-svz`)
- Background: Void (`#080808`) or Charcoal (`#171617`).
- Border: `1px solid #fe1e34`. 8px radius. Used strictly on featured/active items (1 per grid).

### 5. Inverted Linen Body Panel (`#f3efef`)
- The *Why Ethixweb* bento or narrative chapter uses warm-white `#f3efef` background with `#080808` text, simulating turning a printed magazine page.

---

## 5. Strict Do's & Don'ts

### Do
- Let typography carry hierarchy (96–124px display down to 10px tracked uppercase metadata).
- Use `#fe1e34` strictly as a 1px border on featured elements, status dots, and subtle glows — red must remain rare to hold power.
- Mix bold architectural display caps with delicate serif italic words on the same baseline.
- Keep border-radius to 3px (nav) and 8px (cards/buttons).
- Anchor interactive CTAs with 45° diagonal arrows (`↗`).

### Don't
- Do not use `#fe1e34` as full page backgrounds or wide fills (strictly ≤ 5% of viewport).
- Do not add bubbly pill buttons or heavy drop shadows.
- Do not use more than two font families in one composition.
- Do not place body text below 14px or above 24px without shifting to a display role.
