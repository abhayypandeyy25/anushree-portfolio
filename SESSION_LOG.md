# Session Log — Anushree Chandra Portfolio

A running log of work on this site so future sessions have full context.
Newest entries on top.

---

## Project at a glance

- **What:** Personal portfolio for **Anushree Chandra** — AI Product Strategist & Enterprise Consultant (built by Abhay).
- **Local path:** `/Users/abhaypandey/Desktop/Workspace/Anushree/portfolio`
- **Content source:** `../AnushreeChandraResume.pdf.pdf` (resume).
- **Stack:** Static **HTML + CSS + vanilla JS**. No build step, no framework. Fonts: Fraunces (serif display) + Inter (Inter via Google Fonts).
- **Design:** Light editorial-minimal, theme-adaptive (light/dark toggle).

### Infrastructure (important — do not confuse with Abhay's own portfolio)
- **GitHub repo:** `https://github.com/abhayypandeyy25/anushree-portfolio` (separate from Abhay's `abhayypandeyy25/portfolio`).
- **Vercel project:** `anushree-portfolio` — GitHub-connected, **auto-deploys on push to `main`**.
  - Project id: `prj_bpCPODte364li8wiKX79dRVx6spE`, team `team_QRcVUwDImyeCCJNBAoGGgKol`.
  - Vercel CLI logged in as `abhayypandeyy25-2469`.
- **Domain:** `anushreechandra.info` (registrar: **GoDaddy**).
  - DNS: apex `@` → A `76.76.21.21`; `www` → CNAME `cname.vercel-dns.com`.
  - **Canonical = `https://anushreechandra.info`**; `www` → apex via Vercel **domain-level 308 redirect**.

### Contact details (from resume)
- Email: `anushree.chandra98@gmail.com`
- Phone: `+91-9699880496`
- LinkedIn: `https://www.linkedin.com/in/anushree-chandra/`  ⚠️ *verify this is hers*

### How to deploy
- `git push origin main` → Vercel auto-builds + deploys. Confirm with `curl -I https://anushreechandra.info`.
- No tests / no build. Just static files.

### Gotchas learned
- **Browser caches `js/main.js`** — when testing locally, hard-refresh (Cmd+Shift+R) or restart the browse daemon (`browse restart`), else you run stale JS.
- **Local DNS cache** can serve the old GoDaddy parked IP for a while after DNS changes — public resolvers (8.8.8.8 / 1.1.1.1) are the source of truth.
- **Vercel per-IP bot challenge** (`x-vercel-mitigated: challenge`, HTTP 403) triggers after many rapid curl requests from one IP; it's not site-wide, clears on its own.

### Recurring design decision
- The site is intentionally **not** React/shadcn/Tailwind/TS. When given a shadcn `.tsx` component to integrate, we **port it natively** (vanilla HTML/CSS/JS) rather than converting the whole site. Done so far for: theme toggle (pill), radial orbital timeline (later reverted).

### Section structure (index.html)
Hero (with photo) → Stats → `#work` (4 tower cards + Partners) → `#about` → `#experience` → `#contact` → footer.

---

## 2026-06-08

- **Tower cards modern redesign.** Reverted the radial orbital timeline back to cards (orbital felt like it buried content + heavy motion), then made the cards modern: gradient icon chips, large serif index watermark (01–04), cursor-following spotlight glow (`--mx/--my` set on mousemove via `initCardSpotlight()`), gradient sheen border + lift + icon tilt on hover. Theme-adaptive. `.tcard*` classes; spotlight in `js/main.js`.
- **Radial orbital timeline (added then reverted).** Native port of the shadcn `radial-orbital-timeline` for the 4 towers — glowing hub, auto-rotating nodes, click to expand a detail panel with story/metric/role/connected-towers. Theme-adaptive, responsive radius, reduced-motion aware. Reverted same day per request.

## 2026-06-07

- **Theme toggle restyled** as a sliding pill switch (native port of a shadcn ThemeToggle): 64×32 pill, 24px knob, Moon/Sun, 300ms, zinc palette. Wired to existing `data-theme` + localStorage.
- **Custom domain connected.** Added `anushreechandra.info` + `www` to Vercel; set GoDaddy DNS (A + CNAME); removed GoDaddy parked/forwarding records; set **www→apex 308 redirect** at the Vercel domain level (via API) so the root redirects reliably (a `vercel.json` host rule had missed the cached root).

## 2026-06-06

- **Built the site** from Abhay's portfolio template, restructured for a strategist/consultant; populated from Anushree's resume.
- **Created her own repo + Vercel project** (the folder was a copy of Abhay's and pointed at his repo/Vercel — unlinked and re-created so Abhay's site stayed untouched).
- **Hero photo** added (`assets/images/anushree.png`); enlarged later to balance the headline.
- **Dark/light theme** (toggle + no-flash head script + prefers-color-scheme).
- **Four towers → impact stories** with role + metric, pulled from resume.
- **Editorial-minimal redesign** (Fraunces headline, big whitespace) replacing the first denser version.
- Fixed HCLTech title to **Deputy Manager**; LinkedIn set to exact URL.

---

## Open / to verify
- Confirm the **LinkedIn URL** resolves to Anushree.
- Optional: compress `assets/images/anushree.png` (~650 KB) to WebP for faster load.
