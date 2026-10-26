"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine } from "@/lib/types";

type CartCtx = {
  lines: CartLine[];
  add: (line: CartLine) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "aziz-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const value = useMemo<CartCtx>(() => {
    return {
      lines,
      add(line) {
        setLines((prev) => {
          const hit = prev.find((l) => l.productId === line.productId);
          if (hit) {
            return prev.map((l) =>
              l.productId === line.productId ? { ...l, qty: l.qty + line.qty } : l
            );
          }
          return [...prev, line];
        });
      },
      setQty(productId, qty) {
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.productId !== productId)
            : prev.map((l) => (l.productId === productId ? { ...l, qty } : l))
        );
      },
      remove(productId) {
        setLines((prev) => prev.filter((l) => l.productId !== productId));
      },
      clear() {
        setLines([]);
      },
      count: lines.reduce((n, l) => n + l.qty, 0),
    };
  }, [lines]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
