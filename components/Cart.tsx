'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { CartItem, CartState } from '@/types';
import { getCart, removeFromCart, updateQuantity, clearCart } from '@/lib/cart';

interface CartProps {
  onClose: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const [cart, setCart] = useState<CartState>({ items: [], total: 0 });

  useEffect(() => {
    const loadCart = () => {
      setCart(getCart());
    };
    
    loadCart();
    
    window.addEventListener('cartUpdated', loadCart);
    
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('cartUpdated', loadCart);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemove(productId);
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  const handleClearCart = () => {
    if (cart.items.length === 0) return;
    
    const confirmClear = window.confirm('Clear all items from cart?');
    if (confirmClear) {
      clearCart();
    }
  };

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
      <div 
        className="flex-1" 
        onClick={onClose}
      ></div>
      
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.items.length === 0 ? (
            <div className="text-center py-10">
              <div className="flex justify-center mb-4">
                <div className="relative w-16 h-16">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-8 border-2 border-gray-300 rounded-t-lg"></div>
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-10 h-8 border-l-2 border-r-2 border-b-2 border-gray-300 rounded-b-lg"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-300"></div>
                </div>
              </div>
              <p className="text-gray-500 mb-2">Your cart is empty</p>
              <p className="text-gray-400 text-sm mb-4">Add items to get started</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-800 text-white rounded text-sm hover:bg-black"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div>
              {cart.items.map((item) => (
                <div key={item.id} className="border-b py-4 flex gap-3">
                  <div className="w-16 h-16 relative bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-gray-200 rounded text-sm hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-gray-200 rounded text-sm hover:bg-gray-300"
                      >
                        +
                      </button>
                      
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 text-sm ml-auto hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <div>
                <div className="font-bold">Total ({totalItems} items)</div>
                <div className="text-gray-600 text-sm">Shipping calculated at checkout</div>
              </div>
              <div className="text-xl font-bold">${cart.total.toFixed(2)}</div>
            </div>
            
            <div className="space-y-2">
              <button
                className="w-full bg-purple-600 text-white py-3 rounded font-medium hover:bg-purple-700"
              >
                Checkout
              </button>
              
              <button
                onClick={handleClearCart}
                className="w-full border border-gray-300 py-2 rounded text-gray-700 hover:bg-gray-50"
              >
                Clear All Items
              </button>
              
              <button
                onClick={onClose}
                className="w-full py-2 text-gray-600 hover:text-gray-800"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}