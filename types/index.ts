export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export type Category = 'All' | 'Electronics' | 'Clothing' | 'Shoes';

export type PriceRange = 'All' | 'Under50' | '50to100' | 'Over100';

export interface FilterState {
    category: Category;
  priceRange: PriceRange;
}