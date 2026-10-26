const fs = require("fs");
const path = require("path");

const ROOT = "D:/AZIZ-TRADERS/public";

const PALETTE = {
  midnight: "#071426",
  royal: "#102747",
  deep: "#17385C",
  gold: "#C6A15B",
  champagne: "#E7CF96",
  warm: "#F5E5B8",
  marble: "#FAF9F6",
  charcoal: "#171B22",
  slate: "#778397",
};

function ensure(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function wrap(inner, w = 800, h = 800, bg1 = PALETTE.marble, bg2 = "#EFECE4") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="${bg1}"/><stop offset="100%" stop-color="${bg2}"/>
</linearGradient>
<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="${PALETTE.gold}"/><stop offset="50%" stop-color="${PALETTE.warm}"/><stop offset="100%" stop-color="${PALETTE.gold}"/>
</linearGradient>
<radialGradient id="shade" cx="0.5" cy="0.35" r="0.75">
<stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect width="${w}" height="${h}" fill="url(#shade)"/>
<ellipse cx="400" cy="660" rx="240" ry="34" fill="#071426" opacity="0.10"/>
${inner}
</svg>`;
}

const products = {
  "aurum-chrono-watch": `
<g transform="translate(400 400)">
  <circle r="185" fill="${PALETTE.royal}"/>
  <circle r="185" fill="none" stroke="url(#gold)" stroke-width="14"/>
  <circle r="150" fill="${PALETTE.midnight}"/>
  <g stroke="url(#gold)" stroke-width="6" stroke-linecap="round">
    <line x1="0" y1="-138" x2="0" y2="-112"/><line x1="138" y1="0" x2="112" y2="0"/>
    <line x1="0" y1="138" x2="0" y2="112"/><line x1="-138" y1="0" x2="-112" y2="0"/>
  </g>
  <g stroke="${PALETTE.slate}" stroke-width="3" stroke-linecap="round">
    <line x1="69" y1="-119" x2="60" y2="-104"/><line x1="119" y1="-69" x2="104" y2="-60"/>
    <line x1="119" y1="69" x2="104" y2="60"/><line x1="69" y1="119" x2="60" y2="104"/>
    <line x1="-69" y1="119" x2="-60" y2="104"/><line x1="-119" y1="69" x2="-104" y2="60"/>
    <line x1="-119" y1="-69" x2="-104" y2="-60"/><line x1="-69" y1="-119" x2="-60" y2="-104"/>
  </g>
  <circle cx="62" cy="-52" r="34" fill="${PALETTE.deep}" stroke="url(#gold)" stroke-width="3"/>
  <line x1="0" y1="18" x2="0" y2="-108" stroke="url(#gold)" stroke-width="9" stroke-linecap="round"/>
  <line x1="0" y1="18" x2="72" y2="66" stroke="${PALETTE.champagne}" stroke-width="7" stroke-linecap="round"/>
  <line x1="0" y1="18" x2="-58" y2="96" stroke="url(#gold)" stroke-width="5" stroke-linecap="round"/>
  <circle r="12" fill="url(#gold)"/>
  <rect x="-34" y="-238" width="68" height="60" rx="14" fill="url(#gold)"/>
  <rect x="-34" y="178" width="68" height="60" rx="14" fill="url(#gold)"/>
  <rect x="-46" y="-330" width="92" height="104" rx="16" fill="${PALETTE.charcoal}"/>
  <rect x="-46" y="226" width="92" height="104" rx="16" fill="${PALETTE.charcoal}"/>
  <rect x="181" y="-24" width="34" height="48" rx="8" fill="url(#gold)"/>
</g>`,

  "noir-leather-weekender": `
<g transform="translate(400 420)">
  <rect x="-250" y="-120" width="500" height="270" rx="34" fill="${PALETTE.charcoal}"/>
  <rect x="-250" y="-120" width="500" height="270" rx="34" fill="none" stroke="url(#gold)" stroke-width="5"/>
  <path d="M-140 -120 Q-140 -240 0 -240 Q140 -240 140 -120" fill="none" stroke="url(#gold)" stroke-width="16" stroke-linecap="round"/>
  <rect x="-250" y="-40" width="500" height="16" fill="${PALETTE.gold}" opacity="0.35"/>
  <rect x="-40" y="-30" width="80" height="56" rx="8" fill="none" stroke="url(#gold)" stroke-width="5"/>
  <circle cx="0" cy="-4" r="9" fill="url(#gold)"/>
  <rect x="-206" y="66" width="60" height="44" rx="6" fill="none" stroke="${PALETTE.slate}" stroke-width="3"/>
  <rect x="146" y="66" width="60" height="44" rx="6" fill="none" stroke="${PALETTE.slate}" stroke-width="3"/>
</g>`,

  "regal-oxford-shoes": `
<g transform="translate(400 430)">
  <path d="M-260 60 Q-260 -30 -170 -60 L-40 -110 Q30 -130 70 -90 L130 -30 Q210 10 250 60 Q260 110 200 120 L-200 120 Q-260 120 -260 60 Z" fill="${PALETTE.midnight}"/>
  <path d="M-260 60 Q-260 -30 -170 -60 L-40 -110 Q30 -130 70 -90 L130 -30 Q210 10 250 60" fill="none" stroke="url(#gold)" stroke-width="6"/>
  <path d="M-250 96 L246 96" stroke="url(#gold)" stroke-width="5" stroke-linecap="round"/>
  <g stroke="${PALETTE.champagne}" stroke-width="4" stroke-linecap="round">
    <line x1="-90" y1="-58" x2="-40" y2="-40"/><line x1="-80" y1="-34" x2="-30" y2="-16"/>
    <line x1="-70" y1="-10" x2="-20" y2="8"/>
  </g>
  <path d="M-150 -62 Q-90 -96 -40 -108" fill="none" stroke="${PALETTE.slate}" stroke-width="3"/>
</g>`,

  "midnight-silk-scarf": `
<g transform="translate(400 400)">
  <path d="M-210 -180 Q-60 -240 90 -170 Q230 -100 200 60 Q170 210 0 230 Q-180 250 -220 90 Q-250 -60 -210 -180 Z" fill="${PALETTE.royal}"/>
  <path d="M-210 -180 Q-60 -240 90 -170 Q230 -100 200 60" fill="none" stroke="url(#gold)" stroke-width="7"/>
  <path d="M-160 -60 Q-40 -120 80 -60 Q160 -20 140 80" fill="none" stroke="${PALETTE.champagne}" stroke-width="4" opacity="0.7"/>
  <path d="M-130 40 Q-30 -10 70 50" fill="none" stroke="url(#gold)" stroke-width="3" opacity="0.6"/>
  <g fill="url(#gold)">
    <circle cx="-60" cy="-30" r="7"/><circle cx="20" cy="10" r="7"/><circle cx="90" cy="60" r="7"/>
  </g>
</g>`,

  "sovereign-gold-necklace": `
<g transform="translate(400 400)">
  <path d="M-190 -210 Q0 -60 190 -210" fill="none" stroke="url(#gold)" stroke-width="10" stroke-linecap="round"/>
  <path d="M-190 -210 Q0 -40 190 -210" fill="none" stroke="${PALETTE.champagne}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
  <g transform="translate(0 40)">
    <path d="M0 -70 L62 -6 L0 96 L-62 -6 Z" fill="url(#gold)"/>
    <path d="M0 -70 L62 -6 L0 96 L-62 -6 Z" fill="none" stroke="${PALETTE.royal}" stroke-width="5"/>
    <path d="M0 -34 L30 -6 L0 44 L-30 -6 Z" fill="${PALETTE.royal}"/>
    <circle r="14" fill="${PALETTE.champagne}"/>
  </g>
</g>`,

  "atlas-running-sneakers": `
<g transform="translate(400 430)">
  <path d="M-250 40 Q-240 -60 -150 -80 L-30 -60 Q60 -40 130 0 Q210 44 246 60 Q262 96 214 108 L-196 108 Q-252 106 -250 40 Z" fill="${PALETTE.marble}" stroke="${PALETTE.midnight}" stroke-width="5"/>
  <path d="M-250 70 L250 74" stroke="${PALETTE.gold}" stroke-width="7" stroke-linecap="round"/>
  <path d="M-150 -80 Q-120 -20 -60 0" fill="none" stroke="${PALETTE.royal}" stroke-width="8" stroke-linecap="round"/>
  <path d="M-90 -70 Q-60 -14 0 -4" fill="none" stroke="${PALETTE.gold}" stroke-width="6" stroke-linecap="round"/>
  <g stroke="${PALETTE.slate}" stroke-width="4" stroke-linecap="round">
    <line x1="-40" y1="-46" x2="10" y2="-30"/><line x1="-30" y1="-22" x2="24" y2="-6"/>
  </g>
  <path d="M130 0 Q170 -40 214 -54" fill="none" stroke="${PALETTE.royal}" stroke-width="7" stroke-linecap="round"/>
</g>`,

  "zenith-smartphone-x1": `
<g transform="translate(400 400)">
  <rect x="-140" y="-250" width="280" height="500" rx="42" fill="${PALETTE.charcoal}"/>
  <rect x="-140" y="-250" width="280" height="500" rx="42" fill="none" stroke="url(#gold)" stroke-width="6"/>
  <rect x="-122" y="-232" width="244" height="464" rx="30" fill="${PALETTE.royal}"/>
  <rect x="-122" y="-232" width="244" height="464" rx="30" fill="none" stroke="${PALETTE.deep}" stroke-width="2"/>
  <circle cx="0" cy="-200" r="10" fill="${PALETTE.midnight}" stroke="${PALETTE.gold}" stroke-width="2"/>
  <g transform="translate(-70 90)">
    <circle cx="0" cy="0" r="34" fill="${PALETTE.midnight}" stroke="url(#gold)" stroke-width="4"/>
    <circle cx="0" cy="0" r="16" fill="${PALETTE.deep}"/>
    <circle cx="58" cy="-24" r="24" fill="${PALETTE.midnight}" stroke="url(#gold)" stroke-width="4"/>
    <circle cx="58" cy="-24" r="11" fill="${PALETTE.deep}"/>
    <circle cx="58" cy="34" r="24" fill="${PALETTE.midnight}" stroke="url(#gold)" stroke-width="4"/>
    <circle cx="58" cy="34" r="11" fill="${PALETTE.deep}"/>
  </g>
  <path d="M-90 -150 Q0 -190 90 -150" fill="none" stroke="${PALETTE.champagne}" stroke-width="3" opacity="0.5"/>
</g>`,

  "crest-navy-blazer": `
<g transform="translate(400 410)">
  <path d="M-180 -210 L-60 -250 L0 -160 L60 -250 L180 -210 L230 -60 L170 -30 L150 200 L-150 200 L-170 -30 L-230 -60 Z" fill="${PALETTE.royal}"/>
  <path d="M-180 -210 L-60 -250 L0 -160 L60 -250 L180 -210" fill="none" stroke="url(#gold)" stroke-width="6"/>
  <path d="M0 -160 L-40 60 L0 200 L40 60 Z" fill="${PALETTE.midnight}"/>
  <path d="M-60 -250 L-40 60 M60 -250 L40 60" stroke="url(#gold)" stroke-width="5"/>
  <g fill="url(#gold)">
    <circle cx="0" cy="10" r="9"/><circle cx="0" cy="80" r="9"/>
  </g>
  <path d="M-170 -30 L-110 -20 M170 -30 L110 -20" stroke="${PALETTE.champagne}" stroke-width="4" opacity="0.6"/>
</g>`,

  "aria-wireless-headphones": `
<g transform="translate(400 410)">
  <path d="M-170 40 L-170 -80 Q-170 -230 0 -230 Q170 -230 170 -80 L170 40" fill="none" stroke="${PALETTE.charcoal}" stroke-width="38" stroke-linecap="round"/>
  <path d="M-170 40 L-170 -80 Q-170 -230 0 -230 Q170 -230 170 -80 L170 40" fill="none" stroke="url(#gold)" stroke-width="8" stroke-linecap="round" opacity="0.8"/>
  <rect x="-232" y="20" width="118" height="200" rx="52" fill="${PALETTE.charcoal}" stroke="url(#gold)" stroke-width="6"/>
  <rect x="114" y="20" width="118" height="200" rx="52" fill="${PALETTE.charcoal}" stroke="url(#gold)" stroke-width="6"/>
  <rect x="-208" y="52" width="70" height="136" rx="32" fill="${PALETTE.royal}"/>
  <rect x="138" y="52" width="70" height="136" rx="32" fill="${PALETTE.royal}"/>
  <circle cx="-173" cy="120" r="14" fill="url(#gold)"/>
</g>`,

  "lumen-stud-earrings": `
<g transform="translate(400 400)">
  <g transform="translate(-90 0)">
    <path d="M0 -140 L44 -84 L0 -60 L-44 -84 Z" fill="url(#gold)"/>
    <circle cx="0" cy="20" r="70" fill="none" stroke="url(#gold)" stroke-width="14"/>
    <circle cx="0" cy="20" r="70" fill="none" stroke="${PALETTE.champagne}" stroke-width="4" opacity="0.6"/>
  </g>
  <g transform="translate(90 0)">
    <path d="M0 -140 L44 -84 L0 -60 L-44 -84 Z" fill="url(#gold)"/>
    <circle cx="0" cy="20" r="70" fill="none" stroke="url(#gold)" stroke-width="14"/>
    <circle cx="0" cy="20" r="70" fill="none" stroke="${PALETTE.champagne}" stroke-width="4" opacity="0.6"/>
  </g>
</g>`,

  "velvet-rose-serum": `
<g transform="translate(400 420)">
  <rect x="-90" y="-60" width="180" height="270" rx="30" fill="#6B2E2E"/>
  <rect x="-90" y="-60" width="180" height="270" rx="30" fill="none" stroke="url(#gold)" stroke-width="5"/>
  <rect x="-72" y="-20" width="144" height="190" rx="18" fill="#8C3A3A" opacity="0.7"/>
  <rect x="-30" y="-160" width="60" height="100" rx="12" fill="${PALETTE.charcoal}"/>
  <rect x="-56" y="-260" width="112" height="110" rx="16" fill="${PALETTE.charcoal}" stroke="url(#gold)" stroke-width="4"/>
  <rect x="-14" y="-330" width="28" height="80" rx="10" fill="url(#gold)"/>
  <rect x="-58" y="30" width="116" height="90" rx="10" fill="${PALETTE.marble}"/>
  <text x="0" y="66" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="${PALETTE.royal}">AZIZ</text>
  <text x="0" y="94" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="${PALETTE.gold}">TRADERS</text>
</g>`,

  "marble-ceramic-vase": `
<g transform="translate(400 420)">
  <path d="M-70 -260 Q-30 -240 -40 -190 Q-160 -80 -140 80 Q-120 230 0 240 Q120 230 140 80 Q160 -80 40 -190 Q30 -240 70 -260 Z" fill="${PALETTE.marble}" stroke="${PALETTE.slate}" stroke-width="4"/>
  <path d="M-60 -180 Q0 -140 60 -180" fill="none" stroke="url(#gold)" stroke-width="6"/>
  <path d="M-110 -20 Q-20 40 110 -30" fill="none" stroke="${PALETTE.slate}" stroke-width="3" opacity="0.5"/>
  <path d="M-90 90 Q0 140 90 80" fill="none" stroke="${PALETTE.gold}" stroke-width="3" opacity="0.5"/>
  <path d="M-40 -190 Q0 -210 40 -190" fill="none" stroke="${PALETTE.gold}" stroke-width="4"/>
</g>`,
};

ensure(path.join(ROOT, "products"));
for (const [slug, inner] of Object.entries(products)) {
  fs.writeFileSync(path.join(ROOT, "products", slug + ".svg"), wrap(inner));
}

const catGlyphs = {
  mens: `<g transform="translate(400 420)"><path d="M-150 -170 L-50 -200 L0 -130 L50 -200 L150 -170 L185 -50 L135 -30 L120 160 L-120 160 L-135 -30 L-185 -50 Z" fill="${PALETTE.royal}"/><path d="M0 -130 L-30 40 L0 160 L30 40 Z" fill="${PALETTE.midnight}"/><g fill="url(#gold)"><circle cx="0" cy="-20" r="7"/><circle cx="0" cy="40" r="7"/></g></g>`,
  womens: `<g transform="translate(400 420)"><path d="M-60 -220 Q0 -260 60 -220 L110 -40 Q60 20 70 210 L-70 210 Q-60 20 -110 -40 Z" fill="${PALETTE.royal}"/><path d="M-60 -220 Q0 -180 60 -220" fill="none" stroke="url(#gold)" stroke-width="8"/><path d="M-90 60 L90 60" stroke="url(#gold)" stroke-width="7"/><path d="M-40 -100 Q0 -70 40 -100" fill="none" stroke="${PALETTE.champagne}" stroke-width="4"/></g>`,
  shoes: `<g transform="translate(400 430)"><path d="M-220 40 Q-210 -50 -130 -70 L-20 -50 Q60 -30 120 10 Q190 50 220 60 Q234 96 190 106 L-170 106 Q-222 104 -220 40 Z" fill="${PALETTE.midnight}" stroke="url(#gold)" stroke-width="5"/><path d="M-220 72 L222 76" stroke="url(#gold)" stroke-width="6" stroke-linecap="round"/><path d="M-130 -70 Q-100 -16 -46 -4" fill="none" stroke="${PALETTE.champagne}" stroke-width="6"/></g>`,
  watches: `<g transform="translate(400 400)"><circle r="150" fill="${PALETTE.royal}" stroke="url(#gold)" stroke-width="12"/><circle r="118" fill="${PALETTE.midnight}"/><line x1="0" y1="14" x2="0" y2="-86" stroke="url(#gold)" stroke-width="8" stroke-linecap="round"/><line x1="0" y1="14" x2="58" y2="54" stroke="${PALETTE.champagne}" stroke-width="6" stroke-linecap="round"/><circle r="10" fill="url(#gold)"/><rect x="-28" y="-216" width="56" height="76" rx="12" fill="url(#gold)"/><rect x="-28" y="140" width="56" height="76" rx="12" fill="url(#gold)"/></g>`,
  mobile: `<g transform="translate(400 400)"><rect x="-110" y="-200" width="220" height="400" rx="34" fill="${PALETTE.charcoal}" stroke="url(#gold)" stroke-width="5"/><rect x="-95" y="-185" width="190" height="370" rx="22" fill="${PALETTE.royal}"/><circle cx="0" cy="-160" r="8" fill="${PALETTE.midnight}"/><path d="M-70 -100 Q0 -130 70 -100" fill="none" stroke="url(#gold)" stroke-width="4" opacity="0.7"/></g>`,
  covers: `<g transform="translate(400 400)"><rect x="-120" y="-210" width="240" height="420" rx="42" fill="${PALETTE.royal}" stroke="url(#gold)" stroke-width="6"/><rect x="-96" y="-186" width="192" height="372" rx="28" fill="${PALETTE.marble}" opacity="0.15"/><circle cx="-52" cy="-128" r="34" fill="${PALETTE.midnight}" stroke="url(#gold)" stroke-width="4"/><circle cx="-52" cy="-128" r="15" fill="${PALETTE.deep}"/><path d="M-70 60 Q0 120 70 60" fill="none" stroke="url(#gold)" stroke-width="5"/></g>`,
  electronics: `<g transform="translate(400 410)"><path d="M-150 30 L-150 -60 Q-150 -190 0 -190 Q150 -190 150 -60 L150 30" fill="none" stroke="${PALETTE.charcoal}" stroke-width="30" stroke-linecap="round"/><rect x="-200" y="20" width="100" height="170" rx="44" fill="${PALETTE.charcoal}" stroke="url(#gold)" stroke-width="5"/><rect x="100" y="20" width="100" height="170" rx="44" fill="${PALETTE.charcoal}" stroke="url(#gold)" stroke-width="5"/></g>`,
  beauty: `<g transform="translate(400 420)"><rect x="-80" y="-40" width="160" height="240" rx="26" fill="#6B2E2E" stroke="url(#gold)" stroke-width="5"/><rect x="-26" y="-190" width="52" height="150" rx="14" fill="${PALETTE.charcoal}" stroke="url(#gold)" stroke-width="4"/><rect x="-52" y="10" width="104" height="90" rx="10" fill="${PALETTE.marble}"/><text x="0" y="48" text-anchor="middle" font-family="Georgia, serif" font-size="16" fill="${PALETTE.royal}">LUXE</text><text x="0" y="72" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="${PALETTE.gold}">SERUM</text></g>`,
  home: `<g transform="translate(400 420)"><path d="M-50 -230 Q-20 -210 -28 -170 Q-130 -80 -112 60 Q-96 190 0 200 Q96 190 112 60 Q130 -80 28 -170 Q20 -210 50 -230 Z" fill="${PALETTE.marble}" stroke="${PALETTE.slate}" stroke-width="4"/><path d="M-44 -160 Q0 -130 44 -160" fill="none" stroke="url(#gold)" stroke-width="6"/><path d="M-80 30 Q0 80 80 20" fill="none" stroke="${PALETTE.gold}" stroke-width="3" opacity="0.6"/></g>`,
  bags: `<g transform="translate(400 420)"><rect x="-200" y="-90" width="400" height="230" rx="28" fill="${PALETTE.charcoal}" stroke="url(#gold)" stroke-width="5"/><path d="M-110 -90 Q-110 -200 0 -200 Q110 -200 110 -90" fill="none" stroke="url(#gold)" stroke-width="13"/><rect x="-34" y="-30" width="68" height="52" rx="8" fill="none" stroke="url(#gold)" stroke-width="5"/><circle r="8" fill="url(#gold)" cy="-4"/></g>`,
  sports: `<g transform="translate(400 400)"><circle r="160" fill="${PALETTE.royal}" stroke="url(#gold)" stroke-width="7"/><path d="M0 -160 Q60 -60 0 0 Q-60 -60 0 -160 Z" fill="${PALETTE.marble}"/><path d="M0 160 Q60 60 0 0 Q-60 60 0 160 Z" fill="${PALETTE.marble}"/><path d="M-160 0 Q-60 -60 0 0 Q-60 60 -160 0 Z" fill="${PALETTE.champagne}"/><path d="M160 0 Q60 -60 0 0 Q60 60 160 0 Z" fill="${PALETTE.champagne}"/><circle r="26" fill="url(#gold)"/></g>`,
};

const catMap = {
  "cat-mens": catGlyphs.mens,
  "cat-womens": catGlyphs.womens,
  "cat-shoes": catGlyphs.shoes,
  "cat-watches": catGlyphs.watches,
  "cat-mobile": catGlyphs.mobile,
  "cat-covers": catGlyphs.covers,
  "cat-electronics": catGlyphs.electronics,
  "cat-beauty": catGlyphs.beauty,
  "cat-home": catGlyphs.home,
  "cat-bags": catGlyphs.bags,
  "cat-sports": catGlyphs.sports,
};

ensure(path.join(ROOT, "images"));
for (const [name, inner] of Object.entries(catMap)) {
  fs.writeFileSync(
    path.join(ROOT, "images", name + ".svg"),
    wrap(inner, 800, 800, "#0E1E33", "#071426")
  );
}

const heroInner = `
<g transform="translate(560 430)">
  <circle r="300" fill="${PALETTE.royal}" opacity="0.35"/>
  <circle r="300" fill="none" stroke="url(#gold)" stroke-width="3" opacity="0.7"/>
  <g transform="scale(1.55)">${products["aurum-chrono-watch"]}</g>
</g>
<g opacity="0.5">
  <circle cx="180" cy="180" r="90" fill="none" stroke="url(#gold)" stroke-width="2"/>
  <circle cx="1420" cy="700" r="140" fill="none" stroke="url(#gold)" stroke-width="2"/>
</g>`;
fs.writeFileSync(path.join(ROOT, "images", "hero.svg"), wrap(heroInner, 1600, 900, "#071426", "#102747"));

const storyInner = `
<g transform="translate(800 450)">
  <rect x="-360" y="-250" width="720" height="500" rx="24" fill="${PALETTE.royal}" opacity="0.5"/>
  <rect x="-360" y="-250" width="720" height="500" rx="24" fill="none" stroke="url(#gold)" stroke-width="3"/>
  <text x="0" y="-80" text-anchor="middle" font-family="Georgia, serif" font-size="72" fill="url(#gold)">AT</text>
  <text x="0" y="0" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="${PALETTE.champagne}" letter-spacing="8">AZIZ TRADERS</text>
  <line x1="-140" y1="40" x2="140" y2="40" stroke="url(#gold)" stroke-width="2"/>
  <text x="0" y="100" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="${PALETTE.slate}">Exceptional Finds. Elevated Living.</text>
</g>`;
fs.writeFileSync(path.join(ROOT, "images", "brand-story.svg"), wrap(storyInner, 1600, 900, "#0A1830", "#102747"));

const watchFramesDir = path.join(ROOT, "products", "aurum-360");
ensure(watchFramesDir);
const FRAME_COUNT = 24;
for (let i = 0; i < FRAME_COUNT; i++) {
  const angle = (i / FRAME_COUNT) * 360;
  const rad = (angle * Math.PI) / 180;
  const squash = Math.max(0.18, Math.abs(Math.cos(rad)));
  const frame = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="#FAF9F6"/><stop offset="100%" stop-color="#EFECE4"/>
</linearGradient>
<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="#C6A15B"/><stop offset="50%" stop-color="#F5E5B8"/><stop offset="100%" stop-color="#C6A15B"/>
</linearGradient>
</defs>
<rect width="800" height="800" fill="url(#bg)"/>
<ellipse cx="400" cy="660" rx="230" ry="32" fill="#071426" opacity="0.10"/>
<g transform="translate(400 400)">
  <g transform="scale(${squash.toFixed(3)} 1)">
    <rect x="-52" y="-344" width="104" height="126" rx="18" fill="#171B22"/>
    <rect x="-52" y="218" width="104" height="126" rx="18" fill="#171B22"/>
    <rect x="-40" y="-244" width="80" height="70" rx="16" fill="url(#gold)"/>
    <rect x="-40" y="174" width="80" height="70" rx="16" fill="url(#gold)"/>
    <circle r="186" fill="#102747"/>
    <circle r="186" fill="none" stroke="url(#gold)" stroke-width="15"/>
    <circle r="150" fill="#071426"/>
    <g stroke="url(#gold)" stroke-width="6" stroke-linecap="round">
      <line x1="0" y1="-138" x2="0" y2="-114"/><line x1="138" y1="0" x2="114" y2="0"/>
      <line x1="0" y1="138" x2="0" y2="114"/><line x1="-138" y1="0" x2="-114" y2="0"/>
    </g>
    <line x1="0" y1="16" x2="0" y2="-106" stroke="url(#gold)" stroke-width="9" stroke-linecap="transform"/>
    <line x1="0" y1="16" x2="0" y2="-106" stroke="url(#gold)" stroke-width="9" stroke-linecap="round" transform="rotate(${angle.toFixed(1)})"/>
    <line x1="0" y1="16" x2="64" y2="62" stroke="#E7CF96" stroke-width="7" stroke-linecap="round" transform="rotate(${(angle * 1.5).toFixed(1)})"/>
    <circle r="12" fill="url(#gold)"/>
    <rect x="182" y="-26" width="36" height="52" rx="9" fill="url(#gold)" transform="rotate(${angle.toFixed(1)})"/>
  </g>
</g>
</svg>`;
  fs.writeFileSync(path.join(watchFramesDir, `frame-${String(i + 1).padStart(2, "0")}.svg`), frame);
}

console.log("SVG assets generated.");
console.log("products:", fs.readdirSync(path.join(ROOT, "products")).length);
console.log("images:", fs.readdirSync(path.join(ROOT, "images")).length);
console.log("360 frames:", fs.readdirSync(watchFramesDir).length);
