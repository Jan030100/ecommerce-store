import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Product } from "@/types";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:3000/api/products");

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return data.data as Product[];
  } catch (err) {
    console.log("Error loading products:", err);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  if (products.length === 0) {
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
        <h1 className="text-2xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600">
          {products.length} products available
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from(
            new Set(products.map((p) => p.category))
          ).map((category) => (
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
