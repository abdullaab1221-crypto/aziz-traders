"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { products, formatPrice } from "@/lib/products";

const STEPS = ["Delivery", "Payment", "Review"];

export default function CheckoutPage() {
  const { lines, clear } = useCart();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    payment: "cod",
  });

  const rows = lines
    .map((l) => ({ line: l, product: products.find((x) => x.id === l.productId) }))
    .filter((r) => r.product) as { line: (typeof lines)[number]; product: (typeof products)[number] }[];

  const subtotal = rows.reduce((n, r) => n + r.product.price * r.line.qty, 0);
  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 350;
  const total = subtotal + shipping;

  function next() {
    setError("");
    if (step === 0) {
      if (!form.name || !form.phone || !form.address || !form.city) {
        setError("Please complete name, phone, address and city.");
        return;
      }
    }
    if (step === 2) {
      if (rows.length === 0) {
        setError("Your cart is empty.");
        return;
      }
    }
    setStep((s) => Math.min(s + 1, 2));
  }

  function placeOrder() {
    setError("");
    if (form.payment === "online") {
      setError(
        "Online payment gateways are not connected yet. Please select Cash on Delivery for this preview, or check back after merchant approval."
      );
      return;
    }
    setPlaced(true);
    clear();
  }

  if (placed) {
    return (
      <div className="marble-surface min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-28 text-center">
          <div className="h-16 w-16 rounded-full bg-midnight text-champagne grid place-items-center mx-auto text-2xl">✓</div>
          <h1 className="font-display text-4xl text-midnight mt-7">Order Received</h1>
          <p className="text-slate mt-4 leading-relaxed">
            Thank you, {form.name || "customer"}. Your demonstration order has been recorded in this
            browser session only — no payment was processed and no real order was created. A
            production deployment validates totals server-side and issues a confirmation email.
          </p>
          <p className="mt-5 text-sm text-midnight">
            Reference: <span className="text-gold font-semibold">DEMO-{Date.now().toString().slice(-8)}</span>
          </p>
          <div className="flex gap-4 justify-center mt-9">
            <Link href="/shop" className="btn-gold px-8 py-3.5 rounded-full text-xs tracking-[0.18em]">CONTINUE SHOPPING</Link>
            <Link href="/" className="border border-royal/20 px-8 py-3.5 rounded-full text-xs tracking-[0.18em] text-midnight hover:border-gold">HOME</Link>
          </div>
        </div>
      </div>
    );
  }

  if (rows.length === 0 && !placed) {
    return (
      <div className="marble-surface min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-28 text-center">
          <h1 className="font-display text-4xl text-midnight">Nothing to check out</h1>
          <p className="text-slate mt-4">Your cart is empty.</p>
          <Link href="/shop" className="inline-block btn-gold mt-7 px-9 py-4 rounded-full text-xs tracking-[0.2em]">BROWSE PRODUCTS</Link>
        </div>
      </div>
    );
  }

  const field = (key: keyof typeof form, label: string, ph: string, type = "text") => (
    <label className="block">
      <span className="text-[11px] tracking-[0.16em] uppercase text-midnight">{label}</span>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={ph}
        className="mt-1.5 w-full border border-royal/15 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-gold"
      />
    </label>
  );

  return (
    <div className="marble-surface min-h-screen">
      <div className="navy-surface">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="font-display text-4xl md:text-5xl text-marble">
            Secure <span className="gold-text">Checkout</span>
          </h1>
          <div className="flex gap-6 mt-7" aria-label="Checkout progress">
            {STEPS.map((s, i) => (
              <span key={s} className={`text-[11px] tracking-[0.18em] uppercase ${i === step ? "text-champagne" : i < step ? "text-gold" : "text-slate"}`}>
                {i + 1}. {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-royal/10 p-7">
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl text-midnight">Delivery Address</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {field("name", "Full Name", "e.g. Ahmed Raza")}
                {field("phone", "Phone", "03XX-XXXXXXX", "tel")}
                {field("email", "Email (optional)", "you@example.com", "email")}
                {field("postal", "Postal Code", "e.g. 54000")}
              </div>
              {field("address", "Street Address", "House, street, area")}
              {field("city", "City", "e.g. Lahore")}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl text-midnight">Payment Method</h2>
              {[
                { id: "cod", title: "Cash on Delivery", note: "Pay when your order arrives. Available now." },
                { id: "online", title: "JazzCash / Easypaisa / Card", note: "Coming soon — requires merchant approval and sandbox testing." },
              ].map((opt) => (
                <label key={opt.id} className={`flex gap-4 items-start border rounded-xl p-5 cursor-pointer transition-colors ${form.payment === opt.id ? "border-gold bg-warmgold/20" : "border-royal/10"}`}>
                  <input type="radio" name="payment" checked={form.payment === opt.id} onChange={() => setForm((f) => ({ ...f, payment: opt.id }))} className="mt-1 accent-[#C6A15B]" />
                  <span>
                    <span className="block font-medium text-midnight">{opt.title}</span>
                    <span className="block text-sm text-slate mt-1">{opt.note}</span>
                  </span>
                </label>
              ))}
              <p className="text-[11px] text-slate leading-relaxed">
                No card details are ever collected by this interface. Online gateways will be added
                only after official merchant onboarding and callback verification.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl text-midnight">Review Order</h2>
              <div className="rounded-xl border border-royal/10 p-5 text-sm space-y-2">
                <p className="text-midnight"><span className="text-slate">Ship to:</span> {form.name}, {form.address}, {form.city} {form.postal}</p>
                <p className="text-midnight"><span className="text-slate">Phone:</span> {form.phone}</p>
                <p className="text-midnight"><span className="text-slate">Payment:</span> {form.payment === "cod" ? "Cash on Delivery" : "Online (unavailable)"}</p>
              </div>
              <ul className="divide-y divide-royal/10 border border-royal/10 rounded-xl">
                {rows.map(({ line, product }) => (
                  <li key={line.productId} className="flex justify-between gap-4 p-4 text-sm">
                    <span className="text-midnight">{product.name} × {line.qty}</span>
                    <span className="text-deepblue">{formatPrice(product.price * line.qty)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {error && (
            <p role="alert" className="mt-5 text-sm text-red-600 border border-red-200 bg-red-50 rounded-xl p-4">
              {error}
            </p>
          )}

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-xs tracking-[0.16em] uppercase text-slate hover:text-midnight disabled:opacity-40"
            >
              ← Back
            </button>
            {step < 2 ? (
              <button onClick={next} className="btn-gold px-8 py-3.5 rounded-full text-xs tracking-[0.18em]">CONTINUE</button>
            ) : (
              <button onClick={placeOrder} className="btn-gold px-8 py-3.5 rounded-full text-xs tracking-[0.18em]">PLACE ORDER</button>
            )}
          </div>
        </div>

        <aside>
          <div className="bg-white rounded-2xl border border-royal/10 p-7 sticky top-32">
            <h2 className="font-display text-xl text-midnight">Summary</h2>
            <div className="gold-rule my-4" />
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-slate">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-slate">Shipping</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between border-t hairline pt-3 font-semibold"><dt className="text-midnight">Total</dt><dd className="text-deepblue">{formatPrice(total)}</dd></div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
