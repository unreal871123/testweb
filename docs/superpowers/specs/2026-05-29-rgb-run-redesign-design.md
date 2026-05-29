# RGB RUN — Site Redesign + Happy Hour Section

**Date:** 2026-05-29
**Status:** Approved layout, pending spec review

## Goal

Rebuild the RGB RUN single-page site with a high-energy, youth-focused **Y2K-Pop / sticker** aesthetic, and add a prominent **Happy Hour** promotion. Keep all existing media (logo, intro video, party/gallery images) and all existing business content.

## Context & Constraint

The `gh-pages` branch contains only the **compiled Next.js export** (minified JS chunks + generated HTML) — no source code. A redesign by hand-editing minified chunks is impractical and unmaintainable. **Decision (approved): build a fresh standalone static page** that fully replaces the Next.js-rendered `index.html`, with hand-written CSS and lightweight vanilla JS. The new page does not depend on the `_next/` bundle.

- `_next/` chunks and `waiver.html` stay in place (waiver still references them).
- The original `index.html` is preserved as `index.original.html` before replacement.
- All asset references use **relative `./` paths** so the site works whether served from the custom domain root or a `/testweb/` subpath. (Fixes the existing `poster="/testweb/frame-band.jpg"` absolute-path bug.)

## Visual Direction — Y2K Pop / Sticker

- **Palette:** dark base `#0b0b0b`/`#05060a`; neon green `#39ff14`; electric blue `#00e5ff`; hot pink `#ff2d78`; yellow `#ffd400`; purple `#a259ff`; white. Rainbow conic/linear gradients for hero accents and the Happy Hour section.
- **Type:** heavy display font for headings (e.g. **Anton** / Archivo Black via Google Fonts), **Permanent Marker** for handwritten accents (already on-brand), **Poppins** for body. Loaded via Google Fonts CDN.
- **Motifs:** chunky rounded blocks, slightly tilted "sticker" cards, circular sticker badges with hard offset shadows, bold uppercase, high contrast.
- **Motion (the "hype"):** animated scrolling marquee on the Happy Hour banner; scroll-reveal (fade/slide up) via IntersectionObserver; hover wiggle/lift on cards and buttons; subtle gradient animation. Respects `prefers-reduced-motion`.

## Page Structure (single scrolling page)

1. **Sticky nav** — RGB RUN logo (`./logo-landscape.png`), anchor links (Happy Hour · Pricing · Party · Gallery), **Book** button. Collapses to a compact bar / hamburger on mobile.
2. **Happy Hour banner** — sticky strip below nav, animated marquee: `⚡ $5 OFF EVERY GAME · MON–FRI 3–6PM ⚡`.
3. **Hero** — `./intro-video.webm`/`.mp4` background (poster `./frame-band.jpg`), gradient overlay, big "RGB RUN" wordmark, short tagline (game rooms + parties for your squad), location line (2439 Park Ave, Tustin, CA · (951) 532-1357), CTAs: **Book Now** (`mailto:rgbrunning@gmail.com`) + **Call / Text** (`tel:`/`sms:` 951-532-1357).
4. **Happy Hour section** — bold rainbow section restating the deal in detail: **Monday–Friday, 3PM–6PM, every player gets $5 OFF per game.** Eye-catching, with a Book CTA.
5. **Pricing** — heading + "more friends = cheaper" hook. Per-player ticket tiers as bold price cards: **2 → $19.99 · 3 → $17.99 · 4 → $14.99 · 5 → $13.99 · 6 → $12.99** (tiers 7–10+ already removed). Price is per player, per game.
6. **Party Rooms** — `./party.jpeg` image + rates:
   - Small Game Room: **$149/hour**
   - Big Game Room: **$199/hour**
   - Small Game Room + Party Room: **$199/hour**
   - Whole Place (Big + Small + Party, private event): **$450 / 90 min** (20% off weekdays)
   - *Each additional 30 min of gameplay is **50% off***
   - **$100 deposit** via Zelle (951-532-1357). Refunds: full ≥2 weeks out · 50% within 5 days · none within 48 hours.
   - Book CTA.
7. **Reservation** — large **Email** (`mailto:rgbrunning@gmail.com`) + **Call/Text** buttons, business name (Run Entertainment LLC), location.
8. **Gallery** — responsive photo grid using `./gallery/thumbnails/1–4.jpg` with a click-to-zoom **lightbox** (overlay + prev/next/close, keyboard + click support) showing `./gallery/slider-images/*`. The leftover template captions (band names / foreign cities / dates) are **dropped** — they don't fit a game venue; gallery shows photos only with an optional simple label.
9. **Footer** — logo, address, hours, phone, email, link to **Waiver** (`./waiver.html`), © Run Entertainment LLC.

## Components / Files

- `index.html` — new standalone markup (semantic sections with `id`s for anchor nav).
- `./assets/styles.css` — all styling (CSS custom properties for the palette, responsive via media queries, keyframes for marquee/reveal/hover).
- `./assets/app.js` — vanilla JS: mobile nav toggle, scroll-reveal IntersectionObserver, gallery lightbox, smooth-scroll for anchor links.
- `index.original.html` — backup of the current compiled page.

No build step, no framework, no runtime dependency beyond Google Fonts.

## Out of Scope

- Redesigning `waiver.html` (kept as-is, linked from footer). Can be a follow-up.
- Any online booking/payment system (bookings remain email + phone/Zelle).
- Touching `_next/` chunks or other compiled pages.

## Success Criteria

- Page renders identically with no Next.js dependency; all images/video load via relative paths.
- Happy Hour deal is impossible to miss (sticky banner + section).
- Pricing shows only tiers 2–6; all current business info (rates, deposit, refund policy, contact) preserved and accurate.
- Gallery lightbox works (open/close/navigate) on desktop and mobile.
- Responsive from ~360px mobile to wide desktop; passes `prefers-reduced-motion`.
- Distinct, energetic Y2K-pop look targeting a young audience.
