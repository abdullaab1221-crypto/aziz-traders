import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";

const BADGE_LABEL: Record<NonNullable<Product["badge"]>, string> = {
  new: "NEW",
  bestseller: "BEST SELLER",
  trending: "TRENDING",
  premium: "PREMIUM",
};

export default function ProductCard({ product }: { product: Product }) {
  const onSale = typeof product.originalPrice === "number" && product.originalPrice > product.price;

  return (
    <article className="group card-elevated bg-white rounded-2xl overflow-hidden border border-royal/5 flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden bg-marble">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          loading="lazy"
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-midnight text-champagne text-[10px] tracking-[0.16em] px-2.5 py-1 rounded-full">
              {BADGE_LABEL[product.badge]}
            </span>
          )}
          {onSale && product.discountLabel && (
            <span className="bg-gold text-midnight text-[10px] font-bold tracking-[0.12em] px-2.5 py-1 rounded-full">
              {product.discountLabel}
            </span>
          )}
        </div>
        {product.stock === 0 && (
          <span className="absolute inset-0 bg-midnight/60 grid place-items-center text-champagne text-sm tracking-[0.2em]">
            OUT OF STOCK
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg leading-snug text-midnight">
              <Link href={`/product/${product.slug}`} className="hover:text-deepblue transition-colors">
                {product.name}
              </Link>
            </h3>
            <p className="text-[11px] tracking-[0.16em] uppercase text-slate mt-1">
              {product.category.replace(/-/g, " ")}
            </p>
          </div>
          <WishlistButton productId={product.id} name={product.name} />
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-deepblue font-semibold">
            {formatPrice(product.price)}
          </span>
          {onSale && (
            <span className="text-slate text-sm line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5" aria-label="Available colors">
            {product.colors.map((c) => (
              <span
                key={c}
                className="h-4 w-4 rounded-full border border-royal/20"
                style={{ background: c }}
                title={c}
              />
            ))}
          </div>
        )}

        <div className="mt-auto pt-1 flex items-center justify-between gap-3">
          <span className={`text-[11px] tracking-[0.14em] ${product.stock > 0 ? "text-deepblue" : "text-red-600"}`}>
            {product.stock === 0 ? "UNAVAILABLE" : product.stock <= 10 ? `ONLY ${product.stock} LEFT` : "IN STOCK"}
          </span>
          <AddToCartButton product={product} compact />
        </div>
      </div>
    </article>
  );
}
