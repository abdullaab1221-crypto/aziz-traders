"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?view=categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <path d="M12 20s-7-4.6-9.3-9C1 8 2.7 4.5 6.2 4.5c2 0 3.4 1.1 4.3 2.6.9-1.5 2.3-2.6 4.3-2.6 3.5 0 5.2 3.5 3.5 6.5C19 15.4 12 20 12 20Z" strokeLinejoin="round" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  function isActive(href: string): boolean {
    const path = href.split("?")[0];
    if (path === "/") return pathname === "/";
    if (!pathname.startsWith(path)) return false;
    const query = href.includes("?") ? href.slice(href.indexOf("?")) : "";
    return query ? href.includes(query) : true;
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    if (q) window.location.href = `/shop?q=${encodeURIComponent(q)}`;
  }

  const iconBtn =
    "relative p-2 text-midnight hover:text-gold transition-colors";
  const navLink = (href: string, label: string) => (
    <Link
      key={label}
      href={href}
      aria-current={isActive(href) ? "page" : undefined}
      className={`relative py-1 text-[13px] tracking-[0.16em] uppercase transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-gold after:transition-all ${
        isActive(href)
          ? "text-midnight font-semibold after:w-full"
          : "text-royal/80 hover:text-midnight after:w-0 hover:after:w-full"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="marble-surface border-b border-royal/10 shadow-[0_1px_0_rgba(198,161,91,0.35)]">
        <div className="mx-auto max-w-7xl px-4 h-20 flex items-center justify-between gap-4 lg:gap-8">
          
<Link
  href="/"
  aria-label="AZIZ TRADERS home"
  className="shrink-0 flex items-center"
>
  <img
    src="/branding/aziz-traders-logo-header.png"
    alt="AZIZ TRADERS"
    width={1105}
    height={378}
    style={{
      display: "block",
      width: "224px",
      height: "auto",
    }}
  />
</Link>


          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {NAV.map((item) => navLink(item.href, item.label))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label={searchOpen ? "Close search" : "Search"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
              className={iconBtn}
            >
              <SearchIcon />
            </button>

            <Link href="/account" aria-label="Account" className={`${iconBtn} hidden sm:inline-flex`}>
              <UserIcon />
            </Link>
            <Link
              href="/account?tab=wishlist"
              aria-label={`Wishlist, ${wishCount} items`}
              className={`${iconBtn} hidden sm:inline-flex`}
            >
              <HeartIcon />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-midnight text-champagne text-[10px] font-bold h-5 min-w-5 px-1 rounded-full grid place-items-center">
                  {wishCount}
                </span>
              )}
            </Link>
            <Link href="/cart" aria-label={`Shopping cart, ${count} items`} className={iconBtn}>
              <BagIcon />
              <span className="absolute -top-1 -right-1 bg-gold text-midnight text-[10px] font-bold h-5 min-w-5 px-1 rounded-full grid place-items-center">
                {count}
              </span>
            </Link>

            <button
              className="lg:hidden p-2 text-midnight"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                {open ? (
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-royal/10 bg-white/70">
            <form onSubmit={submitSearch} className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
              <span className="text-royal"><SearchIcon /></span>
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                aria-label="Search products"
                className="flex-1 bg-transparent text-sm text-midnight placeholder:text-slate focus:outline-none py-1.5"
              />
              <button type="submit" className="btn-gold px-5 py-2 rounded-full text-[11px] tracking-[0.18em]">
                SEARCH
              </button>
            </form>
          </div>
        )}

        {open && (
          <div className="lg:hidden border-t border-royal/10 bg-white/80">
            <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1" aria-label="Mobile">
              {NAV.map((item) => navLink(item.href, item.label))}

              <div className="flex items-center gap-5 pt-4 mt-2 border-t border-royal/10">
                <Link href="/account" className="inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase text-royal/85 hover:text-midnight py-1">
                  <UserIcon /> Account
                </Link>
                <Link href="/account?tab=wishlist" className="inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase text-royal/85 hover:text-midnight py-1">
                  <HeartIcon /> Wishlist{wishCount > 0 ? ` (${wishCount})` : ""}
                </Link>
              </div>

              <form onSubmit={submitSearch} className="mt-4 flex items-center gap-2 border border-royal/15 rounded-full px-4 py-2 bg-white">
                <span className="text-royal"><SearchIcon /></span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products"
                  aria-label="Search products"
                  className="bg-transparent text-sm text-midnight placeholder:text-slate focus:outline-none w-full"
                />
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
