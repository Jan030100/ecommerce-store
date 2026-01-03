import { CartItem, CartState } from '@/types';

const CART_STORAGE_KEY = 'shoply_cart';

export function getCart(): CartState {
  if (typeof window === 'undefined') {
    return { items: [], total: 0 };
  }

  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch (error) {
      console.error('Error parsing cart data:', error);
      return { items: [], total: 0 };
    }
  }
  
  return { items: [], total: 0 };
}

export function saveCart(cart: CartState) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
}


export function addToCart(product: CartItem) {
  const cart = getCart();
  

  const existingItemIndex = cart.items.findIndex(item => item.id === product.id);
  
  if (existingItemIndex > -1) {

    cart.items[existingItemIndex].quantity += product.quantity || 1;
  } else {

    cart.items.push({
      ...product,
      quantity: product.quantity || 1
    });
  }
  
  cart.total = calculateTotal(cart.items);
  
  saveCart(cart);
  triggerCartUpdate();
  return cart;
}

export function removeFromCart(productId: number) {
  const cart = getCart();
  
  cart.items = cart.items.filter(item => item.id !== productId);
  
  cart.total = calculateTotal(cart.items);
  
  saveCart(cart);
  triggerCartUpdate();
  return cart;
}

export function updateQuantity(productId: number, quantity: number) {
  const cart = getCart();
  
  const itemIndex = cart.items.findIndex(item => item.id === productId);
  
  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    
    cart.total = calculateTotal(cart.items);
    saveCart(cart);
    triggerCartUpdate();
  }
  
  return cart;
}

export function clearCart() {
  const emptyCart: CartState = { items: [], total: 0 };
  saveCart(emptyCart);
  triggerCartUpdate();
  return emptyCart;
}

export function getCartCount() {
  const cart = getCart();
  let count = 0;
  
  for (const item of cart.items) {
    count += item.quantity;
  }
  
  return count;
}

function calculateTotal(items: CartItem[]): number {
  let total = 0;
  
  for (const item of items) {
    total += item.price * item.quantity;
  }
  
  return parseFloat(total.toFixed(2));
}

function triggerCartUpdate() {
  if (typeof window !== 'undefined') {
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
  }
}
