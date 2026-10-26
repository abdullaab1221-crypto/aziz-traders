import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "./shop-client";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse the AZIZ TRADERS catalog — fashion, electronics, jewellery and more.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="marble-surface min-h-screen" />}>
      <ShopClient />
    </Suspense>
  );
}
