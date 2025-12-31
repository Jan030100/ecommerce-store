export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    total: number;
    itemCount: number;
}

export type Category = 'All' | 'Electronics' | 'Clothing' | 'Shoes' | 'Books';

export type PriceRange = 'All' | 'Under50' | '50to100' | 'Over100';

export interface FilterState {
     category: Category;
  priceRange: PriceRange;
  searchQuery: string;
}