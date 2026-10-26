"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/products";
import { useWishlist } from "@/components/WishlistProvider";
import ProductCard from "@/components/ProductCard";

type Tab = "login" | "register" | "orders" | "wishlist" | "addresses";

const DEMO_ORDERS = [
  { id: "AT-DEMO-1001", date: "2026-10-12", status: "Delivered", total: 24999, items: 1 },
  { id: "AT-DEMO-1002", date: "2026-10-19", status: "Processing", total: 30498, items: 2 },
];

const TABS: { id: Tab; label: string }[] = [
  { id: "login", label: "Sign In" },
  { id: "register", label: "Create Account" },
  { id: "orders", label: "Orders" },
  { id: "wishlist", label: "Wishlist" },
  { id: "addresses", label: "Addresses" },
];

function AccountInner() {
  const params = useSearchParams();
  const tabParam = params.get("tab");
  const [tab, setTab] = useState<Tab>(
    TABS.some((t) => t.id === tabParam) ? (tabParam as Tab) : "login"
  );
  const [authed, setAuthed] = useState(false);
  const [notice, setNotice] = useState("");
  const wishlist = useWishlist();
  const wishProducts = wishlist.ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  function submit(kind: "login" | "register") {
    setNotice(
      kind === "login"
        ? "Demo only — no accounts are stored yet. Production uses server-side sessions with hashed passwords."
        : "Demo only — registration will connect to the database backend in the commerce phase."
    );
    setAuthed(true);
  }

  return (
    <div className="marble-surface min-h-screen">
      <div className="navy-surface">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="font-display text-4xl md:text-6xl text-marble">
            My <span className="gold-text">Account</span>
          </h1>
          <p className="text-marble/65 mt-3 text-sm">Orders, wishlist and saved addresses</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-wrap gap-2.5 mb-8" role="tablist" aria-label="Account sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`text-[11px] tracking-[0.16em] uppercase px-4 py-2.5 rounded-full border transition-colors ${
                tab === t.id ? "bg-midnight text-champagne border-midnight" : "border-royal/15 text-slate hover:border-gold"
              }`}
            >
              {t.label}
              {t.id === "wishlist" && wishlist.count > 0 ? ` (${wishlist.count})` : ""}
            </button>
          ))}
        </div>

        {notice && <p className="mb-6 text-sm border border-gold/40 bg-warmgold/25 text-midnight rounded-xl p-4">{notice}</p>}

        <div className="bg-white rounded-2xl border border-royal/10 p-7">
          {tab === "login" && (
            <div className="max-w-md space-y-5">
              <h2 className="font-display text-2xl text-midnight">Welcome Back</h2>
              <input type="email" placeholder="Email address" aria-label="Email address" className="w-full border border-royal/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <input type="password" placeholder="Password" aria-label="Password" className="w-full border border-royal/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <button onClick={() => submit("login")} className="btn-gold w-full py-3.5 rounded-full text-xs tracking-[0.18em]">SIGN IN</button>
              <p className="text-xs text-slate">Forgot password? Recovery flow arrives with the authentication module.</p>
            </div>
          )}

          {tab === "register" && (
            <div className="max-w-md space-y-5">
              <h2 className="font-display text-2xl text-midnight">Create Your Account</h2>
              <input placeholder="Full name" aria-label="Full name" className="w-full border border-royal/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <input type="email" placeholder="Email address" aria-label="Email address" className="w-full border border-royal/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <input type="tel" placeholder="Phone (03XX-XXXXXXX)" aria-label="Phone" className="w-full border border-royal/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <input type="password" placeholder="Password" aria-label="Password" className="w-full border border-royal/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <button onClick={() => submit("register")} className="btn-gold w-full py-3.5 rounded-full text-xs tracking-[0.18em]">CREATE ACCOUNT</button>
            </div>
          )}

          {tab === "orders" && (
            <div>
              <h2 className="font-display text-2xl text-midnight mb-6">Order History</h2>
              {!authed ? (
                <p className="text-slate text-sm">Sign in to view your orders. (Demo data shown below for preview purposes.)</p>
              ) : null}
              <ul className="divide-y divide-royal/10 border border-royal/10 rounded-xl overflow-hidden">
                {DEMO_ORDERS.map((o) => (
                  <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div>
                      <p className="text-midnight font-medium text-sm">{o.id}</p>
                      <p className="text-xs text-slate mt-0.5">{o.date} · {o.items} item{o.items > 1 ? "s" : ""}</p>
                    </div>
                    <span className={`text-[10px] tracking-[0.14em] px-3 py-1 rounded-full ${o.status === "Delivered" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {o.status.toUpperCase()}
                    </span>
                    <span className="text-deepblue font-semibold text-sm">PKR {o.total.toLocaleString("en-PK")}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-slate mt-4">Demonstration orders — no real purchases exist.</p>
            </div>
          )}

          {tab === "wishlist" && (
            <div>
              <h2 className="font-display text-2xl text-midnight mb-6">Wishlist</h2>
              {wishProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-slate text-sm">Tap the heart on any product card to save it here.</p>
                  <Link href="/shop" className="inline-block btn-gold mt-6 px-8 py-3.5 rounded-full text-xs tracking-[0.18em]">BROWSE PRODUCTS</Link>
                </div>
              ) : (
                <>
                  <p className="text-xs text-slate mb-6">
                    Saved locally on this device — syncs to your account when the backend arrives.
                  </p>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {wishProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {tab === "addresses" && (
            <div className="text-center py-10">
              <h2 className="font-display text-2xl text-midnight">Saved Addresses</h2>
              <p className="text-slate mt-3 text-sm">Address book arrives with the accounts module — add delivery points at checkout.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={null}>
      <AccountInner />
    </Suspense>
  );
}
