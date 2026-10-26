import sharp from "sharp";

const input = "public/branding/aziz-traders-logo-header.jpg";
const output = "public/branding/aziz-traders-logo-header.png";

const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// binary mask of logo pixels (dark navy letters + saturated gold letters), ignore faint paper lines
const mask = new Uint8Array(width * height);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const maxc = Math.max(r, g, b), minc = Math.min(r, g, b);
    const sat = maxc - minc;
    if (lum < 110 || (lum < 190 && sat > 45)) mask[y * width + x] = 1;
  }
}

// connected components (4-neighbour) — keep blob-like letter shapes, drop thin decorative lines
const labels = new Int32Array(width * height).fill(-1);
const comps = [];
for (let s = 0; s < width * height; s++) {
  if (!mask[s] || labels[s] !== -1) continue;
  let area = 0, minX = width, minY = height, maxX = 0, maxY = 0;
  const stack = [s];
  labels[s] = comps.length;
  while (stack.length) {
    const p = stack.pop();
    const px = p % width, py = (p / width) | 0;
    area++;
    if (px < minX) minX = px;
    if (px > maxX) maxX = px;
    if (py < minY) minY = py;
    if (py > maxY) maxY = py;
    if (px > 0 && mask[p - 1] && labels[p - 1] === -1) { labels[p - 1] = comps.length; stack.push(p - 1); }
    if (px < width - 1 && mask[p + 1] && labels[p + 1] === -1) { labels[p + 1] = comps.length; stack.push(p + 1); }
    if (py > 0 && mask[p - width] && labels[p - width] === -1) { labels[p - width] = comps.length; stack.push(p - width); }
    if (py < height - 1 && mask[p + width] && labels[p + width] === -1) { labels[p + width] = comps.length; stack.push(p + width); }
  }
  const bw = maxX - minX + 1, bh = maxY - minY + 1;
  comps.push({ area, minX, minY, maxX, maxY, fill: area / (bw * bh) });
}

// letters are solid blobs (high fill ratio); thin diagonal/horizontal lines have tiny fill ratio
const big = comps.filter((c) => c.area > 600 && c.fill > 0.28 && c.maxX - c.minX < 700 && c.maxY - c.minY < 500);
let minX = width, minY = height, maxX = 0, maxY = 0;
for (const c of big) {
  if (c.minX < minX) minX = c.minX;
  if (c.minY < minY) minY = c.minY;
  if (c.maxX > maxX) maxX = c.maxX;
  if (c.maxY > maxY) maxY = c.maxY;
}
const pad = 18;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);
const cw = maxX - minX + 1, ch = maxY - minY + 1;
console.log(`components kept: ${big.length}/${comps.length}, crop: x=${minX} y=${minY} w=${cw} h=${ch}`);
for (const c of big) console.log(`  comp area=${c.area} fill=${c.fill.toFixed(2)} bbox=${c.minX},${c.minY}-${c.maxX},${c.maxY}`);

// crop, then make paper background transparent — logo letters stay fully opaque & sharp (no blur)
const croppedRes = await sharp(input).extract({ left: minX, top: minY, width: cw, height: ch }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const cd = Buffer.from(croppedRes.data);
const cc = croppedRes.info.channels;

// binary core mask: colored (navy/gold) OR dark bluish letter shading — grey paper & grey drop-shadows excluded
const core = new Uint8Array(cw * ch);
for (let y = 0; y < ch; y++) {
  for (let x = 0; x < cw; x++) {
    const i = (y * cw + x) * cc;
    const r = cd[i], g = cd[i + 1], b = cd[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    const bluish = b > r + 8;
    if (sat > 35 || lum < 100 || (lum < 175 && bluish)) core[y * cw + x] = 1;
  }
}

// morphology helpers (disc radius)
const dilate = (m, R) => {
  const out = new Uint8Array(cw * ch);
  const R2 = R * R;
  const offs = [];
  for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) if (dx * dx + dy * dy <= R2) offs.push([dx, dy]);
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      if (!m[y * cw + x]) continue;
      for (const [dx, dy] of offs) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < cw && ny < ch) out[ny * cw + nx] = 1;
      }
    }
  }
  return out;
};
const erode = (m, R) => {
  const out = new Uint8Array(cw * ch);
  const R2 = R * R;
  const offs = [];
  for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) if (dx * dx + dy * dy <= R2) offs.push([dx, dy]);
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      if (!m[y * cw + x]) continue;
      let keep = 1;
      for (const [dx, dy] of offs) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= cw || ny >= ch || !m[ny * cw + nx]) { keep = 0; break; }
      }
      out[y * cw + x] = keep;
    }
  }
  return out;
};

// closing (dilate then erode) fills missing bites on letter edges, shape/size preserved — middle untouched
const closed = erode(dilate(core, 5), 5);
// +1px to restore anti-aliased outline, but never pull paper texture back in
const final = dilate(closed, 1);
for (let i = 0; i < cw * ch; i++) {
  const p = i * cc;
  const r = cd[p], g = cd[p + 1], b = cd[p + 2];
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  if (final[i] && !closed[i] && sat <= 30 && lum > 225) final[i] = 0;
}

// drop stray specks: keep only components >= 400px (all real letters are far bigger)
{
  const lab = new Int32Array(cw * ch).fill(-1);
  const keep = new Uint8Array(cw * ch);
  for (let s = 0; s < cw * ch; s++) {
    if (!final[s] || lab[s] !== -1) continue;
    const stack = [s];
    lab[s] = 1;
    let area = 0;
    const comp = [];
    while (stack.length) {
      const p = stack.pop();
      area++;
      comp.push(p);
      const px = p % cw, py = (p / cw) | 0;
      if (px > 0 && final[p - 1] && lab[p - 1] === -1) { lab[p - 1] = 1; stack.push(p - 1); }
      if (px < cw - 1 && final[p + 1] && lab[p + 1] === -1) { lab[p + 1] = 1; stack.push(p + 1); }
      if (py > 0 && final[p - cw] && lab[p - cw] === -1) { lab[p - cw] = 1; stack.push(p - cw); }
      if (py < ch - 1 && final[p + cw] && lab[p + cw] === -1) { lab[p + cw] = 1; stack.push(p + cw); }
    }
    if (area >= 400) for (const p of comp) keep[p] = 1;
  }
  for (let i = 0; i < cw * ch; i++) final[i] = keep[i];
}

for (let i = 0; i < cw * ch; i++) cd[i * cc + 3] = final[i] ? 255 : 0;

await sharp(cd, { raw: { width: cw, height: ch, channels: cc } })
  .png({ compressionLevel: 9 })
  .toFile(output);
console.log(`saved ${output} ${cw}x${ch}`);
