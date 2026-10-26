"use client";

import { useWishlist } from "./WishlistProvider";

type Props = {
  productId: string;
  name: string;
  size?: "sm" | "lg";
};

export default function WishlistButton({ productId, name, size = "sm" }: Props) {
  const { isWished, toggle } = useWishlist();
  const active = isWished(productId);
  const dim = size === "lg" ? "h-12 w-12" : "h-9 w-9";
  const icon = size === "lg" ? 19 : 15;

  return (
    <button
      type="button"
      aria-label={active ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
      aria-pressed={active}
      onClick={() => toggle(productId)}
      className={`shrink-0 ${dim} grid place-items-center rounded-full border transition-colors ${
        active
          ? "border-gold text-gold bg-warmgold/30"
          : "border-royal/15 text-slate hover:text-gold hover:border-gold"
      }`}
    >
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M12 20s-7-4.6-9.3-9C1 8 2.7 4.5 6.2 4.5c2 0 3.4 1.1 4.3 2.6.9-1.5 2.3-2.6 4.3-2.6 3.5 0 5.2 3.5 3.5 6.5C19 15.4 12 20 12 20Z" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
