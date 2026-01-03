'use client'

import { useState, useEffect } from 'react';
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Product } from "@/types"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.data || []);
      } catch (err) {
        console.log('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Products</h1>
        <p className="text-gray-600 mb-4">
          {filteredProducts.length} products available
        </p>
        
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1 text-sm rounded ${selectedCategory === 'All' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button 
            onClick={() => setSelectedCategory('Electronics')}
            className={`px-3 py-1 text-sm rounded ${selectedCategory === 'Electronics' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Electronics
          </button>
          <button 
            onClick={() => setSelectedCategory('Clothing')}
            className={`px-3 py-1 text-sm rounded ${selectedCategory === 'Clothing' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            Clothing
          </button>
          <button 
            onClick={() => setSelectedCategory('Shoes')}
            className={`px-3 py-1 text-sm rounded ${selectedCategory === 'Shoes' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            Shoes
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product: Product) => ( 
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-medium mb-4">All Categories</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(products.map(p => p.category))).map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
