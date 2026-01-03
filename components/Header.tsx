'use client'

import { useEffect, useState } from 'react';
import { getCart } from '@/lib/cart';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = getCart();
    const total = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, []);

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">Shoply</h1>
          
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm">Home</a>
            
            <div className="flex items-center gap-1">
              <span className="text-sm">Cart</span>
              {cartCount > 0 && (
                <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
