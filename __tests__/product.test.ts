interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

function filterProductsByCategory(
  products: Product[], 
  category: string
): Product[] {
  if (category === 'All') return products;
  return products.filter(product => product.category === category);
}

function filterProductsByPrice(
  products: Product[], 
  maxPrice: number
): Product[] {
  return products.filter(product => product.price <= maxPrice);
}

function searchProducts(
  products: Product[],
  query: string
): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  );
}

const sampleProducts: Product[] = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 2, name: 'T-Shirt', price: 25, category: 'Clothing' },
  { id: 3, name: 'Sneakers', price: 120, category: 'Shoes' },
  { id: 4, name: 'Phone', price: 699, category: 'Electronics' },
  { id: 5, name: 'Headphones', price: 99, category: 'Electronics' },
];

describe('Product Logic', () => {
  test('filters products by category', () => {
    const electronics = filterProductsByCategory(sampleProducts, 'Electronics');
    expect(electronics).toHaveLength(3);
    expect(electronics[0].name).toBe('Laptop');
    expect(electronics[1].name).toBe('Phone');
    expect(electronics[2].name).toBe('Headphones');

    const clothing = filterProductsByCategory(sampleProducts, 'Clothing');
    expect(clothing).toHaveLength(1);
    expect(clothing[0].name).toBe('T-Shirt');
  });

  test('returns all products for All category', () => {
    const allProducts = filterProductsByCategory(sampleProducts, 'All');
    expect(allProducts).toHaveLength(5);
  });

  test('filters products by price', () => {
    const affordable = filterProductsByPrice(sampleProducts, 100);
    expect(affordable).toHaveLength(2);
    expect(affordable[0].name).toBe('T-Shirt');
    expect(affordable[1].name).toBe('Headphones');
  });

  test('returns all products for high max price', () => {
    const expensive = filterProductsByPrice(sampleProducts, 1000);
    expect(expensive).toHaveLength(5);
  });

  test('sorts products by price', () => {
    const sortedByPrice = [...sampleProducts].sort((a, b) => a.price - b.price);
    expect(sortedByPrice[0].price).toBe(25);
    expect(sortedByPrice[1].price).toBe(99);
    expect(sortedByPrice[4].price).toBe(999);
  });

  test('searches products correctly', () => {
    const electronicProducts = searchProducts(sampleProducts, 'electronic');
    expect(electronicProducts).toHaveLength(3);
    
    const shirtProducts = searchProducts(sampleProducts, 'shirt');
    expect(shirtProducts).toHaveLength(1);
    expect(shirtProducts[0].name).toBe('T-Shirt');
    
    const noResults = searchProducts(sampleProducts, 'xyz');
    expect(noResults).toHaveLength(0);
  });
});