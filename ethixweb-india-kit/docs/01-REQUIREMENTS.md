# 01 — Requirements checklist (from the Ethixweb brief)

Source: "Full Stack Developer Assessment" PDF + TPO email. Tick every box before submitting.

## The brief in one line
Redesign ethixweb.com as an **India-specific** site: Indian businesses, Indian audiences, Indian look and feel, still premium and world-class. *How* you make it India-specific is the test.

## A. Pages
- [ ] **Home**: hero with clear value proposition, services, process, featured work, why Ethixweb, strong CTA
- [ ] **Services**
- [ ] **About** (tell the India story)
- [ ] **Contact** (working enquiry form)
- [ ] Consistent design system across every page (same nav, footer, tokens, components)
- [ ] Extra pages needed to avoid broken links: `/privacy`, `404`, `/admin/login`

## B. Frontend — must look premium
- [ ] Ethixweb logo + red brand
- [ ] Fully responsive, mobile first (test 360, 390, 768, 1024, 1440)
- [ ] Smooth motion and micro-interactions (CSS only, see `ethixweb-motion`)
- [ ] **PageSpeed Insights 90+ on mobile and desktop**
- [ ] No lorem ipsum, no broken links, no console errors

## C. Backend — must actually work
- [ ] Enquiry form saves leads to a **real database** (Supabase Postgres). Nothing hardcoded
- [ ] Validation (client + server, Zod)
- [ ] Spam protection (honeypot + time-trap + Turnstile + rate limit)
- [ ] **Protected `/admin`**: secure login, view leads, manage leads (status, notes, delete, search/filter, CSV export)
- [ ] Secrets in environment variables, never in GitHub (`.env.example` committed, real keys only in Vercel)
- [ ] Clean API structure, proper status codes and error handling

## D. README
- [ ] Tech stack
- [ ] **Design rationale**: what makes it India-specific, why, what improved over the current site
- [ ] Setup + env vars, demo admin credentials, PageSpeed screenshots

## E. Submission (Tally: https://tally.so/r/KY7Ao8)
- [ ] 1. Live URL (Vercel or Netlify)
- [ ] 2. Public GitHub repo (no secrets in history)
- [ ] 3. README with tech stack + design rationale
- [ ] 4. PageSpeed Insights screenshots (mobile AND desktop)
- [ ] 5. Demo admin login (email + password)
- [ ] 6. Bonus: 1–2 minute walkthrough video

## F. Judging map (where the marks are)
| Weight | Criterion | What wins it |
|---|---|---|
| 30% | Design + India fit | A clear, *defensible* India concept (WhatsApp-first, ₹, Hindi, IST, Indian industries, jaali motif) executed with taste; reference-grade editorial design |
| 20% | UI/UX | Clear hierarchy, easy form, great mobile, accessible, smooth micro-interactions |
| 20% | Backend + code | Real DB, validated API, secure admin, clean structure, no leaked secrets |
| 20% | PageSpeed | 90+ both devices. Static-first, no heavy hero media, lazy third-party scripts |
| 10% | Detail + polish | 404 page, favicon, OG image, empty/loading/error states, copy quality, no console errors |

## G. Interview readiness (AI tools allowed, but you must explain everything)
Be able to answer: why Next.js/Supabase? why this red + black/white palette? why WhatsApp-first? how do the honeypot, time-trap, Turnstile and rate limit work together? why is the service-role key safe? what is RLS doing here? how did you reach 90+? what would you improve with more time?
