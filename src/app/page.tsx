import Link from "next/link";
import { products, byBadge } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import HomeHero from "@/components/HomeHero";
import HomeClient from "./home-client";

export default function HomePage() {
  const newIn = byBadge("new");
  const best = byBadge("bestseller");
  const trending = byBadge("trending");
  const premium = byBadge("premium");
  const featured = [...newIn, ...best, ...trending, ...premium, ...products].filter(
    (p, i, arr) => arr.findIndex((x) => x.id === p.id) === i
  ).slice(0, 8);

  return (
    <>
      {/* HERO — reference-matched campaign carousel (src/components/HomeHero.tsx) */}
      <HomeHero />

      {/* FEATURED SELECTION — buy / add-to-cart cards only */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-gold">Handpicked</p>
              <h2 className="font-display text-3xl md:text-5xl text-midnight mt-4">
                Featured <span className="gold-text">Selection</span>
              </h2>
            </div>
            <div className="flex gap-6 text-xs tracking-[0.16em] uppercase">
              <span className="text-deepblue border-b-2 border-gold pb-1">All</span>
              <Link href="/shop?view=new" className="text-slate hover:text-deepblue">New Arrivals</Link>
              <Link href="/shop?view=best" className="text-slate hover:text-deepblue">Best Sellers</Link>
              <Link href="/shop?view=trending" className="text-slate hover:text-deepblue">Trending</Link>
            </div>
          </div>

          <div className="grid gap-7 mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/shop"
              className="inline-block border border-royal/25 text-midnight px-10 py-4 rounded-full text-xs tracking-[0.2em] hover:border-gold hover:text-gold transition-colors"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* COLLECTIONS TABS — buy / add-to-cart cards only */}
      <section className="py-20 marble-surface">
        <div className="mx-auto max-w-7xl px-4">
          <HomeClient newIn={newIn} best={best} trending={trending} premium={premium} />
        </div>
      </section>

      {/* BRAND REEL — constrained-width rectangle banner with real video */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl overflow-hidden border border-gold/30 shadow-[0_18px_50px_-24px_rgba(7,20,38,0.45)]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/hero/hero-campaign.jpg"
              className="block w-full aspect-[16/7] object-cover bg-midnight"
            >
              <source src="/videos/aziz-traders-brand-reel.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
    </>
  );
}
