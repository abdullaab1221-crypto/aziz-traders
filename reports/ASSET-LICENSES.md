# Asset Licenses — AZIZ TRADERS

Record of third-party assets used in this storefront prototype.

## Brand

| Asset | Path | License |
| --- | --- | --- |
| AZIZ TRADERS logo | `public/branding/aziz-traders-logo.jpg` | Client-owned master artwork (source: `aziz traders.jpg`). Do not modify. |
| Brand board (reference only) | external file, not shipped | Reference for palette/typography. Never used as background or product imagery. |

## Photography

All product, category, hero and editorial photography was downloaded via the
`scripts/fetch-photos*.mjs` scripts from **Unsplash** and **Pexels** under their
standard free licenses:

- Unsplash License — https://unsplash.com/license (free commercial use, no attribution required)
- Pexels License — https://pexels.com/license (free commercial use, no attribution required)

Images depict **representative stock photography** for the demo catalog. Products
are demonstration listings; photos are not photographs of AZIZ TRADERS' own
inventory. No competitor logos are used as product imagery.

| Local path | Source |
| --- | --- |
| `images/hero/hero-main.jpg` | Unsplash photo-1490481651871-ab68de25d43d |
| `images/hero/hero-editorial.jpg` | Unsplash photo-1445205170230-053b83016050 |
| `images/hero/campaign-store.jpg` | Unsplash photo-1441986300917-64674bd600d8 |
| `images/hero/brand-experience.jpg` | Unsplash photo-1483985988355-763728e1935b |
| `images/fashion/cat-mens.jpg` | Unsplash photo-1507679799987-c73779587ccf |
| `images/fashion/cat-womens.jpg` | Unsplash photo-1496747611176-843222e1e57c |
| `images/fashion/crest-navy-blazer.jpg` | Unsplash photo-1594938298603-c8148c4dae35 |
| `images/fashion/midnight-silk-scarf.jpg` | Unsplash photo-1520903920243-00d872a2d1c9 |
| `images/fashion/editorial-rack.jpg` | Unsplash photo-1483985988355-763728e1935b |
| `images/footwear/cat-shoes.jpg` | Unsplash photo-1491553895911-0055eca6402d |
| `images/footwear/atlas-running-sneakers.jpg` | Unsplash photo-1560769629-975ec94e6a86 |
| `images/footwear/regal-oxford-shoes.jpg` | Pexels photo 267320 |
| `images/jewellery/cat-watches.jpg` | Unsplash photo-1524592094714-0f0654e20314 |
| `images/jewellery/aurum-chrono-watch.jpg` | Unsplash photo-1524592094714-0f0654e20314 |
| `images/jewellery/sovereign-gold-necklace.jpg` | Unsplash photo-1599643478518-a784e5dc4c8f |
| `images/jewellery/lumen-stud-earrings.jpg` | Unsplash photo-1535632066927-ab7c9ab60908 |
| `images/electronics/cat-electronics.jpg` | Unsplash photo-1498049794561-7780e7231661 |
| `images/electronics/aria-wireless-headphones.jpg` | Unsplash photo-1583394838336-acd977736f90 |
| `images/electronics/cat-mobiles.jpg` | Pexels photo 1092644 |
| `images/electronics/zenith-smartphone-x1.jpg` | Unsplash photo-1592899677977-9c10ca588bbd |
| `images/accessories/cat-bags.jpg` | Unsplash photo-1553062407-98eeb64c6a62 |
| `images/accessories/noir-leather-weekender.jpg` | Pexels photo 1152077 |
| `images/accessories/cat-mobile-covers.jpg` | Unsplash photo-1601593346740-925612772716 |
| `images/beauty/cat-beauty.jpg` | Unsplash photo-1596462502278-27bfdc403348 |
| `images/beauty/velvet-rose-serum.jpg` | Pexels photo 4041392 |
| `images/home-lifestyle/cat-home.jpg` | Unsplash photo-1586023492125-27b2c045efd7 |
| `images/home-lifestyle/marble-ceramic-vase.jpg` | Unsplash photo-1578500494198-246f612d3b3d |
| `images/home-lifestyle/cat-sports.jpg` | Unsplash photo-1517836357463-d25dfeac3438 |

## Generated / original assets

| Asset | Path | Notes |
| --- | --- | --- |
| SVG placeholders (v1) | `public/images/*.svg`, `public/hero.svg`, etc. | Original generated art; superseded by photography, retained for reference. |
| 360° frames | `public/products/aurum-360/frame-01..24.svg` | Original generated 24-frame rotation of the demo watch render (see `scripts/generate-assets.cjs`). |

## QA

- Visual QA: `reports/contact-sheet.png`, `reports/contact-sheet2.png` (reviewed; branded/wrong-subject images replaced across fetch passes 2–3).
- All 53 served image assets verified HTTP 200 on the local preview (2026-10-24).
