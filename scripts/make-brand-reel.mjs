import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";

const W = 1280, H = 560, FPS = 30, DURATION = 6; // 6s rectangle reel
const TOTAL = FPS * DURATION;
const FRAMES_DIR = "scripts/_reel-frames";
const OUT = "public/videos/aziz-traders-brand-reel.mp4";

const SLIDES = [
  {
    image: "public/images/hero/hero-campaign.jpg",
    eyebrow: "PREMIUM COLLECTION",
    title: "Style Meets Quality",
    sub: "Discover the finest products, curated for you.",
  },
  {
    image: "public/images/hero/brand-experience.jpg",
    eyebrow: "NEW SEASON 2026",
    title: "Exceptional Finds. Elevated Living.",
    sub: "Fashion, jewellery, electronics and home — in one place.",
  },
  {
    image: "public/images/hero/campaign-store.jpg",
    eyebrow: "THE PREMIUM EDIT",
    title: "Curated for Everyday Excellence",
    sub: "AZIZ TRADERS — premium products, trusted service.",
  },
];

const perSlide = TOTAL / SLIDES.length; // 60 frames each
const FADE = 9; // crossfade frames

const escapeXml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function overlaySvg(eyebrow, title, sub, opacity) {
  return Buffer.from(`
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#071426" stop-opacity="0.88"/>
      <stop offset="0.55" stop-color="#071426" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#071426" stop-opacity="0.2"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c6a15b"/>
      <stop offset="0.5" stop-color="#f5e5b8"/>
      <stop offset="1" stop-color="#c6a15b"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#shade)"/>
  <rect x="0" y="${H - 120}" width="${W}" height="120" fill="#071426" opacity="0.55"/>
  <g opacity="${opacity}">
    <text x="70" y="${H - 168}" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="7" fill="#e7cf96">${escapeXml(eyebrow)}</text>
    <text x="70" y="${H - 114}" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" fill="url(#gold)">${escapeXml(title)}</text>
    <text x="70" y="${H - 74}" font-family="Arial, Helvetica, sans-serif" font-size="21" fill="#faf9f6" opacity="0.85">${escapeXml(sub)}</text>
    <text x="${W - 70}" y="${H - 74}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="4" fill="#faf9f6">AZIZ TRADERS</text>
  </g>
</svg>`);
}

async function slideBase(slide) {
  // large cover canvas so Ken Burns can pan/zoom without running out of pixels
  const zoomedW = Math.round(W * 1.22), zoomedH = Math.round(H * 1.22);
  return sharp(slide.image)
    .resize(zoomedW, zoomedH, { fit: "cover", position: "attention" })
    .png()
    .toBuffer();
}

async function main() {
  await mkdir(FRAMES_DIR, { recursive: true });
  await mkdir("public/videos", { recursive: true });

  const bases = await Promise.all(SLIDES.map(slideBase));
  const overlays = await Promise.all(
    SLIDES.map((s) => overlaySvg(s.eyebrow, s.title, s.sub, 1))
  );

  const zw = Math.round(W * 1.22), zh = Math.round(H * 1.22);

  for (let f = 0; f < TOTAL; f++) {
    const slideIdx = Math.min(SLIDES.length - 1, Math.floor(f / perSlide));
    const localT = (f - slideIdx * perSlide) / perSlide; // 0..1 within slide

    // Ken Burns window (slow zoom + drift)
    const zoom = 1.0 + localT * 0.07;
    const winW = Math.round(zw / zoom), winH = Math.round(zh / zoom);
    const maxX = zw - winW, maxY = zh - winH;
    const panX = Math.round(maxX * (slideIdx % 2 === 0 ? localT : 1 - localT));
    const panY = Math.round(maxY * 0.5);

    const base = await sharp(bases[slideIdx])
      .extract({ left: panX, top: panY, width: winW, height: winH })
      .resize(W, H, { fit: "fill" })
      .png()
      .toBuffer();

    // crossfade into next slide near the end of each block
    let frame = base;
    const nextIdx = (slideIdx + 1) % SLIDES.length;
    const untilNext = perSlide * (slideIdx + 1) - f;
    if (untilNext <= FADE) {
      const a = 1 - untilNext / FADE; // 0..1 toward next
      const nz = 1.0 + (localT + 1) * 0.07;
      const nWinW = Math.round(zw / nz), nWinH = Math.round(zh / nz);
      const nMaxX = zw - nWinW, nMaxY = zh - nWinH;
      const nextBase = await sharp(bases[nextIdx])
        .extract({
          left: Math.round(nMaxX * (nextIdx % 2 === 0 ? a : 1 - a)),
          top: Math.round(nMaxY * 0.5),
          width: nWinW,
          height: nWinH,
        })
        .resize(W, H, { fit: "fill" })
        .png()
        .toBuffer();
      frame = await mixOpacity(nextBase, base, a);
    }

    // overlay: shade + copy (fade copy in/out at slide edges)
    const copyOpacity = Math.min(1, Math.min(f - (slideIdx * perSlide - 1), (slideIdx + 1) * perSlide - f) / (FADE * 0.7));
    const svg = await overlaySvg(
      SLIDES[slideIdx].eyebrow,
      SLIDES[slideIdx].title,
      SLIDES[slideIdx].sub,
      Math.max(0, Math.min(1, copyOpacity))
    );
    const out = await sharp(frame)
      .composite([{ input: svg, top: 0, left: 0 }])
      .png()
      .toFile(`${FRAMES_DIR}/frame_${String(f).padStart(3, "0")}.png`);
    void out;
    if (f % 30 === 0) console.log(`frame ${f}/${TOTAL}`);
  }
  console.log("frames done:", (await readdir(FRAMES_DIR)).length);
}

// crossfade two equal-size PNG buffers with per-pixel alpha mix (a = weight of `b`)
async function mixOpacity(aBuf, bBuf, t) {
  const a = await sharp(aBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const b = await sharp(bBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(a.data);
  for (let i = 0; i < out.length; i += 4) {
    out[i] = Math.round(a.data[i] * (1 - t) + b.data[i] * t);
    out[i + 1] = Math.round(a.data[i + 1] * (1 - t) + b.data[i + 1] * t);
    out[i + 2] = Math.round(a.data[i + 2] * (1 - t) + b.data[i + 2] * t);
    out[i + 3] = 255;
  }
  return sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
}

await main();
