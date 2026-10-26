"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { products, formatPrice } from "@/lib/products";

export default function CartPage() {
  const { lines, setQty, remove, clear, count } = useCart();

  const rows = lines
    .map((l) => {
      const p = products.find((x) => x.id === l.productId);
      return p ? { line: l, product: p } : null;
    })
    .filter(Boolean) as { line: (typeof lines)[number]; product: (typeof products)[number] }[];

  const subtotal = rows.reduce((n, r) => n + r.product.price * r.line.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 350;

  return (
    <div className="marble-surface min-h-screen">
      <div className="navy-surface">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <nav className="text-xs tracking-[0.16em] uppercase text-slate mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-champagne">Home</Link>
            <span className="mx-2 text-gold">/</span>
            <span className="text-champagne">Cart</span>
          </nav>
          <h1 className="font-display text-4xl md:text-6xl text-marble">
            Shopping <span className="gold-text">Cart</span>
          </h1>
          <p className="text-marble/65 mt-3 text-sm">{count} item{count === 1 ? "" : "s"}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {rows.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-midnight">Your cart is empty</p>
            <p className="text-slate mt-3">Explore the collection and add something exceptional.</p>
            <Link href="/shop" className="inline-block btn-gold mt-7 px-9 py-4 rounded-full text-xs tracking-[0.2em]">
              START SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-5">
              {rows.map(({ line, product }) => (
                <div key={line.productId} className="bg-white rounded-2xl border border-royal/10 p-5 flex gap-5">
                  <Link href={`/product/${product.slug}`} className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt={product.name} width={800} height={800} className="h-28 w-28 object-cover rounded-xl bg-marble" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h2 className="font-display text-lg text-midnight leading-snug">{product.name}</h2>
                        <p className="text-[11px] tracking-[0.14em] uppercase text-slate mt-1">{product.category.replace(/-/g, " ")}</p>
                        {line.color && <p className="text-xs text-slate mt-1">Colour: {line.color}</p>}
                        {line.size && <p className="text-xs text-slate">Size: {line.size}</p>}
                      </div>
                      <p className="text-deepblue font-semibold whitespace-nowrap">{formatPrice(product.price * line.qty)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-royal/15 rounded-full">
                        <button aria-label="Decrease quantity" onClick={() => setQty(line.productId, line.qty - 1)} className="h-9 w-9 text-midnight hover:text-gold">−</button>
                        <span className="w-8 text-center text-sm">{line.qty}</span>
                        <button aria-label="Increase quantity" onClick={() => setQty(line.productId, line.qty + 1)} className="h-9 w-9 text-midnight hover:text-gold disabled:opacity-40" disabled={line.qty >= product.stock}>+</button>
                      </div>
                      <button onClick={() => remove(line.productId)} className="text-xs tracking-[0.14em] uppercase text-slate hover:text-red-500 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clear} className="text-xs tracking-[0.14em] uppercase text-slate hover:text-red-500">
                Clear cart
              </button>
            </div>

            <aside className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-royal/10 p-7 sticky top-32">
                <h2 className="font-display text-2xl text-midnight">Order Summary</h2>
                <div className="gold-rule my-5" />
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between"><dt className="text-slate">Subtotal</dt><dd className="text-midnight">{formatPrice(subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate">Shipping</dt><dd className="text-midnight">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
                  <div className="flex justify-between border-t hairline pt-3 font-semibold text-base"><dt className="text-midnight">Total</dt><dd className="text-deepblue">{formatPrice(subtotal + shipping)}</dd></div>
                </dl>
                <p className="text-[11px] text-slate leading-relaxed mt-4">
                  Final pricing, shipping and discounts are re-validated on the server at checkout.
                </p>
                <Link href="/checkout" className="block text-center btn-gold mt-6 py-3.5 rounded-full text-xs tracking-[0.18em]">
                  PROCEED TO CHECKOUT
                </Link>
                <Link href="/shop" className="block text-center text-xs tracking-[0.16em] uppercase text-slate hover:text-gold mt-4">
                  Continue shopping
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
