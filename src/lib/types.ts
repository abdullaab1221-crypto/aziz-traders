export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountLabel?: string;
  image: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  stock: number;
  badge?: "new" | "bestseller" | "trending" | "premium";
  description: string;
  has360?: boolean;
  has3D?: boolean;
  ratingCount?: number;
};

export type Category = {
  slug: string;
  name: string;
  image: string;
  count: number;
};

export type CartLine = {
  productId: string;
  qty: number;
  color?: string;
  size?: string;
};
