'use client'

import Image from "next/image";
import { Product } from "@/types";
import { addToCart } from "@/lib/cart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, price, category, description, image } = product;

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    };

    addToCart(cartItem);
    
    alert('Added to cart!');
  };

  const getCategoryColor = () => {
    if (category === 'Electronics') return 'bg-blue-100 text-blue-800';
    if (category === 'Clothing') return 'bg-green-100 text-green-800';
    if (category === 'Shoes') return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 mb-4">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover rounded"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="mb-2">
        <span className={`px-2 py-1 rounded text-xs ${getCategoryColor()}`}>
          {category}
        </span>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">${price.toFixed(2)}</div>
          <button 
            onClick={handleAddToCart}
            className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-black"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}