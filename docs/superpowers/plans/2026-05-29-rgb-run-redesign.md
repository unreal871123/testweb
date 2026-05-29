# RGB RUN Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the compiled Next.js page with a fresh, standalone, high-energy Y2K-pop single-page site and add a prominent Happy Hour promotion.

**Architecture:** A self-contained `index.html` + `./assets/styles.css` + `./assets/app.js`, no framework/build step, all assets referenced by relative `./` paths. The original page is backed up first. Vanilla JS handles mobile nav, smooth-scroll, scroll-reveal, and the gallery lightbox.

**Tech Stack:** HTML5, hand-written CSS (custom properties, fl/grid, keyframes), vanilla ES6 JS, Google Fonts (Anton, Permanent Marker, Poppins). Verification by serving with `python3 -m http.server` and viewing in a browser.

**Spec:** `docs/superpowers/specs/2026-05-29-rgb-run-redesign-design.md`

**Design tokens (use throughout `styles.css`):**
```css
:root{
  --bg:#0b0b0b; --bg2:#05060a; --ink:#ffffff;
  --green:#39ff14; --blue:#00e5ff; --pink:#ff2d78; --yellow:#ffd400; --purple:#a259ff;
  --rainbow:conic-gradient(from 200deg,#ff2d78,#ffd400,#39ff14,#00e5ff,#a259ff,#ff2d78);
  --font-display:'Anton',Impact,sans-serif; --font-marker:'Permanent Marker',cursive; --font-body:'Poppins',system-ui,sans-serif;
  --shadow-hard:6px 6px 0 #0b0b0b;
}
```

**Business content (authoritative — use verbatim):**
- Location: 2439 Park Ave, Tustin, CA · Tel/Text (Zelle): (951) 532-1357 · Email: rgbrunning@gmail.com · Run Entertainment LLC
- Happy Hour: **Monday–Friday, 3PM–6PM — every player gets $5 OFF per game.**
- Pricing (per player, per game): 2 → $19.99 · 3 → $17.99 · 4 → $14.99 · 5 → $13.99 · 6 → $12.99
- Party Rooms: Small Game Room $149/hr · Big Game Room $199/hr · Small Game Room + Party Room $199/hr · Whole Place (Big+Small+Party, private event) $450/90 min (20% off weekdays) · *Each additional 30 min of gameplay 50% off* · $100 deposit via Zelle (951-532-1357) · Refunds: full ≥2 weeks · 50% within 5 days · none within 48 hrs
- Gallery thumbnails: `./gallery/thumbnails/1.jpg`–`4.jpg`; lightbox slides under `./gallery/slider-images/` (`1-1.jpg`,`1-2.jpg`,`1-3.jpg`,`2-1.jpg`,`3-1.jpg`,`4-1.jpg`). No band/city/date captions.
- Media: `./logo-landscape.png`, `./logo-portrait.png`, `./intro-video.webm` + `./intro-video.mp4` (poster `./frame-band.jpg`), `./party.jpeg`. Waiver page: `./waiver.html`.

---

### Task 1: Backup + scaffold

**Files:**
- Create: `index.original.html` (copy of current `index.html`)
- Modify: `index.html` (replace with new skeleton)
- Create: `assets/styles.css`
- Create: `assets/app.js`

- [ ] **Step 1: Back up the current page**

Run: `cp index.html index.original.html`

- [ ] **Step 2: Write `index.html` skeleton**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>RGB RUN!</title>
  <meta name="description" content="RGB RUN — game rooms & parties in Tustin, CA. Bring your squad."/>
  <meta name="google-site-verification" content="ephPAYWfbfSOHHWnGeqEHiOPuxTXr300eIzTmT2oJcY"/>
  <link rel="icon" href="./favicon.ico"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Permanent+Marker&family=Poppins:wght@400;600;800&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="./assets/styles.css"/>
</head>
<body>
  <!-- NAV (Task 2) -->
  <!-- BANNER (Task 2) -->
  <main>
    <!-- HERO (Task 3) -->
    <!-- HAPPY HOUR (Task 4) -->
    <!-- PRICING (Task 5) -->
    <!-- PARTY (Task 6) -->
    <!-- RESERVATION (Task 7) -->
    <!-- GALLERY (Task 8) -->
  </main>
  <!-- FOOTER (Task 9) -->
  <script src="./assets/app.js" defer></script>
</body>
</html>
```

- [ ] **Step 3: Write `assets/styles.css` base** — paste the `:root` tokens above, then a reset and base body:

```css
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font-body);background:var(--bg);color:var(--ink);overflow-x:hidden}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
.container{width:min(1200px,92%);margin-inline:auto}
.section{padding:clamp(3rem,8vw,7rem) 0}
h2.title{font-family:var(--font-display);font-size:clamp(2.5rem,8vw,5rem);line-height:.95;text-transform:uppercase;letter-spacing:1px}
.btn{display:inline-block;font-family:var(--font-display);text-transform:uppercase;letter-spacing:1px;padding:.8em 1.6em;border-radius:999px;border:3px solid transparent;transition:transform .15s ease}
.btn:hover{transform:translateY(-3px) rotate(-1deg)}
.btn-yellow{background:var(--yellow);color:#0b0b0b;box-shadow:var(--shadow-hard)}
.btn-outline{background:transparent;border-color:var(--green);color:var(--green)}
```

- [ ] **Step 4: Write `assets/app.js` stub**

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log('RGB RUN loaded');
});
```

- [ ] **Step 5: Verify it serves**

Run: `python3 -m http.server 8000` and open `http://localhost:8000`.
Expected: blank dark page, fonts loaded, console logs "RGB RUN loaded", no 404s for `styles.css`/`app.js` in the network tab.

- [ ] **Step 6: Commit** (only if the user has asked to commit)

---

### Task 2: Sticky nav + Happy Hour marquee banner

**Files:** Modify `index.html` (nav + banner), `assets/styles.css`, `assets/app.js`

- [ ] **Step 1: Add nav + banner markup** (replace the NAV/BANNER comments)

```html
<header class="nav" id="top">
  <div class="container nav-inner">
    <a href="#top" class="nav-logo"><img src="./logo-landscape.png" alt="RGB RUN"/></a>
    <nav class="nav-links">
      <a href="#happy-hour">Happy Hour</a><a href="#pricing">Pricing</a>
      <a href="#party">Party</a><a href="#gallery">Gallery</a>
    </nav>
    <a class="btn btn-yellow nav-cta" href="mailto:rgbrunning@gmail.com">Book</a>
    <button class="nav-toggle" aria-label="Menu">☰</button>
  </div>
</header>
<div class="marquee" aria-label="Happy hour: $5 off every game, Monday to Friday 3 to 6 PM">
  <div class="marquee-track">
    <span>⚡ $5 OFF EVERY GAME · MON–FRI 3–6PM&nbsp;&nbsp;</span>
    <span>⚡ $5 OFF EVERY GAME · MON–FRI 3–6PM&nbsp;&nbsp;</span>
    <span>⚡ $5 OFF EVERY GAME · MON–FRI 3–6PM&nbsp;&nbsp;</span>
    <span>⚡ $5 OFF EVERY GAME · MON–FRI 3–6PM&nbsp;&nbsp;</span>
  </div>
</div>
```

- [ ] **Step 2: Style nav + marquee** (append to `styles.css`)

```css
.nav{position:sticky;top:0;z-index:50;background:rgba(11,11,11,.85);backdrop-filter:blur(8px);border-bottom:2px solid rgba(255,255,255,.08)}
.nav-inner{display:flex;align-items:center;gap:1rem;padding:.6rem 0}
.nav-logo img{height:38px}
.nav-links{display:flex;gap:1.4rem;margin-left:auto;font-weight:600;text-transform:uppercase;font-size:.85rem;letter-spacing:.5px}
.nav-links a:hover{color:var(--yellow)}
.nav-cta{padding:.5em 1.2em;font-size:.85rem}
.nav-toggle{display:none;background:none;border:0;color:#fff;font-size:1.6rem;cursor:pointer}
.marquee{position:sticky;top:54px;z-index:49;overflow:hidden;background:repeating-linear-gradient(45deg,var(--pink) 0 22px,var(--yellow) 22px 44px);color:#0b0b0b;font-family:var(--font-display);letter-spacing:1px;white-space:nowrap}
.marquee-track{display:inline-flex;padding:.5rem 0;animation:scroll-x 18s linear infinite}
@keyframes scroll-x{to{transform:translateX(-50%)}}
@media(max-width:760px){
  .nav-links,.nav-cta{display:none}
  .nav-toggle{display:block;margin-left:auto}
  .nav.open .nav-links{display:flex;position:absolute;top:100%;left:0;right:0;flex-direction:column;background:#0b0b0b;padding:1rem 6%}
  .nav.open .nav-cta{display:inline-block;margin:0 6% 1rem}
}
```

- [ ] **Step 3: Add nav toggle + smooth anchor offset JS** (extend `app.js`)

```js
const nav = document.querySelector('.nav');
document.querySelector('.nav-toggle')?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => nav.classList.remove('open')));
```

- [ ] **Step 4: Verify** — reload `http://localhost:8000`. Expected: sticky nav stays on scroll, marquee scrolls right-to-left continuously, links smooth-scroll (once sections exist), hamburger appears < 760px and toggles the menu.

- [ ] **Step 5: Commit** (only if asked)

---

### Task 3: Hero

**Files:** Modify `index.html` (HERO), `assets/styles.css`

- [ ] **Step 1: Add hero markup**

```html
<section class="hero" id="hero">
  <video class="hero-video" autoplay muted loop playsinline poster="./frame-band.jpg">
    <source src="./intro-video.webm" type="video/webm"/>
    <source src="./intro-video.mp4" type="video/mp4"/>
  </video>
  <div class="hero-overlay"></div>
  <div class="container hero-content">
    <p class="hero-kicker">Game rooms · Parties · Tustin, CA</p>
    <h1 class="hero-title">RGB<span>RUN</span></h1>
    <p class="hero-sub">5 rooms. 1 squad. Bring your crew and run the games.</p>
    <p class="hero-loc">📍 2439 Park Ave, Tustin, CA · 📞 (951) 532-1357</p>
    <div class="hero-cta">
      <a class="btn btn-yellow" href="mailto:rgbrunning@gmail.com">Book Now</a>
      <a class="btn btn-outline" href="tel:9515321357">Call / Text</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style hero** (append CSS)

```css
.hero{position:relative;min-height:calc(100vh - 100px);display:flex;align-items:center;overflow:hidden}
.hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
.hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(162,89,255,.45),rgba(0,229,255,.30)),rgba(5,6,10,.45)}
.hero-content{position:relative;z-index:2;text-align:center}
.hero-kicker{font-family:var(--font-marker);color:var(--green);font-size:1.1rem;margin-bottom:.5rem}
.hero-title{font-family:var(--font-display);font-size:clamp(4rem,18vw,12rem);line-height:.8;text-transform:uppercase;text-shadow:4px 0 var(--pink),-4px 0 var(--blue)}
.hero-title span{display:block;color:var(--yellow);text-shadow:0 0 30px rgba(255,212,0,.6)}
.hero-sub{font-weight:800;font-size:clamp(1.1rem,3vw,1.6rem);margin:1rem 0 .3rem}
.hero-loc{opacity:.85;font-size:.95rem;margin-bottom:1.6rem}
.hero-cta{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
```

- [ ] **Step 3: Verify** — video plays muted/looping behind a big glitch-shadowed "RGB RUN", both CTAs visible; email + tel links work.

- [ ] **Step 4: Commit** (only if asked)

---

### Task 4: Happy Hour section

**Files:** Modify `index.html` (HAPPY HOUR), `assets/styles.css`

- [ ] **Step 1: Add markup**

```html
<section class="hh section" id="happy-hour">
  <div class="container hh-card reveal">
    <span class="hh-badge">😎 DEAL</span>
    <h2 class="title">Happy Hour</h2>
    <p class="hh-big">$5 OFF <span>every game</span></p>
    <p class="hh-when">Monday – Friday · 3PM – 6PM</p>
    <p class="hh-fine">Every player. Every game. Just show up during happy hour.</p>
    <a class="btn btn-yellow" href="mailto:rgbrunning@gmail.com?subject=Happy%20Hour%20Booking">Grab the deal</a>
  </div>
</section>
```

- [ ] **Step 2: Style** (append CSS)

```css
.hh{background:var(--bg)}
.hh-card{position:relative;text-align:center;background:var(--rainbow);color:#0b0b0b;border-radius:32px;padding:clamp(2rem,6vw,4.5rem);box-shadow:var(--shadow-hard)}
.hh-badge{position:absolute;top:-18px;left:50%;transform:translateX(-50%) rotate(-4deg);background:#0b0b0b;color:#fff;font-family:var(--font-display);padding:.5em 1.2em;border-radius:999px}
.hh-card .title{color:#0b0b0b}
.hh-big{font-family:var(--font-display);font-size:clamp(3rem,12vw,7rem);line-height:.85;margin:.3rem 0}
.hh-big span{display:block;font-size:.4em;color:#fff;-webkit-text-stroke:2px #0b0b0b}
.hh-when{font-family:var(--font-marker);font-size:clamp(1.3rem,4vw,2rem);margin-bottom:.4rem}
.hh-fine{font-weight:600;margin-bottom:1.6rem}
```

- [ ] **Step 3: Verify** — bold rainbow card with tilted "DEAL" badge, giant "$5 OFF every game", "Mon–Fri 3PM–6PM", working CTA.

- [ ] **Step 4: Commit** (only if asked)

---

### Task 5: Pricing (tiers 2–6)

**Files:** Modify `index.html` (PRICING), `assets/styles.css`

- [ ] **Step 1: Add markup** — heading + 5 price cards.

```html
<section class="section pricing" id="pricing">
  <div class="container">
    <h2 class="title reveal">Pricing</h2>
    <p class="lead reveal">More friends = cheaper games. Price is <b>per player, per game.</b></p>
    <div class="price-grid">
      <div class="price-card reveal"><span class="pc-num">2</span><span class="pc-lbl">players</span><span class="pc-amt">$19.99</span></div>
      <div class="price-card reveal"><span class="pc-num">3</span><span class="pc-lbl">players</span><span class="pc-amt">$17.99</span></div>
      <div class="price-card reveal"><span class="pc-num">4</span><span class="pc-lbl">players</span><span class="pc-amt">$14.99</span></div>
      <div class="price-card reveal"><span class="pc-num">5</span><span class="pc-lbl">players</span><span class="pc-amt">$13.99</span></div>
      <div class="price-card reveal"><span class="pc-num">6</span><span class="pc-lbl">players</span><span class="pc-amt">$12.99</span></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style** (append CSS)

```css
.lead{font-weight:600;font-size:1.1rem;margin:.6rem 0 2rem;opacity:.9}
.price-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1.2rem}
.price-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.2rem;padding:1.8rem 1rem;border-radius:22px;background:#141414;border:3px solid var(--blue);transition:transform .15s ease,border-color .15s ease}
.price-card:hover{transform:translateY(-6px) rotate(-2deg);border-color:var(--green)}
.pc-num{font-family:var(--font-display);font-size:3rem;color:var(--yellow);line-height:1}
.pc-lbl{text-transform:uppercase;letter-spacing:2px;font-size:.7rem;opacity:.7}
.pc-amt{font-family:var(--font-display);font-size:1.8rem;color:var(--green)}
```

- [ ] **Step 3: Verify** — 5 cards (2→6) showing the correct prices; hover lifts/tilts them; no 7/8/9/10+ tiers.

- [ ] **Step 4: Commit** (only if asked)

---

### Task 6: Party Rooms

**Files:** Modify `index.html` (PARTY), `assets/styles.css`

- [ ] **Step 1: Add markup** — image + rate list + deposit/refund + CTA.

```html
<section class="section party" id="party">
  <div class="container party-grid">
    <div class="party-media reveal"><img src="./party.jpeg" alt="RGB RUN party room"/></div>
    <div class="party-info reveal">
      <h2 class="title">Party Rooms</h2>
      <ul class="rate-list">
        <li><span>Small Game Room</span><b>$149/hour</b></li>
        <li><span>Big Game Room</span><b>$199/hour</b></li>
        <li><span>Small Game Room + Party Room</span><b>$199/hour</b></li>
        <li><span>Whole Place — Big + Small + Party (Private Event)</span><b>$450 / 90 min</b></li>
      </ul>
      <p class="rate-note">20% off the Whole Place on weekdays · *Each extra 30 min of gameplay is <b>50% off</b></p>
      <div class="deposit">
        <p>🔒 <b>$100 deposit</b> to lock your booking — via Zelle <b>951-532-1357</b> (Run Entertainment LLC).</p>
        <p class="refund">Full refund 2+ weeks out · 50% within 5 days · no refund within 48 hrs.</p>
      </div>
      <a class="btn btn-yellow" href="mailto:rgbrunning@gmail.com?subject=Party%20Room%20Booking">Book a Room</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style** (append CSS)

```css
.party-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(1.5rem,4vw,3rem);align-items:center}
.party-media img{border-radius:24px;border:4px solid var(--purple);box-shadow:var(--shadow-hard);width:100%;object-fit:cover;max-height:560px}
.rate-list{list-style:none;margin:1.4rem 0 1rem}
.rate-list li{display:flex;justify-content:space-between;gap:1rem;padding:.7rem 0;border-bottom:1px dashed rgba(255,255,255,.18);font-weight:600}
.rate-list b{color:var(--blue);white-space:nowrap}
.rate-note{font-size:.9rem;opacity:.85;margin-bottom:1rem}
.deposit{background:#141414;border-left:4px solid var(--green);border-radius:12px;padding:1rem 1.2rem;margin-bottom:1.4rem;font-size:.95rem}
.refund{opacity:.75;font-size:.85rem;margin-top:.4rem}
@media(max-width:760px){.party-grid{grid-template-columns:1fr}}
```

- [ ] **Step 3: Verify** — `party.jpeg` shows framed; all four rates + the additional-30-min note + deposit/refund text accurate; stacks on mobile.

- [ ] **Step 4: Commit** (only if asked)

---

### Task 7: Reservation

**Files:** Modify `index.html` (RESERVATION), `assets/styles.css`

- [ ] **Step 1: Add markup**

```html
<section class="section reserve" id="reserve">
  <div class="container reserve-box reveal">
    <h2 class="title">Ready to run?</h2>
    <p class="lead">Hit us up to reserve your squad's spot.</p>
    <div class="hero-cta">
      <a class="btn btn-yellow" href="mailto:rgbrunning@gmail.com">Email Us</a>
      <a class="btn btn-outline" href="sms:9515321357">Call / Text</a>
    </div>
    <p class="reserve-meta">Run Entertainment LLC · 2439 Park Ave, Tustin, CA · rgbrunning@gmail.com · (951) 532-1357</p>
  </div>
</section>
```

- [ ] **Step 2: Style** (append CSS)

```css
.reserve-box{text-align:center;background:#141414;border:3px solid var(--pink);border-radius:32px;padding:clamp(2rem,6vw,4rem)}
.reserve-meta{margin-top:1.4rem;opacity:.7;font-size:.9rem}
```

- [ ] **Step 3: Verify** — centered call-to-action box, both buttons work, contact line correct.

- [ ] **Step 4: Commit** (only if asked)

---

### Task 8: Gallery + lightbox

**Files:** Modify `index.html` (GALLERY), `assets/styles.css`, `assets/app.js`

- [ ] **Step 1: Add markup** — grid of 4 thumbnails + a lightbox overlay container. `data-slides` lists each card's images (comma-separated).

```html
<section class="section gallery" id="gallery">
  <div class="container">
    <h2 class="title reveal">Gallery</h2>
    <p class="lead reveal">See the chaos. Tap a photo to zoom.</p>
    <div class="gallery-grid">
      <button class="gal-item reveal" data-slides="./gallery/slider-images/1-1.jpg,./gallery/slider-images/1-2.jpg,./gallery/slider-images/1-3.jpg"><img src="./gallery/thumbnails/1.jpg" alt="RGB RUN photo 1"/></button>
      <button class="gal-item reveal" data-slides="./gallery/slider-images/2-1.jpg"><img src="./gallery/thumbnails/2.jpg" alt="RGB RUN photo 2"/></button>
      <button class="gal-item reveal" data-slides="./gallery/slider-images/3-1.jpg"><img src="./gallery/thumbnails/3.jpg" alt="RGB RUN photo 3"/></button>
      <button class="gal-item reveal" data-slides="./gallery/slider-images/4-1.jpg"><img src="./gallery/thumbnails/4.jpg" alt="RGB RUN photo 4"/></button>
    </div>
  </div>
  <div class="lightbox" id="lightbox" hidden>
    <button class="lb-close" aria-label="Close">✕</button>
    <button class="lb-prev" aria-label="Previous">‹</button>
    <img class="lb-img" alt="Gallery image"/>
    <button class="lb-next" aria-label="Next">›</button>
  </div>
</section>
```

- [ ] **Step 2: Style** (append CSS)

```css
.gallery-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem}
.gal-item{padding:0;border:3px solid var(--green);background:none;border-radius:18px;overflow:hidden;cursor:pointer;aspect-ratio:1;transition:transform .15s ease}
.gal-item:hover{transform:scale(1.03) rotate(-1deg)}
.gal-item img{width:100%;height:100%;object-fit:cover}
.lightbox{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;background:rgba(5,6,10,.92);gap:1rem;padding:1rem}
.lightbox[hidden]{display:none}
.lb-img{max-width:90vw;max-height:85vh;border-radius:12px;border:3px solid var(--yellow)}
.lb-close,.lb-prev,.lb-next{background:rgba(255,255,255,.1);color:#fff;border:0;font-size:2rem;width:54px;height:54px;border-radius:50%;cursor:pointer}
.lb-close{position:absolute;top:1rem;right:1rem;font-size:1.4rem}
```

- [ ] **Step 3: Add lightbox JS** (extend `app.js`)

```js
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('.lb-img');
let slides = [], idx = 0;
const show = () => { lbImg.src = slides[idx]; };
document.querySelectorAll('.gal-item').forEach(item =>
  item.addEventListener('click', () => {
    slides = item.dataset.slides.split(',');
    idx = 0; show(); lb.hidden = false;
  }));
const move = d => { idx = (idx + d + slides.length) % slides.length; show(); };
lb.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); move(1); });
lb.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); move(-1); });
lb.querySelector('.lb-close').addEventListener('click', () => lb.hidden = true);
lb.addEventListener('click', e => { if (e.target === lb) lb.hidden = true; });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') lb.hidden = true;
  if (e.key === 'ArrowRight') move(1);
  if (e.key === 'ArrowLeft') move(-1);
});
```

- [ ] **Step 4: Verify** — grid of 4 thumbnails; clicking opens the overlay; card 1 navigates through its 3 slides with ‹/›; arrows/Esc/backdrop-click work; close works.

- [ ] **Step 5: Commit** (only if asked)

---

### Task 9: Footer

**Files:** Modify `index.html` (FOOTER), `assets/styles.css`

- [ ] **Step 1: Add markup**

```html
<footer class="footer">
  <div class="container footer-inner">
    <img class="footer-logo" src="./logo-landscape.png" alt="RGB RUN"/>
    <div class="footer-cols">
      <p><b>Visit</b><br/>2439 Park Ave<br/>Tustin, CA</p>
      <p><b>Hours</b><br/>Happy Hour: Mon–Fri 3–6PM</p>
      <p><b>Contact</b><br/><a href="tel:9515321357">(951) 532-1357</a><br/><a href="mailto:rgbrunning@gmail.com">rgbrunning@gmail.com</a></p>
      <p><b>More</b><br/><a href="./waiver.html">Waiver</a></p>
    </div>
  </div>
  <p class="footer-copy">© Run Entertainment LLC · RGB RUN</p>
</footer>
```

- [ ] **Step 2: Style** (append CSS)

```css
.footer{background:var(--green);color:#0b0b0b;padding:2.5rem 0 1.5rem}
.footer-inner{display:flex;flex-wrap:wrap;gap:2rem;align-items:flex-start;justify-content:space-between}
.footer-logo{height:48px}
.footer-cols{display:flex;flex-wrap:wrap;gap:2rem;font-size:.9rem;line-height:1.5}
.footer-cols a:hover{text-decoration:underline}
.footer-copy{text-align:center;margin-top:1.5rem;font-weight:700;font-size:.8rem}
```

- [ ] **Step 3: Verify** — green footer, logo, address/hours/contact columns, working Waiver link to `./waiver.html`.

- [ ] **Step 4: Commit** (only if asked)

---

### Task 10: Motion polish + responsive + final pass

**Files:** Modify `assets/styles.css`, `assets/app.js`

- [ ] **Step 1: Add reveal + reduced-motion CSS** (append)

```css
.reveal{opacity:0;transform:translateY(28px);transition:opacity .6s ease,transform .6s ease}
.reveal.visible{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){
  *{animation:none!important;scroll-behavior:auto!important}
  .reveal{opacity:1;transform:none;transition:none}
  .btn:hover,.price-card:hover,.gal-item:hover{transform:none}
}
```

- [ ] **Step 2: Add scroll-reveal observer** (extend `app.js`)

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
```

- [ ] **Step 3: Responsive + cross-section verify** — at 360px, 768px, 1280px: nav collapses to hamburger, marquee scrolls, hero readable, price grid reflows, party stacks, gallery reflows, no horizontal scroll. Reveal animations fire on scroll. Toggle OS "reduce motion" and confirm animations stop and content is fully visible.

- [ ] **Step 4: Asset/link audit** — open the network tab, confirm zero 404s; every asset path begins with `./`; email/tel/sms and `./waiver.html` links all work.

- [ ] **Step 5: Commit** (only if asked)

---

## Self-Review Notes

- **Spec coverage:** nav (T2), happy-hour banner+section (T2,T4), hero+CTAs (T3), pricing 2–6 (T5), party rooms+deposit/refund (T6), reservation (T7), gallery+lightbox (T8), footer+waiver link (T9), motion+reduced-motion+responsive+relative-paths audit (T10). Backup + no-Next-dependency scaffold (T1). All spec sections mapped.
- **No placeholders:** every step contains real markup/CSS/JS and concrete business values.
- **Consistency:** class names, asset paths, and the `move()/show()/slides` lightbox API are consistent across tasks; design tokens defined once in T1 and reused.
- **Commits:** gated on explicit user request per environment rule (not automatic).
