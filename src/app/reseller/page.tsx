import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Become a Reseller" };

const STEPS = [
  { n: "01", t: "Apply", d: "Submit your business details and preferred storefront name for review." },
  { n: "02", t: "Get Approved", d: "Admin verifies your application and configures your pricing tier." },
  { n: "03", t: "Curate Your Store", d: "Choose products from the authorized catalog, set your banner and logo." },
  { n: "04", t: "Sell & Earn", d: "Share your storefront URL, track orders and calculate margins in one dashboard." },
];

export default function ResellerPage() {
  return (
    <div className="marble-surface min-h-screen">
      <div className="navy-surface">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gold">Multi-Store Network</p>
          <h1 className="font-display text-4xl md:text-6xl text-marble mt-4">
            Resell with <span className="gold-text">AZIZ TRADERS</span>
          </h1>
          <p className="text-marble/70 mt-5 max-w-2xl leading-relaxed">
            Launch your own storefront powered by our catalog, inventory and fulfilment — with strict
            data isolation between resellers and protected supplier pricing.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-white rounded-2xl border border-royal/10 p-7">
              <span className="font-display text-4xl gold-text">{s.n}</span>
              <h2 className="font-display text-xl text-midnight mt-4">{s.t}</h2>
              <p className="text-sm text-slate leading-relaxed mt-2">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-14">
          <div className="bg-white rounded-2xl border border-royal/10 p-8">
            <h2 className="font-display text-2xl text-midnight">What You Receive</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate">
              {[
                "Shareable storefront URL with your branding",
                "Product selection from the authorized catalog only",
                "Configurable margin and pricing rules",
                "Order, sales and payout dashboards",
                "Fulfilment tracking handled by AZIZ TRADERS",
              ].map((li) => (
                <li key={li} className="flex gap-3">
                  <span className="text-gold mt-0.5">◆</span>
                  {li}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl navy-surface border hairline p-8">
            <h2 className="font-display text-2xl text-marble">Important Notes</h2>
            <ul className="mt-5 space-y-3 text-sm text-marble/70">
              {[
                "Resellers never access other resellers' data or master inventory.",
                "Customer payments and returns are handled under the main platform agreement — no independent legal or payment account is created automatically.",
                "Applications open in Phase 6 (Business Network) of the build plan.",
              ].map((li) => (
                <li key={li} className="flex gap-3">
                  <span className="text-gold mt-0.5">◆</span>
                  {li}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="inline-block btn-gold mt-7 px-8 py-3.5 rounded-full text-xs tracking-[0.18em]">
              APPLY NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
