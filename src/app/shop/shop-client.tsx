"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categories } from "@/lib/categories";
import { products, byBadge, byCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const VIEW_TITLES: Record<string, string> = {
  new: "New Arrivals",
  best: "Best Sellers",
  trending: "Trending Now",
  collections: "Premium Collections",
  categories: "Categories",
};

export default function ShopClient() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat")?.trim() ?? undefined;
  const q = searchParams.get("q")?.trim().toLowerCase() ?? undefined;
  const view = searchParams.get("view")?.trim() ?? undefined;
  const qRaw = searchParams.get("q") ?? "";

  let list = [...products];
  let title = "All Products";

  if (view && VIEW_TITLES[view]) {
    title = VIEW_TITLES[view];
    if (view === "new") list = byBadge("new");
    else if (view === "best") list = byBadge("bestseller");
    else if (view === "trending") list = byBadge("trending");
    else if (view === "collections") list = byBadge("premium");
  }
  if (cat) {
    list = byCategory(cat);
    title = categories.find((c) => c.slug === cat)?.name ?? "Products";
  }
  if (q) {
    list = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    title = `Search: “${qRaw}”`;
  }

  return (
    <div className="marble-surface min-h-screen">
      <div className="navy-surface">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <nav className="text-xs tracking-[0.16em] uppercase text-slate mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-champagne">Home</Link>
            <span className="mx-2 text-gold">/</span>
            <span className="text-champagne">Shop</span>
          </nav>
          <h1 className="font-display text-4xl md:text-6xl text-marble">
            {cat || view || q ? (
              <span className="gold-text">{title}</span>
            ) : (
              <>The <span className="gold-text">Collection</span></>
            )}
          </h1>
          <p className="text-marble/65 mt-3 text-sm">
            {list.length} product{list.length === 1 ? "" : "s"} · demonstration catalog
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-wrap gap-2.5 mb-10">
          <Link
            href="/shop"
            className={`text-[11px] tracking-[0.16em] uppercase px-4 py-2 rounded-full border transition-colors ${
              !cat && !view ? "bg-midnight text-champagne border-midnight" : "border-royal/15 text-slate hover:border-gold"
            }`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/shop?cat=${c.slug}`}
              className={`text-[11px] tracking-[0.16em] uppercase px-4 py-2 rounded-full border transition-colors ${
                cat === c.slug ? "bg-midnight text-champagne border-midnight" : "border-royal/15 text-slate hover:border-gold"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {view === "categories" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
            {categories.map((c) => (
              <Link key={c.slug} href={`/shop?cat=${c.slug}`} className="group card-elevated bg-white rounded-2xl p-4 border border-royal/5 text-center">
                <div className="rounded-xl overflow-hidden bg-midnight">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={c.name} width={800} height={800} loading="lazy" className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h2 className="font-display text-base text-midnight mt-3">{c.name}</h2>
                <p className="text-[10px] tracking-[0.16em] text-slate mt-1">{c.count} ITEMS</p>
              </Link>
            ))}
          </div>
        )}

        {list.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-midnight">Nothing here yet</p>
            <p className="text-slate mt-3">Try another filter or clear your search.</p>
            <Link href="/shop" className="inline-block btn-gold mt-7 px-8 py-3.5 rounded-full text-xs tracking-[0.18em]">
              BROWSE ALL PRODUCTS
            </Link>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
