'use client'

import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, price, category, description, image } = product;

  const handleAddToCart = () => {
    console.log('Added to cart:', product);
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col h-full">
            <div className="relative h-48 w-full bg-gray-100">
              <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={id <= 2}
        />
        <div className="absolute top-2 left-2">
            <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                {category}
            </span>
        </div>
                 
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-1">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {description}
                    </p>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                   ${price.toFixed(2)}
                            </div>
                                      <div className="text-xs text-gray-500 mt-1">
                {getPriceRangeLabel(price)}
              </div>
                        </div>

                   <button
        onClick={handleAddToCart}
        className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md"
        aria-label={`Add ${name} to cart`}
      >
        Add to Cart
      </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getPriceRangeLabel(price: number): string {
  if (price < 50) return 'Under $50';
  if (price <= 100) return '$50 - $100';
  return 'Over $100';
}