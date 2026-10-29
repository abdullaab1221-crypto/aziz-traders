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
      { label: "Shipping Policy", href: "/contact#policies" },
      { label: "Returns & Refunds", href: "/contact#policies" },
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
      className="h-8 w-8 grid place-items-center rounded-full border border-gold/25 text-champagne/80 hover:border-gold hover:text-gold hover:bg-gold/10 hover:-translate-y-0.5 transition-all duration-300"
    >
      {children}
    </Link>
  );
}

function CardShell({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div
      aria-label={label}
      className="relative rounded-xl border border-gold/12 bg-gradient-to-b from-[#101014] to-[#0a0a0d] px-4 py-3.5 transition-colors duration-300 hover:border-gold/35"
    >
      <span
        className="absolute inset-x-4 -top-px h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent"
        aria-hidden
      />
      {children}
    </div>
  );
}

function CardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 mb-2.5">
      <span className="h-3 w-px bg-gradient-to-b from-gold to-transparent" aria-hidden />
      <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold">{children}</span>
    </h3>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#060608] text-marble/70 mt-12 border-t border-gold/12 overflow-hidden">
      <div className="orb w-72 h-72 bg-gold/8 -top-24 right-1/4" aria-hidden />
      <div className="rule-glow" />

      {/* CTA strip */}
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-6">
        <div className="rounded-xl bg-[#0e0e11] border border-gold/15 px-5 sm:px-7 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-display text-lg sm:text-xl text-marble">
            Ready to elevate your <span className="text-gradient-gold">everyday?</span>
          </p>
          <Link
            href="/shop"
            className="btn-outline-gold shrink-0 rounded-full px-6 py-2.5 text-[10px] tracking-[0.24em]"
          >
            SHOP THE COLLECTION
          </Link>
        </div>
      </div>

      {/* Card grid */}
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <CardShell>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/branding/aziz-traders-logo-header.png"
            alt="AZIZ TRADERS"
            width={1105}
            height={378}
            className="h-9 w-auto object-contain"
          />
          <p className="font-display text-sm text-gold tracking-[0.28em] mt-2.5">AZIZ TRADERS</p>
          <a
            href="mailto:support@aziztraders.pk"
            className="block text-[13px] text-champagne hover:text-gold transition-colors mt-2"
          >
            support@aziztraders.pk
          </a>
          <p className="text-[11px] text-slate mt-0.5">Mon–Sat, 10:00–19:00 PKT</p>
          <div className="flex gap-2 mt-3">
            <SocialIcon label="Instagram" href="https://instagram.com">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Facebook" href="https://facebook.com">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="WhatsApp" href="https://wa.me/923000000000">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2a10 10 0 0 0-8.7 15L2 22l5.2-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5 0a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2a.4.4 0 0 0 0-.4c0-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8c1.6.6 2.2.7 3 .6a2.5 2.5 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z" />
              </svg>
            </SocialIcon>
          </div>
        </CardShell>

        {COLUMNS.map((col) => (
          <CardShell key={col.title} label={col.title}>
            <CardHeading>{col.title}</CardHeading>
            <ul className="space-y-1">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-[13px] text-slate hover:text-champagne transition-colors"
                  >
                    <span className="h-px w-0 bg-gold group-hover:w-2 transition-all duration-300" aria-hidden />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CardShell>
        ))}
      </div>

      <div className="relative border-t border-gold/12">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-slate">© {new Date().getFullYear()} AZIZ TRADERS. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-slate">
            <span className="tracking-[0.14em] uppercase inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden /> Cash on Delivery
            </span>
            <span className="text-gold">·</span>
            <span className="tracking-[0.14em] uppercase">JazzCash (soon)</span>
            <span className="text-gold">·</span>
            <span className="tracking-[0.14em] uppercase">Easypaisa (soon)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
