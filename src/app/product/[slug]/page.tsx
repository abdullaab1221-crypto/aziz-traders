import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, formatPrice } from "@/lib/products";
import { categories } from "@/lib/categories";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";
import Viewer360 from "@/components/Viewer360";
import ProductCard from "@/components/ProductCard";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product not found" };
  return { title: p.name, description: p.description };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = categories.find((c) => c.slug === product.category);
  const onSale = typeof product.originalPrice === "number" && product.originalPrice > product.price;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="marble-surface min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <nav className="text-xs tracking-[0.16em] uppercase text-slate mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-deepblue">Home</Link>
          <span className="mx-2 text-gold">/</span>
          <Link href="/shop" className="hover:text-deepblue">Shop</Link>
          <span className="mx-2 text-gold">/</span>
          <Link href={`/shop?cat=${product.category}`} className="hover:text-deepblue">{category?.name ?? product.category}</Link>
          <span className="mx-2 text-gold">/</span>
          <span className="text-midnight">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            {product.has360 ? (
              <Viewer360 enabled={true} />
            ) : (
              <div className="rounded-2xl overflow-hidden border border-royal/10 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} width={800} height={800} className="w-full aspect-square object-cover" />
              </div>
            )}

            <div className="grid grid-cols-4 gap-3 mt-4">
              {gallery.map((g, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-royal/10 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g} alt="" aria-hidden width={800} height={800} loading="lazy" className="w-full aspect-square object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.badge && (
                <span className="bg-midnight text-champagne text-[10px] tracking-[0.16em] px-3 py-1 rounded-full">
                  {product.badge.toUpperCase()}
                </span>
              )}
              {onSale && product.discountLabel && (
                <span className="bg-gold text-midnight text-[10px] font-bold tracking-[0.12em] px-3 py-1 rounded-full">
                  {product.discountLabel}
                </span>
              )}
              {product.has3D && (
                <span className="border border-gold text-gold text-[10px] tracking-[0.16em] px-3 py-1 rounded-full">
                  3D READY
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl text-midnight leading-tight">{product.name}</h1>

            <div className="flex items-baseline gap-4 mt-5">
              <span className="text-3xl font-semibold text-deepblue">{formatPrice(product.price)}</span>
              {onSale && <span className="text-slate line-through">{formatPrice(product.originalPrice!)}</span>}
            </div>

            <div className="gold-rule my-7" />

            <p className="text-slate leading-relaxed">{product.description}</p>

            <div className="mt-7 space-y-5">
              {product.colors && product.colors.length > 0 && (
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-midnight mb-2.5">Colour</p>
                  <div className="flex gap-2.5">
                    {product.colors.map((c) => (
                      <span key={c} className="h-8 w-8 rounded-full border-2 border-royal/15 shadow-sm" style={{ background: c }} title={c} />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-midnight mb-2.5">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button key={s} className="min-w-11 px-3 py-2 border border-royal/20 text-sm rounded-lg hover:border-gold hover:text-gold transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-red-500"}`} />
                <span className="text-sm text-midnight">
                  {product.stock === 0
                    ? "Out of stock"
                    : product.stock <= 10
                    ? `Only ${product.stock} left in stock`
                    : "In stock — ready to ship"}
                </span>
              </div>

              <div className="rounded-2xl bg-white border border-royal/10 p-5 text-sm text-slate space-y-2.5">
                <p><span className="text-midnight font-medium">SKU:</span> AT-{product.id.toUpperCase()}</p>
                <p><span className="text-midnight font-medium">Delivery:</span> Estimated 3–7 business days across Pakistan</p>
                <p><span className="text-midnight font-medium">Returns:</span> Eligible per our returns policy — see contact page</p>
                <p><span className="text-midnight font-medium">Payment:</span> Cash on Delivery available · online gateways coming soon</p>
              </div>

              <div className="flex items-center gap-3">
                <AddToCartButton product={product} />
                <WishlistButton productId={product.id} name={product.name} size="lg" />
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-[11px] tracking-[0.4em] uppercase text-gold">Complete the Look</p>
              <h2 className="font-display text-3xl md:text-4xl text-midnight mt-3">
                Related <span className="gold-text">Products</span>
              </h2>
            </div>
            <div className="grid gap-7 mt-10 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
