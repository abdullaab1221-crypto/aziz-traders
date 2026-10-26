import type { Product } from "./types";

/**
 * DEMO CATALOG — demonstration data only.
 * Prices, stock and reviews are placeholders for the storefront prototype.
 * No real inventory, orders or payments are connected yet.
 * Photography: Unsplash / Pexels (free commercial licenses — see reports/ASSET-LICENSES.md).
 */
export const products: Product[] = [
  {
    id: "p-001",
    slug: "aurum-chrono-watch",
    name: "Aurum Chrono Gold Watch",
    category: "watches-jewellery",
    price: 24999,
    originalPrice: 29999,
    discountLabel: "17% OFF",
    image: "/images/jewellery/aurum-chrono-watch.jpg",
    images: [
      "/images/jewellery/aurum-chrono-watch.jpg",
      "/images/jewellery/cat-watches.jpg",
      "/images/hero/hero-editorial.jpg",
    ],
    colors: ["#C6A15B", "#071426"],
    stock: 12,
    badge: "bestseller",
    description:
      "A refined timepiece with a brushed gold-tone case, clean ivory dial and soft leather strap. Designed for everyday elegance.",
    has360: true,
    ratingCount: 0,
  },
  {
    id: "p-002",
    slug: "cognac-leather-satchel",
    name: "Cognac Leather Satchel",
    category: "bags-travel",
    price: 18499,
    image: "/images/accessories/noir-leather-weekender.jpg",
    images: [
      "/images/accessories/noir-leather-weekender.jpg",
      "/images/accessories/cat-bags.jpg",
      "/images/hero/brand-experience.jpg",
    ],
    colors: ["#9C5A2C", "#171B22"],
    stock: 8,
    badge: "new",
    description:
      "Full-grain leather satchel with brass hardware, buckled flap and a detachable shoulder strap for work or weekend carry.",
    ratingCount: 0,
  },
  {
    id: "p-003",
    slug: "regal-suede-loafers",
    name: "Regal Suede Loafers",
    category: "footwear",
    price: 15999,
    originalPrice: 18999,
    discountLabel: "16% OFF",
    image: "/images/footwear/regal-oxford-shoes.jpg",
    images: [
      "/images/footwear/regal-oxford-shoes.jpg",
      "/images/footwear/cat-shoes.jpg",
      "/images/hero/hero-main.jpg",
    ],
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["#102747", "#778397", "#8C2F2F"],
    stock: 21,
    badge: "premium",
    description:
      "Hand-finished suede loafers with metal bit detail, stitched welt and cushioned insole — tailored comfort in three rich tones.",
    ratingCount: 0,
  },
  {
    id: "p-004",
    slug: "heritage-plaid-scarf",
    name: "Heritage Plaid Scarf",
    category: "womens-fashion",
    price: 6499,
    image: "/images/fashion/midnight-silk-scarf.jpg",
    images: [
      "/images/fashion/midnight-silk-scarf.jpg",
      "/images/fashion/cat-womens.jpg",
      "/images/fashion/editorial-rack.jpg",
    ],
    colors: ["#3A2A1E", "#C6A15B", "#7A2E2E"],
    stock: 30,
    badge: "trending",
    description:
      "Brushed wool-blend scarf in a heritage plaid, finished with hand-knotted fringe — warm, soft and endlessly wearable.",
    ratingCount: 0,
  },
  {
    id: "p-005",
    slug: "sovereign-gold-necklace",
    name: "Sovereign Gold-Plated Necklace",
    category: "watches-jewellery",
    price: 9999,
    originalPrice: 12499,
    discountLabel: "20% OFF",
    image: "/images/jewellery/sovereign-gold-necklace.jpg",
    images: [
      "/images/jewellery/sovereign-gold-necklace.jpg",
      "/images/jewellery/cat-watches.jpg",
      "/images/hero/hero-editorial.jpg",
    ],
    stock: 15,
    badge: "premium",
    description:
      "Layered 18k gold-plated pendants on fine cable chains, presented in a velvet-lined gift box.",
    ratingCount: 0,
  },
  {
    id: "p-006",
    slug: "atlas-running-sneakers",
    name: "Atlas Performance Sneakers",
    category: "footwear",
    price: 11999,
    image: "/images/footwear/atlas-running-sneakers.jpg",
    images: [
      "/images/footwear/atlas-running-sneakers.jpg",
      "/images/footwear/cat-shoes.jpg",
      "/images/hero/hero-main.jpg",
    ],
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["#FAF9F6", "#071426"],
    stock: 26,
    description:
      "Lightweight knit-upper trainers with responsive foam midsole and contrast lace detail.",
    ratingCount: 0,
  },
  {
    id: "p-007",
    slug: "zenith-smartphone-x1",
    name: "Zenith Smartphone X1",
    category: "mobiles",
    price: 89999,
    originalPrice: 96999,
    discountLabel: "7% OFF",
    image: "/images/electronics/zenith-smartphone-x1.jpg",
    images: [
      "/images/electronics/zenith-smartphone-x1.jpg",
      "/images/electronics/cat-mobiles.jpg",
      "/images/electronics/cat-electronics.jpg",
    ],
    colors: ["#071426", "#778397"],
    stock: 6,
    badge: "new",
    description:
      "6.7\" AMOLED display, triple camera system, 5G connectivity and all-day battery.",
    has3D: false,
    ratingCount: 0,
  },
  {
    id: "p-008",
    slug: "crest-navy-blazer",
    name: "Crest Tailored Navy Blazer",
    category: "mens-fashion",
    price: 21999,
    image: "/images/fashion/crest-navy-blazer.jpg",
    images: [
      "/images/fashion/crest-navy-blazer.jpg",
      "/images/fashion/cat-mens.jpg",
      "/images/fashion/editorial-rack.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#102747"],
    stock: 14,
    badge: "premium",
    description:
      "Structured two-button blazer in premium wool blend with satin lining and gold-tone buttons.",
    ratingCount: 0,
  },
  {
    id: "p-009",
    slug: "aria-wireless-headphones",
    name: "Aria Wireless Headphones",
    category: "electronics",
    price: 16999,
    originalPrice: 19999,
    discountLabel: "15% OFF",
    image: "/images/electronics/aria-wireless-headphones.jpg",
    images: [
      "/images/electronics/aria-wireless-headphones.jpg",
      "/images/electronics/cat-electronics.jpg",
      "/images/hero/hero-main.jpg",
    ],
    colors: ["#171B22", "#FAF9F6"],
    stock: 18,
    badge: "bestseller",
    description:
      "Over-ear ANC headphones with 40-hour battery, multipoint pairing and studio-tuned drivers.",
    ratingCount: 0,
  },
  {
    id: "p-010",
    slug: "lumen-stud-earrings",
    name: "Lumen Stud Earrings",
    category: "watches-jewellery",
    price: 4999,
    image: "/images/jewellery/lumen-stud-earrings.jpg",
    images: [
      "/images/jewellery/lumen-stud-earrings.jpg",
      "/images/jewellery/cat-watches.jpg",
      "/images/hero/hero-editorial.jpg",
    ],
    stock: 40,
    description:
      "Crystal-set stud earrings with secure butterfly backs, nickel-free for sensitive ears.",
    ratingCount: 0,
  },
  {
    id: "p-011",
    slug: "velvet-rose-serum",
    name: "Velvet Rose Face Serum",
    category: "beauty",
    price: 5499,
    image: "/images/beauty/velvet-rose-serum.jpg",
    images: [
      "/images/beauty/velvet-rose-serum.jpg",
      "/images/beauty/cat-beauty.jpg",
      "/images/home-lifestyle/marble-ceramic-vase.jpg",
    ],
    stock: 24,
    badge: "trending",
    description:
      "Hydrating serum with rose extract and hyaluronic acid in an amber glass dropper bottle.",
    ratingCount: 0,
  },
  {
    id: "p-012",
    slug: "marble-ceramic-vase",
    name: "Marble Ceramic Vase",
    category: "home-living",
    price: 7999,
    originalPrice: 8999,
    discountLabel: "11% OFF",
    image: "/images/home-lifestyle/marble-ceramic-vase.jpg",
    images: [
      "/images/home-lifestyle/marble-ceramic-vase.jpg",
      "/images/home-lifestyle/cat-home.jpg",
      "/images/hero/hero-main.jpg",
    ],
    colors: ["#FAF9F6", "#C6A15B"],
    stock: 11,
    description:
      "Hand-glazed ceramic vase with soft marble veining — a quiet centrepiece for any room.",
    ratingCount: 0,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function byBadge(badge: Product["badge"]): Product[] {
  return products.filter((p) => p.badge === badge);
}

export function byCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function formatPrice(n: number): string {
  return `PKR ${n.toLocaleString("en-PK")}`;
}
