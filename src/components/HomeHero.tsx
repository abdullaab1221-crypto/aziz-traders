"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  eyebrow: string;
  line1: string;
  line2: string;
  sub: string;
  image: string;
  alt: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Premium Collection",
    line1: "Style Meets",
    line2: "Quality",
    sub: "Discover the finest products, curated for you.",
    image: "/images/hero/hero-campaign.jpg",
    alt: "Luxury navy-dial chronograph watch, navy leather handbag and navy sneakers staged on marble podiums",
  },
  {
    eyebrow: "New Season · 2026",
    line1: "Exceptional Finds.",
    line2: "Elevated Living.",
    sub: "Remarkable products across fashion, jewellery, electronics and home.",
    image: "/images/hero/brand-experience.jpg",
    alt: "Shopper carrying premium finds",
  },
  {
    eyebrow: "The Premium Edit",
    line1: "Curated for",
    line2: "Everyday Excellence",
    sub: "A rotating selection of our finest pieces — updated seasonally.",
    image: "/images/hero/campaign-store.jpg",
    alt: "AZIZ TRADERS campaign store interior",
  },
];

const AUTO_MS = 5000;

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {dir === "left" ? (
        <path d="M15 5 8 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export default function HomeHero() {
  const [index, setIndex] = useState(0);
  const count = SLIDES.length;

  const go = (next: number) => setIndex((next + count) % count);

  // auto-rotate har 5 second mein; manual nav pe timer reset
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_MS);
    return () => clearInterval(id);
  }, [index, count]);

  return (
    <section aria-label="Featured collections" className="relative overflow-hidden bg-midnight">
      {/* ONE shared background — 3 real photos, brand navy mein grade hoke ek hi backdrop banti hain */}
      <div className="absolute inset-0">
        {SLIDES.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.image}
            src={s.image}
            alt={s.alt}
            width={1600}
            height={1000}
            loading={i === 0 ? "eager" : "lazy"}
            aria-hidden={i !== index}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* unified navy grade — left text side se right image side tak ek hi background tone */}
        <div className="absolute inset-0 bg-midnight/70 lg:hidden" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-midnight via-midnight/80 to-midnight/35" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-midnight/65 to-transparent" />
      </div>

      {/* content — buttons + copy, same shared background par */}
      <div className="relative z-10 mx-auto flex min-h-[420px] sm:min-h-[480px] lg:min-h-[620px] max-w-7xl items-center px-6 sm:px-10 lg:pl-24 lg:pr-14 py-14 lg:py-20">
        <div className="relative w-full max-w-xl">
          {SLIDES.map((s, i) => (
            <div
              key={s.line1}
              aria-hidden={i !== index}
              inert={i !== index}
              className={`transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"
              }`}
            >
              <p className="text-[11px] sm:text-xs tracking-[0.4em] uppercase text-gold">
                {s.eyebrow}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-marble mt-5">
                {s.line1}
                <br />
                <span className="gold-text">{s.line2}</span>
              </h1>
              <p className="text-marble/75 mt-5 max-w-md text-base lg:text-lg leading-relaxed">
                {s.sub}
              </p>
              <Link
                href="/shop"
                className="btn-gold inline-flex items-center gap-2.5 mt-8 px-8 py-4 rounded-lg text-xs tracking-[0.22em] font-semibold"
              >
                SHOP NOW
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                  <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* carousel controls */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="hidden lg:grid absolute left-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 place-items-center rounded-full bg-midnight/55 border border-gold/40 text-marble backdrop-blur-sm hover:bg-midnight hover:text-gold transition-colors"
      >
        <ArrowIcon dir="left" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="hidden lg:grid absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 place-items-center rounded-full bg-midnight/55 border border-gold/40 text-marble backdrop-blur-sm hover:bg-midnight hover:text-gold transition-colors"
      >
        <ArrowIcon dir="right" />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2.5" role="tablist" aria-label="Slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.line1}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-gold" : "w-2.5 bg-marble/55 hover:bg-champagne/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
