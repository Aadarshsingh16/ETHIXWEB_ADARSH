---
name: ethixweb-design-system
description: Use for ANY UI work on the Ethixweb India site: layout, sections, components, typography, colour, spacing, responsive behaviour, dark/light sections. Triggers on build/style/design/section/component/hero/card/nav/footer/page/layout/Tailwind/responsive requests in this repo.
---

# Ethixweb design system (India edition)

Source of truth: `docs/02-DESIGN-SYSTEM.md`. Copy comes from `docs/03-CONTENT.md`. Read both before building a section.

## Design intent
Editorial, type-led, premium. A black hero card, two-tone headlines (ink then faded grey), flat surfaces, chamfered cards, pill controls. Ethixweb red is a precise accent on a black/white base. India shows up through content and UX (WhatsApp, Hindi, ₹, IST, industries, jaali texture), not through clip-art.

## One memorable moment
The **hero** is the one expressive moment (giant two-tone headline + quiet jaali texture + two concept cards). Everything else stays quiet and disciplined. If a section feels busy, remove a decoration.

## Rules
1. Tokens only. Use Tailwind theme tokens from `globals.css`; no hardcoded hex in components.
2. **No shadows. No gradients** (except the masked jaali and one faint red glow in the hero corner).
3. Radius: cards 28px, pills 9999px, inputs 14px. Don't mix others.
4. Headlines are **two-tone** by default. Don't colour single words red. Red = ✦ markers, primary CTA accents, the final CTA band, focus ring.
5. Section labels are small, sentence case, with a red ✦. No tracked ALL-CAPS eyebrows above every heading.
6. Numbers (01–04) only on the Process section (a true sequence). Services are not numbered.
7. No stock photos. Visual interest = CSS/SVG mockups, type, pattern, whitespace.
8. Body text colour ≥ 4.5:1. `--color-fade` is for large headline text only.
9. Mobile first: write the 390px layout, then `md:` / `lg:` up. Tap targets ≥ 44px. No horizontal scroll at 360px.
10. Same components on every page (nav, footer, buttons, cards, form fields).
11. Semantic HTML: `header/nav/main/section/footer`, one `h1`, ordered headings, `aria-label`s on icon buttons, visible focus.
12. Server components by default; client only for form, status pill, observer, mobile menu.

## Layout skeleton
Page bg `mist`. Sections alternate: dark inset card (hero, services, FAQ) / light band. Container max 1200px. Section gap 64px mobile / 96px desktop.

## Before you finish a section
- Looks right at 360, 390, 768, 1024, 1440
- Copy matches `03-CONTENT.md` (no invented claims)
- Keyboard + reduced-motion checked
- No new dependency, no image added without need
- Screenshot compared to the Covix reference structure (not copied pixels)

## Anti-patterns to reject
Identical rounded-card grids for everything; gradient washes; emoji as icons; lorem ipsum; fake logos/testimonials; stock people photos; centered-everything layouts; animations on every section.
