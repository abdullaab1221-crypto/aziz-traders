import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="marble-surface min-h-screen">
      <div className="navy-surface">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h1 className="font-display text-4xl md:text-5xl text-marble">Terms of Service</h1>
          <p className="text-slate mt-3 text-sm">Last updated: October 2026</p>
        </div>
      </div>
      <article className="mx-auto max-w-3xl px-4 py-12 space-y-6 text-slate leading-relaxed text-sm">
        <p>These terms govern your use of the AZIZ TRADERS website. This is a pre-launch preview: no real orders or payments are processed yet.</p>
        <h2 className="font-display text-xl text-midnight pt-3">Products & Pricing</h2>
        <p>Product information, prices and availability are confirmed at checkout on the server. Displayed prices may change until an order is confirmed.</p>
        <h2 className="font-display text-xl text-midnight pt-3">Orders</h2>
        <p>An order is accepted only after server-side validation of items, stock, totals and payment status. We reserve the right to cancel orders affected by stock errors or pricing mistakes.</p>
        <h2 className="font-display text-xl text-midnight pt-3">Shipping & Returns</h2>
        <p>Delivery estimates are provided at checkout. Returns and exchanges follow the eligibility rules published on the contact page at launch.</p>
        <h2 className="font-display text-xl text-midnight pt-3">Acceptable Use</h2>
        <p>You agree not to abuse the site, attempt unauthorized access, or place fraudulent orders.</p>
        <h2 className="font-display text-xl text-midnight pt-3">Contact</h2>
        <p>Questions: support@aziztraders.pk.</p>
      </article>
    </div>
  );
}
