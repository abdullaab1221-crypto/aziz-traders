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
      { label: "Shipping & Returns", href: "/contact#policies" },
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
];

export default function Footer() {
  return (
    <footer className="navy-surface text-marble/80 mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="inline-block bg-marble rounded-xl p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/branding/aziz-traders-logo-header.png"
              alt="AZIZ TRADERS"
              width={1105}
              height={378}
              className="h-14 w-auto object-contain"
            />
          </div>
          <p className="font-display text-2xl text-warmgold tracking-[0.22em] mt-5">AZIZ TRADERS</p>
          <p className="text-sm leading-relaxed mt-3 max-w-sm text-marble/70">
            A premium retail destination for fashion, electronics, jewellery and lifestyle goods —
            curated for quality, style and everyday excellence.
          </p>
          <div className="gold-rule my-6 max-w-xs" />
          <p className="text-sm space-y-1">
            <span className="block text-champagne">support@aziztraders.pk</span>
            <span className="block text-slate text-xs mt-1">
              Business hours: Monday–Saturday, 10:00–19:00 PKT
            </span>
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="font-display text-lg text-champagne tracking-[0.16em] mb-4">{col.title}</h3>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-marble/70 hover:text-champagne transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t hairline">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate">© {new Date().getFullYear()} AZIZ TRADERS. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-marble/60">
            <span className="tracking-[0.14em] uppercase">Cash on Delivery</span>
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
