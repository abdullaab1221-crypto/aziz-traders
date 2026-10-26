# AZIZ TRADERS

Premium navy-and-gold e-commerce storefront. Pre-launch build — functional storefront prototype with demo catalog, cart, checkout flow and dashboard foundations.

## Overview

- **Brand:** AZIZ TRADERS (original logo used from `public/branding/aziz-traders-logo.jpg`)
- **Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4
- **Design:** Midnight navy `#071426`, metallic gold `#C6A15B`, marble white `#FAF9F6`; serif display (Cormorant Garamond) + sans interface (Inter)

## Requirements

- Node.js 20+ (built with v24.19.0)
- npm 11+

## Installation

```powershell
cd D:\AZIZ-TRADERS
npm install
```

## Development Server

```powershell
npm run dev
```

Local preview: **http://localhost:3000**

## Production Preview (recommended for review)

```powershell
npm run build
npm run start
```

Serves the production build at **http://localhost:3000**.

### Restarting the preview

1. Stop the running server (`Ctrl+C` in its terminal, or end the `node` process started from this folder).
2. Run `npm run build && npm run start` again from `D:\AZIZ-TRADERS`.
3. If port 3000 is occupied, inspect the process first (`netstat -ano | findstr :3000`) — do not kill unrelated processes.

## Other Commands

```powershell
npm run lint        # ESLint (flat config)
npm run typecheck   # tsc --noEmit
npm run build       # production build
```

## Project Structure

```text
D:\AZIZ-TRADERS\
├── public\
│   ├── branding\aziz-traders-logo.jpg   ← original master logo (copied, untouched)
│   ├── images\                          ← real photography (hero/, fashion/, footwear/,
│   │                                      jewellery/, electronics/, accessories/,
│   │                                      beauty/, home-lifestyle/) + legacy SVG placeholders
│   └── products\                        ← aurum-360\ (24 rotation frames)
├── src\
│   ├── app\                             ← routes (App Router)
│   │   ├── page.tsx                     ← editorial homepage (hero, categories,
│   │   │                                  featured tabs, 3 editorial collections,
│   │   │                                  campaign, brand experience, trust)
│   │   ├── shop\                        ← catalog + filters/search
│   │   ├── product\[slug]\              ← detail, photo gallery + 360 viewer
│   │   ├── cart\ checkout\ account\     ← commerce UI (account includes live wishlist)
│   │   ├── affiliate\ reseller\         ← dashboard foundations (no admin panel)
│   │   ├── about\ contact\ legal\       ← company pages
│   │   └── layout.tsx globals.css       ← shell + design tokens
│   ├── components\                      ← Header, Footer, cards, viewer, cart +
│   │                                      wishlist providers, WishlistButton
│   └── lib\                             ← types, demo catalog (photo galleries), categories
├── scripts\generate-assets.cjs          ← regenerates legacy SVG artwork
├── scripts\fetch-photos*.mjs            ← downloads/updates photography (see licenses)
├── reports\PROJECT-STATUS.md            ← implementation status report
├── reports\ASSET-LICENSES.md            ← photo/brand license record
├── eslint.config.mjs next.config.ts tsconfig.json
├── .env.example .gitignore
└── package.json README.md
```

## Assets

| Asset | Location |
|---|---|
| Master logo (original, never modified) | `public\branding\aziz-traders-logo.jpg` |
| Photography (28 images) | `public\images\{hero,fashion,footwear,jewellery,electronics,accessories,beauty,home-lifestyle}\*.jpg` |
| 360° frames (24) | `public\products\aurum-360\frame-01..24.svg` |

Licenses (Unsplash / Pexels / client-owned logo): **`reports\ASSET-LICENSES.md`**.
Regenerate legacy SVG artwork: `node scripts/generate-assets.cjs`. Update photos: `node scripts\fetch-photos.mjs` (plus `-2`/`-3` replacement passes).

## Environment Configuration

Copy `.env.example` to `.env.local`. All keys are optional in the current phase — payment gateway credentials must never be committed.

## Features Implemented (v2)

- Real product photography (28 licensed images) across products, categories and editorial slots
- Editorial homepage: two-column photo hero, 11 category tiles, featured tabbed grid, three collection editorials (Timecraft / Wardrobe / Sound-Vision-Home), photo campaign banner, brand experience, trust row
- Catalog: filters by category, search, view modes (`new`, `best`, `trending`, `collections`)
- Product detail: photo gallery (`images[]` per product), variants, stock states, related products, **functional 360° drag/swipe viewer** (24-frame image sequence, keyboard accessible)
- **Wishlist** (localStorage-persisted): heart toggle on every product card + product page, count badge in header, live wishlist tab on `/account` (`?tab=wishlist`)
- Cart: localStorage persistence, quantity/stock limits, free shipping ≥ PKR 5,000
- Checkout: 3-step flow (delivery → payment → review), COD supported, online payments **explicitly blocked until gateway approval**
- Account, affiliate, reseller interfaces (UI foundations, marked PLANNED where data-backed)
- Active nav states, legal pages, contact form, 404, full responsive header/footer with original logo
- `prefers-reduced-motion` respected; no fabricated ratings/reviews

## Known Limitations

- Catalog, stock and orders are **demo data** — no database yet; product photography is representative stock imagery (see `reports\ASSET-LICENSES.md`), not photos of AZIZ TRADERS inventory
- Wishlist/cart live in localStorage only — not the source of truth for payments/inventory (server phase)
- Accounts/registration are UI-only (no auth backend)
- JazzCash/Easypaisa/card gateways not connected (merchant approval required)
- Affiliate/reseller panels are layout foundations without CRUD; admin panel intentionally removed this phase
- Server log shows a harmless `@next/swc-win32` binary warning on this machine; build, typecheck, lint and page serving are unaffected
