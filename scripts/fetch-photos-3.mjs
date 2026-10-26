import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "public", "images");

const SLOTS = [
  { label: "prod-serum", dest: "beauty/velvet-rose-serum.jpg", candidates: [
    "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=80",
    "https://images.pexels.com/photos/3762880/pexels-photo-3762880.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80",
  ]},
  { label: "prod-scarf", dest: "fashion/midnight-silk-scarf.jpg", candidates: [
    "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/767964/pexels-photo-767964.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=1000&q=80",
    "https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
      console.log("OK".padEnd(14), String(size).padStart(9), slot.label, url.split("?")[0].slice(-50));
      done = true;
      break;
    } catch (e) {
      console.log(`fail: ${e.message}`.padEnd(14), "0".padStart(9), slot.label, url.split("?")[0].slice(-50));
    }
  }
  if (!done) console.log("ALL FAILED".padEnd(14), "0".padStart(9), slot.label);
}
