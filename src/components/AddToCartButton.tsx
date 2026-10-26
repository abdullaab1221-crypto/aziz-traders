"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "./CartProvider";

export default function AddToCartButton({
  product,
  compact = false,
  qty = 1,
  color,
  size,
}: {
  product: Product;
  compact?: boolean;
  qty?: number;
  color?: string;
  size?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (product.stock === 0) {
    return (
      <span className="text-[11px] tracking-[0.16em] text-slate border border-slate/30 rounded-full px-4 py-2">
        OUT OF STOCK
      </span>
    );
  }

  return (
    <button
      onClick={() => {
        add({ productId: product.id, qty, color, size });
        setAdded(true);
        setTimeout(() => setAdded(false), 1400);
      }}
      className={
        compact
          ? `text-[11px] tracking-[0.14em] font-semibold px-4 py-2 rounded-full transition-all ${
              added ? "bg-deepblue text-marble" : "btn-gold"
            }`
          : `w-full py-3.5 rounded-full text-sm tracking-[0.16em] ${added ? "bg-deepblue text-marble" : "btn-gold"}`
      }
      aria-live="polite"
    >
      {added ? "ADDED ✓" : "ADD TO CART"}
    </button>
  );
}
