// Replacement fetch pass — see fetch-photos.mjs for license notes.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "public", "images");

const SLOTS = [
  { label: "hero-editorial", dest: "hero/hero-editorial.jpg", candidates: [
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=80",
  ]},
  { label: "prod-weekender", dest: "accessories/noir-leather-weekender.jpg", candidates: [
    "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-sneakers", dest: "footwear/atlas-running-sneakers.jpg", candidates: [
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
    "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ]},
  { label: "prod-oxford", dest: "footwear/regal-oxford-shoes.jpg", candidates: [
    "https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "cat-shoes", dest: "footwear/cat-shoes.jpg", candidates: [
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80",
    "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
  ]},
  { label: "prod-scarf", dest: "fashion/midnight-silk-scarf.jpg", candidates: [
    "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=1000&q=80",
    "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/767964/pexels-photo-767964.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ]},
  { label: "cat-womens", dest: "fashion/cat-womens.jpg", candidates: [
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-phone", dest: "electronics/zenith-smartphone-x1.jpg", candidates: [
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=1000&q=80",
    "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ]},
  { label: "cat-mobiles", dest: "electronics/cat-mobiles.jpg", candidates: [
    "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80",
    "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ]},
  { label: "prod-headphones", dest: "electronics/aria-wireless-headphones.jpg", candidates: [
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "cat-electronics", dest: "electronics/cat-electronics.jpg", candidates: [
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "cat-covers", dest: "accessories/cat-mobile-covers.jpg", candidates: [
    "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1000&q=80",
    "https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ]},
  { label: "prod-serum", dest: "beauty/velvet-rose-serum.jpg", candidates: [
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80",
    "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=80",
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

for (const slot of SLOTS) {
  const destAbs = path.join(ROOT, slot.dest);
  let done = false;
  for (const url of slot.candidates) {
    try {
      const size = await tryFetch(url, destAbs);
      console.log("OK".padEnd(16), String(size).padStart(9), slot.label, url.split("?")[0].slice(-46));
      done = true;
      break;
    } catch (e) {
      console.log(`fail: ${e.message}`.padEnd(16), "0".padStart(9), slot.label, url.split("?")[0].slice(-46));
    }
  }
  if (!done) console.log("ALL FAILED".padEnd(16), "0".padStart(9), slot.label);
}
