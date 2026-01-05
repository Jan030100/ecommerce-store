import {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
  getCartCount,
} from '../lib/cart';
import type { CartItem } from '../types';

describe('Cart Functions', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  beforeAll(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent = jest.fn();
    }
  });

  describe('addToCart', () => {
    test('adds new item to empty cart', () => {
      const item: CartItem = {
        id: 1,
        name: 'Test Product',
        price: 100,
        image: '/test.jpg',
        quantity: 1,
      };

      const cart = addToCart(item);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]).toMatchObject({
        id: 1,
        name: 'Test Product',
        price: 100,
        quantity: 1,
      });
      expect(cart.total).toBe(100);
    });

    test('increments quantity for existing product', () => {
      const item: CartItem = {
        id: 1,
        name: 'Test Product',
        price: 100,
        image: '/test.jpg',
        quantity: 1,
      };

      addToCart(item);
      const cart = addToCart(item);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(2);
      expect(cart.total).toBe(200);
    });
  });

  describe('removeFromCart', () => {
    test('removes item from cart', () => {
      const item: CartItem = {
        id: 1,
        name: 'Test Product',
        price: 100,
        image: '/test.jpg',
        quantity: 1,
      };

      addToCart(item);
      const cart = removeFromCart(1);

      expect(cart.items).toHaveLength(0);
      expect(cart.total).toBe(0);
    });

    test('does nothing for non-existent product', () => {
      const cart = removeFromCart(999);
      
      expect(cart.items).toHaveLength(0);
      expect(cart.total).toBe(0);
    });
  });

  describe('clearCart', () => {
    test('empties entire cart', () => {
      addToCart({
        id: 1,
        name: 'Product 1',
        price: 100,
        image: '/test1.jpg',
        quantity: 1,
      });
      
      addToCart({
        id: 2,
        name: 'Product 2',
        price: 50,
        image: '/test2.jpg',
        quantity: 2,
      });

      const cart = clearCart();

      expect(cart.items).toHaveLength(0);
      expect(cart.total).toBe(0);
    });
  });

  describe('getCartCount', () => {
    test('calculates total item count', () => {
      addToCart({
        id: 1,
        name: 'Product 1',
        price: 100,
        image: '/test1.jpg',
        quantity: 2,
      });
      
      addToCart({
        id: 2,
        name: 'Product 2',
        price: 50,
        image: '/test2.jpg',
        quantity: 3,
      });

      const count = getCartCount();
      
      expect(count).toBe(5);
    });

    test('returns zero for empty cart', () => {
      const count = getCartCount();
      
      expect(count).toBe(0);
    });
  });
});