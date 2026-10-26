import Link from "next/link";

export default function NotFound() {
  return (
    <div className="navy-surface min-h-[70vh] grid place-items-center px-4">
      <div className="text-center py-24">
        <p className="text-[11px] tracking-[0.4em] uppercase text-gold">Error 404</p>
        <h1 className="font-display text-5xl md:text-7xl text-marble mt-5">
          Page <span className="gold-text">Not Found</span>
        </h1>
        <p className="text-marble/70 mt-5 max-w-md mx-auto">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="flex gap-4 justify-center mt-9 flex-wrap">
          <Link href="/" className="btn-gold px-8 py-4 rounded-full text-xs tracking-[0.2em]">BACK HOME</Link>
          <Link href="/shop" className="btn-outline-gold px-8 py-4 rounded-full text-xs tracking-[0.2em]">BROWSE SHOP</Link>
        </div>
      </div>
    </div>
  );
}
