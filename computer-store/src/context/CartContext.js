/* ============================================================
   CartContext.js — Global Cart State
   Uses React Context API to share cart data across all pages.
   Any page or component can call useCart() to get cart data.
   ============================================================ */

"use client";

import { createContext, useContext, useState } from "react";

/* Create the context — this is the shared "container" */
const CartContext = createContext(null);

/* CartProvider wraps the whole app (in layout.js)
   so every page has access to the cart */
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); /* Array of laptop objects + qty */

  /* addToCart — adds a laptop or increases qty if already in cart */
  function addToCart(laptop) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === laptop.id);
      if (existing) {
        /* If already in cart, just increase quantity by 1 */
        return prev.map((item) =>
          item.id === laptop.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      /* If new item, add it with qty = 1 */
      return [...prev, { ...laptop, qty: 1 }];
    });
  }

  /* removeFromCart — removes a laptop by its ID */
  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  /* updateQty — change quantity of a cart item
     if qty drops below 1, remove the item completely */
  function updateQty(id, qty) {
    if (qty < 1) return removeFromCart(id);
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  /* totalItems — total count of all items (used for cart badge in Navbar) */
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  /* totalPrice — total price of all items in cart */
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    /* Provide all cart data and functions to every child component */
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

/* useCart — custom hook, call this in any component to access cart */
export function useCart() {
  return useContext(CartContext);
}
