import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="marble-surface min-h-screen">
      <div className="navy-surface">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h1 className="font-display text-4xl md:text-5xl text-marble">Privacy Policy</h1>
          <p className="text-slate mt-3 text-sm">Last updated: October 2026</p>
        </div>
      </div>
      <article className="mx-auto max-w-3xl px-4 py-12 space-y-6 text-slate leading-relaxed text-sm">
        <p>This policy describes how AZIZ TRADERS handles information on this website. This pre-launch preview stores only a local shopping cart in your browser; no accounts exist yet.</p>
        <h2 className="font-display text-xl text-midnight pt-3">Information We Collect</h2>
        <p>When the store launches: account details you provide (name, email, phone, addresses), order records, and messages you send to support. Payment card data is never stored on our servers — gateways handle it under their own PCI-compliant flows.</p>
        <h2 className="font-display text-xl text-midnight pt-3">How We Use It</h2>
        <p>To fulfil orders, provide delivery updates, respond to support requests, prevent fraud, and comply with legal obligations. We do not sell personal data.</p>
        <h2 className="font-display text-xl text-midnight pt-3">Cookies & Local Storage</h2>
        <p>The cart is kept in your browser&apos;s local storage. Session cookies will be used for sign-in once accounts launch, with secure and httpOnly attributes.</p>
        <h2 className="font-display text-xl text-midnight pt-3">Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data by contacting support@aziztraders.pk.</p>
        <h2 className="font-display text-xl text-midnight pt-3">Contact</h2>
        <p>Questions: support@aziztraders.pk.</p>
      </article>
    </div>
  );
}
