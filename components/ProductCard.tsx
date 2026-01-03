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

  window.location.reload();};

  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      
      <div className="relative h-48 mb-4">
        <Image src={image} alt={name} fill className="object-cover rounded"/>
      </div>

      <div className="mb-3">
        {category === 'Electronics' && (
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            {category}
          </span>
        )}
        {category === 'Clothing' && (
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            {category}
          </span>
        )}
        {category === 'Shoes' && (
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
            {category}
          </span>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="text-xl font-bold text-gray-800">${price}</div>
      </div>

      <button onClick={handleAddToCart}className="w-full bg-gray-800 hover:bg-black text-white py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
}
