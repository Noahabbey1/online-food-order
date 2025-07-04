import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
  const stored = localStorage.getItem('cartItems');
  return stored ? JSON.parse(stored) : [];
}); // when you use null, it empties the cart upon refresh but this stores it to a local variable

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(stored);
  }, []);


  const addToCart = (dishObj) => {
    const existing = cartItems.find(item => item.id === dishObj.id);
    let updatedCart;
    if (existing) {
      updatedCart = cartItems.map(item =>
        item.id === dishObj.id
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...dishObj, quantity: 1 }];
    }

    setCartItems(updatedCart);
  };

  const removeFromCart = (itemId) => {
  const updated = cartItems.map(item =>
    item.id === itemId
      ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
      : item
  );
  setCartItems(updated);
};

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart,removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};