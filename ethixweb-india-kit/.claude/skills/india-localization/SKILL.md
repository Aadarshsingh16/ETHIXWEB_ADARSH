---
name: india-localization
description: Use for anything that makes the Ethixweb site India-specific: copy, Hindi/English (i18n), ₹ formatting, WhatsApp links, Indian phone validation, cities, industries, IST status, festivals, GST/UPI wording, jaali motif. Also use when writing About/India-story text or the README design rationale.
---

# India localization

The assessment says "how you make it India-specific is up to you — that thinking is the test" (30% of the score). Every India decision must be **visible, useful and defensible**.

## The India concept (one sentence)
*"Built for how India buys: WhatsApp-first, bilingual, priced in ₹, supported in IST, grounded in Indian industries."*

## Checklist of India features
1. **WhatsApp CTA** everywhere a CTA exists.
   - Link: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Ethixweb, I'd like to discuss a project.")}`
   - Number is digits only with country code (`91…`). `rel="noopener noreferrer"`, `target="_blank"`, aria-label "Chat on WhatsApp (opens in a new tab)".
   - Mobile sticky bottom bar (hidden on `/contact`).
2. **Hindi**: routes `/en/*` and `/hi/*`, `lang` attribute set, toggle is a plain link to the same page in the other language. Dictionaries in `src/content/{en,hi}.ts`; if a Hindi key is missing, fall back to English (never show a key name). Devanagari font only on `/hi`. Hindi copy should be natural Hinglish-friendly: common English loanwords (वेबसाइट, चैटबॉट, WhatsApp, GST, UPI) are fine and preferred over stiff Sanskritised Hindi.
3. **₹ formatting:** use `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })` → `₹29,999`; lakh grouping `₹2,00,000`. Say "excl. GST". Prices are **indicative**.
4. **Phone:** accept `+91 98765 43210`, `098765 43210`, `9876543210`; normalise to 10 digits; validate `^[6-9]\d{9}$`. Show `+91` as a fixed prefix in the UI; `inputmode="tel"`, `autocomplete="tel-national"`.
5. **Cities:** Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Lucknow, Chandigarh, Kochi, Indore, Other. Mention tier-2/3 cities in copy.
6. **IST status:** compute open/closed from `Asia/Kolkata` using `Intl.DateTimeFormat`. Default hours text: "Mon–Sat · 10 am–7 pm IST" (confirm with Ethixweb). Outside hours: "Offline · we reply next working day".
7. **Industries:** D2C, coaching/edtech, clinics, real estate, jewellery, restaurants/cloud kitchens, exporters. Concept projects must match these.
8. **Local marketing angle:** Google Business Profile, local SEO per city, regional-language content, festive campaigns (Diwali, Navratri, Eid, Christmas, Holi), wedding season, IPL.
9. **Trust language:** GST invoice, UPI/bank-transfer payment, support in IST, WhatsApp updates. Mark anything unconfirmed as `TODO(human)`; do not state compliance or certification claims that aren't verified.
10. **Visual:** red brand (auspicious), faint jaali lattice as texture, optional ✦ motif. Don't use clichés: no Taj Mahal, no saffron-green-white tricolour, no mandala clip-art, no stereotyped imagery.

## Honesty rules
- No fake clients, testimonials, awards, stats, or "trusted by" logos.
- Only verified Ethixweb facts: 22 services / 6 categories, Trustpilot 4.0 (as displayed on ethixweb.com), global team with an India hub.
- Concept work is labelled "Concept project". Prices labelled "Indicative".
- Ask the human for founding year, team size, office city, real phone/WhatsApp, real hours.

## README design-rationale template
For each India decision write: **Decision → Why (user insight) → How it shows up → Trade-off/perf impact**. Keep it short and specific (see `README.template.md`).

## Accessibility for Hindi
`lang="hi"` on `<html>` for `/hi`; line-height ≥ 1.35; no letter-spacing on Devanagari; avoid ALL-CAPS transforms; test 360px wrapping for long Hindi strings; buttons must not truncate.
