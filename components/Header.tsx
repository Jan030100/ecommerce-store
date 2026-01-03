'use client'

import { useState, useEffect } from 'react';
import { getCartCount } from '@/lib/cart';
import Cart from './Cart';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };
    
    updateCartCount();
    
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <a href="/" className="text-2xl font-bold text-purple-700">
                Shoply
              </a>
              <span className="text-xs text-gray-500 ml-2 hidden sm:inline">Demo</span>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="/" 
                className="text-gray-700 hover:text-purple-600 text-sm font-medium"
              >
                Products
              </a>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-purple-600 relative"
              >
                <div className="relative">
                  <div className="w-6 h-5">
                    <div className="w-full h-3 border border-gray-400 rounded-t-lg"></div>
                    <div className="w-5 h-3 border-l border-r border-b border-gray-400 rounded-b-lg mx-auto"></div>
                  </div>
                  
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                
                <span className="font-medium hidden sm:inline">Cart</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </>
  );
}