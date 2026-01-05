function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

function calculateTotal(items: Array<{ price: number; quantity: number }>): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function isValidCategory(category: string): boolean {
  const validCategories = ['Electronics', 'Clothing', 'Shoes'];
  return validCategories.includes(category);
}

describe('Utility Functions', () => {
  test('formats price correctly', () => {
    expect(formatPrice(100)).toBe('$100.00');
    expect(formatPrice(49.99)).toBe('$49.99');
    expect(formatPrice(0)).toBe('$0.00');
  });

  test('calculates total correctly', () => {
    const items = [
      { price: 100, quantity: 1 },
      { price: 50, quantity: 2 },
      { price: 25, quantity: 4 },
    ];
    
    const total = calculateTotal(items);
    expect(total).toBe(300);
  });

  test('returns zero for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });

  test('validates categories correctly', () => {
    expect(isValidCategory('Electronics')).toBe(true);
    expect(isValidCategory('Clothing')).toBe(true);
    expect(isValidCategory('Shoes')).toBe(true);
    expect(isValidCategory('Invalid')).toBe(false);
  });
});