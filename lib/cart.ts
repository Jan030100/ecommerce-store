import { CartItem,CartState } from "@/types";

const CART_STORAGE_KEY = 'shoply_cart';

export function getCart(): CartState {
    if (typeof window === 'undefined') {
        return {items: [], total: 0};
    }

    const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
    return JSON.parse(stored);
  }
  
  return { items: [], total: 0 };
}
export function saveCart (cart: CartState){
      if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

}

export function addToCart(product: CartItem) {
  const cart = getCart();
    const existingIndex = cart.items.findIndex(item => item.id === product.id);
  
  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += product.quantity || 1;
  } else {
    cart.items.push({
      ...product,
      quantity: product.quantity || 1
    });
  }
   cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

   saveCart(cart);
   return cart;
}

export function removeFromCart(productId: number) {
  const cart = getCart();
  cart.items = cart.items.filter(item => item.id !== productId);

   cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    saveCart(cart);
  return cart;
}

export function updateQuantity(productId: number, quantity: number) {
  const cart = getCart();
  const itemIndex = cart.items.findIndex(item => item.id === productId);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    saveCart(cart);
  }
    return cart;

}

export function clearCart() {
  const emptyCart: CartState = { items: [], total: 0 };
  saveCart(emptyCart);
  return emptyCart;
}
