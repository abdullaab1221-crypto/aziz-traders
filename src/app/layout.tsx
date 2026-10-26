import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { WishlistProvider } from "@/components/WishlistProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const serifDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif-display",
  display: "swap",
});

const interfaceSans = Inter({
  subsets: ["latin"],
  variable: "--font-interface",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AZIZ TRADERS — Exceptional Finds. Elevated Living.",
    template: "%s | AZIZ TRADERS",
  },
  description:
    "Discover a world of remarkable products — fashion, footwear, jewellery, electronics and lifestyle goods, curated for quality and style.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    siteName: "AZIZ TRADERS",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serifDisplay.variable} ${interfaceSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
