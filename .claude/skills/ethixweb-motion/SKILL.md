---
name: ethixweb-motion
description: Use for ANY animation, transition, hover, reveal, marquee, accordion, scroll effect, micro-interaction or "make it smooth" request on the Ethixweb India site. CSS-first motion with strict performance and accessibility rules.
---

# Ethixweb motion

Adapted from Emil Kowalski's animation principles (original: `npx skills add emilkowalski/skills@animate`) and tuned to this project: **PageSpeed 90+ on mobile** and a premium editorial feel. No animation libraries.

## Gate every animation (in order)
1. **Should it animate?** Seen constantly or keyboard-driven → no animation. Marketing page moments seen once → can be expressive.
2. **Name its purpose:** feedback, spatial consistency, state change, preventing a jarring change, explanation, or (rarely) delight. If you can't name it, don't build it.
3. **Cheapest tool:** CSS transition → CSS animation → `<details>`/sticky/scroll-timeline → tiny IntersectionObserver. **Never** Framer Motion, GSAP, Lottie, WebGL, video backgrounds, parallax JS.
4. **Properties:** `transform` and `opacity` only. (Accordion height via `grid-template-rows: 0fr → 1fr` is the one tolerated exception.) Never animate width/height/margin/top/left.
5. **Curve + duration** from the tokens below. Never `ease-in` on UI. Never `transition: all`. Never `scale(0)` (start at 0.95 + opacity).
6. **Reduced motion + hover gating ship with the animation.**

## Tokens (`globals.css`)
```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* entrances, exits, presses */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement */
  --dur-press: 120ms; --dur-hover: 160ms; --dur-ui: 220ms; --dur-reveal: 480ms; --dur-hero: 700ms;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```
(For fine control, still write an explicit `@media (prefers-reduced-motion: reduce)` next to any non-trivial animation; keep opacity/colour changes, remove movement.)

## The approved motion list (everything else: don't add)
| Where | Motion | Spec |
|---|---|---|
| **Hero load** (the one orchestrated moment) | Headline lines rise into place, then sub + CTAs + cards, staggered 60ms | `transform: translateY(14px→0)` with `clip-path`/overflow mask, **no opacity:0 start on the H1** (protects LCP); 700ms `--ease-out` |
| **Buttons** | Press feedback; arrow circle nudges | `:active { transform: scale(.97) }` 120ms; arrow `translateX(2px)` 160ms inside `@media (hover:hover) and (pointer:fine)` |
| **Nav pill** | Active/hover background change | `background-color` 160ms `ease` |
| **About two-tone text** | Words fill from faded → ink as you scroll | CSS `animation-timeline: view()` inside `@supports`, fallback = static ink text; or one shared IntersectionObserver toggling a class per word |
| **Services accordion** | Row expands | Native `<details name>`; content wrapper `grid-template-rows 0fr→1fr` 260ms `--ease-in-out`; +/− icon rotates 180ms |
| **Work cards stack** | Cards pile as you scroll | CSS `position: sticky` with incremental `top`; **zero JS** |
| **Marquee** | Continuous industries ticker | CSS keyframes `translateX(0 → -50%)`, `linear`, 40s; pause on hover; reduced-motion → static, wrapped |
| **Process cards** | Gentle entrance, 4 cards, 60ms stagger | `opacity 0→1` + `translateY(12px→0)`, 480ms `--ease-out`, once, via shared observer |
| **Online dot** | Soft pulse | `transform: scale` + `opacity` ring, 2s, disabled in reduced-motion |
| **Form** | Field focus ring; error text appears; success swap | ring `box-shadow` is allowed for focus only (accessibility) 120ms; success panel fade 220ms |
| **Mobile menu** | Panel opens | `opacity` + `translateY(-8px→0)` 200ms `--ease-out`; exit 160ms |
| **Sticky WhatsApp bar** | Slides up after first scroll | `translateY(100%→0)` 220ms `--ease-out` |

**Not animated (by design):** footer, pricing, FAQ content text, admin dashboard (utility UI used repeatedly — instant state changes only, maybe a 120ms row highlight on update).

## Implementation notes
- Scroll reveals: one `Reveal` client component using a single shared `IntersectionObserver` (`threshold: .15`, `rootMargin: "0px 0px -10% 0px"`), unobserve after first intersect. Content must be visible without JS (`<noscript>` or default visible, enhance with class).
- Stagger via CSS custom property: `style={{ "--i": index }}` and `transition-delay: calc(var(--i) * 60ms)`.
- Use `transition-property` explicitly: `transition: transform var(--dur-hover) var(--ease-out), background-color var(--dur-hover) ease`.
- `will-change` only on elements that are actively animating (marquee track); remove otherwise.
- Hover effects wrapped in `@media (hover: hover) and (pointer: fine)` so touch taps don't trigger false hovers.
- Retargetable interactions (toggles, menus) use **transitions**, not keyframes (keyframes restart from zero when interrupted).
- Exit like you entered (menu slides up out, not fades from a different direction). Exits ~20% faster than entrances.
- Keep UI motion under 300ms; only the hero and about-fill may exceed it.

## Feel-check before finishing
Play at slow-motion in DevTools (Animations panel, 10%) to inspect easing; test on a throttled CPU (6x) and a real phone; re-check next day with fresh eyes. If it can't be justified, delete it.

## Never ship
`transition: all` · `scale(0)` entrance · `ease-in` · keyframes on rapidly-toggled UI · animating layout properties · ungated hover motion · missing reduced-motion · everything entering at once · any animation that delays LCP.
