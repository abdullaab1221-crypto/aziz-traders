"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

type Props = {
  newIn: Product[];
  best: Product[];
  trending: Product[];
  premium: Product[];
};

const TABS = [
  { key: "new", label: "New Arrivals" },
  { key: "trending", label: "Trending Now" },
  { key: "best", label: "Best Sellers" },
  { key: "premium", label: "Premium Collections" },
] as const;

export default function HomeClient({ newIn, best, trending, premium }: Props) {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("new");
  const map: Record<string, Product[]> = { new: newIn, trending, best, premium };
  const list = map[tab] ?? [];

  return (
    <div>
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-[11px] tracking-[0.4em] uppercase text-gold">Editorial Picks</p>
        <h2 className="font-display text-3xl md:text-5xl text-midnight mt-4">
          Explore the <span className="gold-text">Collections</span>
        </h2>
        <div className="gold-rule my-6 mx-auto w-48" />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-4" role="tablist" aria-label="Collection filters">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`text-[11px] tracking-[0.18em] uppercase px-5 py-2.5 rounded-full border transition-all ${
              tab === t.key
                ? "bg-midnight text-champagne border-midnight"
                : "border-royal/15 text-slate hover:border-gold hover:text-gold"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-7 mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {list.length > 0 ? (
          list.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p className="col-span-full text-center text-slate py-10">
            No products in this collection yet.
          </p>
        )}
      </div>
    </div>
  );
}
