'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import SearchBox from '@/components/SearchBox';
import { Product } from "@/types"

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlCategory = searchParams.get('category');
  const urlPrice = searchParams.get('price');
  const urlSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    urlCategory ? urlCategory.split(',') : ['All']
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectdPrice, setSelectedPrice] = useState(urlPrice || 'All');
  const [searchQuery, setSearchQuery] = useState(urlSearch);

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

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory.length > 0 && selectedCategory[0] !== 'All') {
      params.set('category', selectedCategory.join(','));
    }

    if (selectdPrice !== 'All') {
      params.set('price', selectdPrice);
    }

    if (searchQuery) {
      params.set('search', searchQuery);
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.replace(newUrl, { scroll: false });
  }, [selectedCategory, selectdPrice, searchQuery, router]);

  const handleCategoryClick = (category: string) => {
    if (category === 'All') {
      setSelectedCategory(['All']);
    } else {
      const newCategories = selectedCategory.filter(c => c !== 'All');

      if (newCategories.includes(category)) {
        const updated = newCategories.filter(c => c !== category);
        setSelectedCategory(updated.length > 0 ? updated : ['All']);
      } else {
        setSelectedCategory([...newCategories, category]);
      }
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch =
      selectedCategory.includes('All') ||
      selectedCategory.includes(product.category);

    let priceMatch = true;
    if (selectdPrice === 'Under50') {
      priceMatch = product.price < 50;
    } else if (selectdPrice === '50to100') {
      priceMatch = product.price >= 50 && product.price <= 100;
    } else if (selectdPrice === 'Over100') {
      priceMatch = product.price > 100;
    }

    const searchMatch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery);

    return categoryMatch && priceMatch && searchMatch;
  });

  const resetAllFilters = () => {
    setSelectedCategory(['All']);
    setSelectedPrice('All'); 
    setSearchQuery('');
  };

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
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">Products</h1>

          <button
            onClick={() => {
              const currentUrl = window.location.href;
              navigator.clipboard.writeText(currentUrl);
              alert('Link copied to clipboard!');
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Share Results
          </button>
        </div>

        <div className="mb-6 max-w-md">
          <SearchBox onSearch={handleSearch} initialValue={searchQuery} />
        </div>

        <p className="text-gray-600 mb-4">
          {filteredProducts.length} products available
          {selectedCategory[0] !== 'All' && ` (${selectedCategory.join(', ')})`}
          {searchQuery && ` - searching: "${searchQuery}"`}
        </p>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => handleCategoryClick('All')}
            className={`px-3 py-1 text-sm rounded ${
              selectedCategory.includes('All') ? 'bg-gray-800 text-white' : 'bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleCategoryClick('Electronics')}
            className={`px-3 py-1 text-sm rounded ${
              selectedCategory.includes('Electronics') ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Electronics {selectedCategory.includes('Electronics') && '✓'}
          </button>
          <button
            onClick={() => handleCategoryClick('Clothing')}
            className={`px-3 py-1 text-sm rounded ${
              selectedCategory.includes('Clothing') ? 'bg-green-600 text-white' : 'bg-gray-200'
            }`}
          >
            Clothing {selectedCategory.includes('Clothing') && '✓'}
          </button>
          <button
            onClick={() => handleCategoryClick('Shoes')}
            className={`px-3 py-1 text-sm rounded ${
              selectedCategory.includes('Shoes') ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
          >
            Shoes {selectedCategory.includes('Shoes') && '✓'}
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedPrice('All')}
            className={`px-3 py-1 text-sm rounded ${
              selectdPrice === 'All' ? 'bg-gray-800 text-white' : 'bg-gray-200'
            }`}
          >
            All Prices
          </button>
          <button
            onClick={() => setSelectedPrice('Under50')}
            className={`px-3 py-1 text-sm rounded ${
              selectdPrice === 'Under50' ? 'bg-yellow-600 text-white' : 'bg-gray-200'
            }`}
          >
            Under $50
          </button>
          <button
            onClick={() => setSelectedPrice('50to100')}
            className={`px-3 py-1 text-sm rounded ${
              selectdPrice === '50to100' ? 'bg-orange-600 text-white' : 'bg-gray-200'
            }`}
          >
            $50 - $100
          </button>

          <button
            onClick={() => setSelectedPrice('Over100')}
            className={`px-3 py-1 text-sm rounded ${
              selectdPrice === 'Over100' ? 'bg-red-600 text-white' : 'bg-gray-200'
            }`}
          >
            Over $100
          </button>
        </div>

        {selectedCategory[0] !== 'All' && (
          <button
            onClick={() => setSelectedCategory(['All'])}
            className="text-sm text-blue-600 hover:text-blue-800 mb-4"
          >
            Clear category filter
          </button>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found.</p>
          <button
            onClick={resetAllFilters}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-black"
          >
            Reset All Filters
          </button>
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
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory.includes(category)
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {category} {selectedCategory.includes(category) && '✓'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
