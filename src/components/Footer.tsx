import Link from "next/link";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/shop?view=new" },
      { label: "Best Sellers", href: "/shop?view=best" },
      { label: "Collections", href: "/shop?view=collections" },
      { label: "Categories", href: "/shop?view=categories" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Order Tracking", href: "/account?tab=orders" },
      { label: "Wishlist", href: "/account?tab=wishlist" },
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Delivery Policy", href: "/contact#policies" },
      { label: "Returns & Refunds Policy", href: "/contact#policies" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Affiliate Program", href: "/affiliate" },
      { label: "Become a Reseller", href: "/reseller" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
    ],
  },
] as const;

function SocialIcon({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="h-9 w-9 grid place-items-center rounded-full border border-gold/25 text-champagne/80 hover:border-gold hover:text-gold hover:bg-gold/10 hover:-translate-y-0.5 transition-all duration-300"
    >
      {children}
    </Link>
  );
}

function CardShell({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      aria-label={label}
      className={`relative rounded-2xl border border-gold/12 bg-gradient-to-b from-[#101014] to-[#0a0a0d] p-5 transition-colors duration-300 hover:border-gold/35 ${className}`}
    >
      <span
        className="absolute inset-x-5 -top-px h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent"
        aria-hidden
      />
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#060608] text-marble/70 mt-14 border-t border-gold/12 overflow-hidden">
      <div className="orb w-72 h-72 bg-gold/8 -top-24 right-1/4" aria-hidden />
      <div className="rule-glow" />

      {/* CTA strip */}
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-8">
        <div className="rounded-2xl bg-[#0e0e11] border border-gold/15 px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl sm:text-2xl text-marble">
              Ready to elevate your <span className="text-gradient-gold">everyday?</span>
            </p>
            <p className="text-xs text-slate mt-1">Free shipping on orders over PKR 5,000.</p>
          </div>
          <Link
            href="/shop"
            className="btn-outline-gold shrink-0 rounded-full px-7 py-3 text-[10px] tracking-[0.24em]"
          >
            SHOP THE COLLECTION
          </Link>
        </div>
      </div>

      {/* Card grid */}
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CardShell>
          <div className="inline-block rounded-lg p-2 border border-gold/15 bg-[#0a0a0c]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/branding/aziz-traders-logo-header.png"
              alt="AZIZ TRADERS"
              width={1105}
              height={378}
              className="h-9 w-auto object-contain"
            />
          </div>
          <p className="font-display text-base text-gold tracking-[0.28em] mt-3.5">AZIZ TRADERS</p>
          <p className="text-[13px] leading-relaxed mt-2 text-slate">
            A premium retail destination for fashion, electronics, jewellery and lifestyle goods.
          </p>
          <div className="gold-rule my-3.5" />
          <a
            href="mailto:support@aziztraders.pk"
            className="block text-[13px] text-champagne hover:text-gold transition-colors"
          >
            support@aziztraders.pk
          </a>
          <p className="text-xs text-slate mt-1">Mon–Sat, 10:00–19:00 PKT</p>
          <div className="flex gap-2.5 mt-4">
            <SocialIcon label="Instagram" href="https://instagram.com">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Facebook" href="https://facebook.com">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="WhatsApp" href="https://wa.me/923000000000">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2a10 10 0 0 0-8.7 15L2 22l5.2-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5 0a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2a.4.4 0 0 0 0-.4c0-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8c1.6.6 2.2.7 3 .6a2.5 2.5 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z" />
              </svg>
            </SocialIcon>
          </div>
        </CardShell>

        {COLUMNS.map((col) => (
          <CardShell key={col.title} label={col.title}>
            <h3 className="font-display text-sm text-gold tracking-[0.22em] mb-3.5 flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(201,168,108,0.8)]"
                aria-hidden
              />
              {col.title}
            </h3>
            <ul className="space-y-1.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-[13px] text-slate hover:text-champagne transition-colors"
                  >
                    <span className="h-px w-0 bg-gold group-hover:w-2.5 transition-all duration-300" aria-hidden />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CardShell>
        ))}
      </div>

      <div className="relative border-t border-gold/12">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate">© {new Date().getFullYear()} AZIZ TRADERS. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate">
            <span className="tracking-[0.14em] uppercase inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden /> Cash on Delivery
            </span>
            <span className="text-gold">·</span>
            <span className="tracking-[0.14em] uppercase">JazzCash (coming soon)</span>
            <span className="text-gold">·</span>
            <span className="tracking-[0.14em] uppercase">Easypaisa (coming soon)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
