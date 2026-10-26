import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="marble-surface min-h-screen">
      <div className="navy-surface">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gold">Our Story</p>
          <h1 className="font-display text-4xl md:text-6xl text-marble mt-4">
            About <span className="gold-text">AZIZ TRADERS</span>
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 space-y-8">
        <p className="text-lg leading-relaxed text-midnight">
          AZIZ TRADERS is a premium retail destination built for customers who value quality,
          transparency and a shopping experience that matches the products themselves.
        </p>
        <div className="gold-rule" />
        <div className="space-y-5 text-slate leading-relaxed">
          <p>
            We curate fashion, footwear, jewellery, electronics and lifestyle goods with attention
            to material, finish and long-term value. Every listing presents honest product
            information — real prices, real stock and clear policies.
          </p>
          <p>
            Our platform combines luxury design with modern commerce infrastructure: server-validated
            orders, transparent delivery updates and customer support that actually responds.
          </p>
          <p>
            This website is currently a pre-launch build. Demonstration products and stats visible
            on this preview are clearly marked and do not represent live sales figures.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 pt-4">
          {[
            { t: "Quality First", d: "Materials and finishes reviewed before listing." },
            { t: "Honest Pricing", d: "Real prices only — no fabricated discounts." },
            { t: "Customer Care", d: "Support by email and contact form, six days a week." },
          ].map((v) => (
            <div key={v.t} className="bg-white rounded-2xl border border-royal/10 p-6">
              <h3 className="font-display text-lg text-midnight">{v.t}</h3>
              <p className="text-sm text-slate mt-2">{v.d}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-6">
          <Link href="/shop" className="btn-gold px-8 py-4 rounded-full text-xs tracking-[0.18em]">EXPLORE THE COLLECTION</Link>
          <Link href="/contact" className="border border-royal/20 px-8 py-4 rounded-full text-xs tracking-[0.18em] text-midnight hover:border-gold transition-colors">CONTACT US</Link>
        </div>
      </div>
    </div>
  );
}
