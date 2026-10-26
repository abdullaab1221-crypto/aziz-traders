// Downloads product/hero/category photography from Unsplash (Unsplash License).
// Usage: node scripts/fetch-photos.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "public", "images");

/** @type {{ dest: string; candidates: string[]; label: string }[]} */
const SLOTS = [
  // ---- hero / editorial ----
  { label: "hero-main", dest: "hero/hero-main.jpg", candidates: [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  ]},
  { label: "hero-secondary", dest: "hero/hero-editorial.jpg", candidates: [
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",
  ]},
  { label: "campaign-store", dest: "hero/campaign-store.jpg", candidates: [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1600&q=80",
  ]},
  { label: "brand-experience", dest: "hero/brand-experience.jpg", candidates: [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=80",
  ]},

  // ---- fashion ----
  { label: "cat-mens", dest: "fashion/cat-mens.jpg", candidates: [
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "cat-womens", dest: "fashion/cat-womens.jpg", candidates: [
    "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-blazer", dest: "fashion/crest-navy-blazer.jpg", candidates: [
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-scarf", dest: "fashion/midnight-silk-scarf.jpg", candidates: [
    "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "fashion-editorial", dest: "fashion/editorial-rack.jpg", candidates: [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=80",
  ]},

  // ---- footwear ----
  { label: "cat-shoes", dest: "footwear/cat-shoes.jpg", candidates: [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-sneakers", dest: "footwear/atlas-running-sneakers.jpg", candidates: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-oxford", dest: "footwear/regal-oxford-shoes.jpg", candidates: [
    "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&fit=crop&w=1000&q=80",
  ]},

  // ---- jewellery ----
  { label: "cat-watches", dest: "jewellery/cat-watches.jpg", candidates: [
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-watch", dest: "jewellery/aurum-chrono-watch.jpg", candidates: [
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-necklace", dest: "jewellery/sovereign-gold-necklace.jpg", candidates: [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-earrings", dest: "jewellery/lumen-stud-earrings.jpg", candidates: [
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
  ]},

  // ---- electronics ----
  { label: "cat-electronics", dest: "electronics/cat-electronics.jpg", candidates: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-headphones", dest: "electronics/aria-wireless-headphones.jpg", candidates: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "cat-mobiles", dest: "electronics/cat-mobiles.jpg", candidates: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-phone", dest: "electronics/zenith-smartphone-x1.jpg", candidates: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=80",
  ]},

  // ---- accessories ----
  { label: "cat-bags", dest: "accessories/cat-bags.jpg", candidates: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-bag", dest: "accessories/noir-leather-weekender.jpg", candidates: [
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "cat-covers", dest: "accessories/cat-mobile-covers.jpg", candidates: [
    "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1541877944-ac82a091518a?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80",
  ]},

  // ---- beauty ----
  { label: "cat-beauty", dest: "beauty/cat-beauty.jpg", candidates: [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-serum", dest: "beauty/velvet-rose-serum.jpg", candidates: [
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
  ]},

  // ---- home ----
  { label: "cat-home", dest: "home-lifestyle/cat-home.jpg", candidates: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-vase", dest: "home-lifestyle/marble-ceramic-vase.jpg", candidates: [
    "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1000&q=80",
  ]},

  // ---- sports ----
  { label: "cat-sports", dest: "home-lifestyle/cat-sports.jpg", candidates: [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80",
  ]},
];

async function tryFetch(url, destAbs) {
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "aziz-traders-asset-fetch/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const type = res.headers.get("content-type") || "";
  if (!type.startsWith("image/")) throw new Error(`not image: ${type}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 15000) throw new Error(`too small: ${buf.length}B`);
  fs.writeFileSync(destAbs, buf);
  return buf.length;
}

const results = [];
for (const slot of SLOTS) {
  const destAbs = path.join(ROOT, slot.dest);
  let ok = false;
  for (const url of slot.candidates) {
    if (fs.existsSync(destAbs) && fs.statSync(destAbs).size > 15000) {
      results.push([slot.label, "exists", fs.statSync(destAbs).size, "-"]);
      ok = true;
      break;
    }
    try {
      const size = await tryFetch(url, destAbs);
      results.push([slot.label, "OK", size, url.split("?")[0].slice(-40)]);
      ok = true;
      break;
    } catch (e) {
      results.push([slot.label, `fail: ${e.message}`, 0, url.slice(-40)]);
    }
  }
  if (!ok) results.push([slot.label, "ALL FAILED", 0, ""]);
}

for (const r of results) console.log(r[1].padEnd(16), String(r[2]).padStart(9), r[0], r[3]);
