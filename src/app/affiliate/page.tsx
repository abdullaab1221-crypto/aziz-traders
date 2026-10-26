import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Affiliate Program" };

const FEATURES = [
  { t: "Unique Referral URLs", d: "Every approved affiliate receives trackable links with campaign parameters." },
  { t: "Click & Conversion Analytics", d: "Dashboard views for clicks, eligible orders and conversion rates." },
  { t: "Configurable Commissions", d: "Rates set by admin per product, category or campaign — calculated on eligible sale amount." },
  { t: "Refund Adjustments", d: "Commissions are reversed when orders are cancelled or refunded." },
  { t: "Payout Requests", d: "Affiliates request withdrawal; admin approves with full audit history." },
  { t: "Fraud Protection", d: "Self-referral, duplicate attribution and cookie stuffing are blocked by design." },
];

export default function AffiliatePage() {
  return (
    <div className="marble-surface min-h-screen">
      <div className="navy-surface">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gold">Partnership</p>
          <h1 className="font-display text-4xl md:text-6xl text-marble mt-4">
            AZIZ TRADERS <span className="gold-text">Affiliate Program</span>
          </h1>
          <p className="text-marble/70 mt-5 max-w-2xl leading-relaxed">
            Earn commission by recommending products you genuinely endorse. Attribution is tracked
            server-side, commissions are calculated from verified orders only.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.t} className="bg-white rounded-2xl border border-royal/10 p-7 hover:border-gold/50 transition-colors">
              <span className="block h-1 w-10 bg-gold rounded-full mb-5" />
              <h2 className="font-display text-xl text-midnight">{f.t}</h2>
              <p className="text-sm text-slate leading-relaxed mt-2">{f.d}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl navy-surface border hairline p-10 mt-14 text-center">
          <h2 className="font-display text-3xl text-marble">Become an Affiliate</h2>
          <p className="text-marble/70 mt-3 max-w-xl mx-auto text-sm">
            Registration, approval and the payout dashboard land in Phase 6 (Business Network) of the
            build plan. Apply early to be first in the queue.
          </p>
          <Link href="/contact" className="inline-block btn-gold mt-7 px-9 py-4 rounded-full text-xs tracking-[0.2em]">
            APPLY VIA CONTACT FORM
          </Link>
        </div>
      </div>
    </div>
  );
}
