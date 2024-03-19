import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0
}

export default function CartProvider({ children }) {
  const initCart = getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart.items);
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);

  useEffect(() => {
    const totalPrice = sum(cartItems.map(item => item.price));
    setTotalPrice(totalPrice);
    const totalCount = sum(cartItems.map(item => item.quantity));
    setTotalCount(totalCount);

    localStorage.setItem(CART_KEY, JSON.stringify({ items: cartItems, totalPrice, totalCount }));
  }, [cartItems]);

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART
  };
  
  const sum = items => {
    return items.reduce((prevValue, currValue) => prevValue + currValue, 0);
  }

  const removeFromCart = foodId => {
    const filterCartItems = cartItems.filter(item => item.food.id !== foodId);
    setCartItems(filterCartItems);
  }

  const changeQty = (cartItem, newQty) => {
    const { food } = cartItem;

    const changeCartItem = {
      ...cartItem,
      quantity: newQty,
      price: food.price * newQty,
    }

    setCartItems(cartItems.map(item => item.food.id === food.id ? changeCartItem : item));
  }
  
  const addToCart = food => {
    const cartItem = cartItems.find(item => item.food.id === food.id);
    if (cartItem) {
      changeQty(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
    }
  };

  return (
    <CartContext.Provider value={{ cart: { items: cartItems, totalPrice, totalCount }, removeFromCart, changeQty, addToCart }}>
      {children}
    </CartContext.Provider>
  )
};

export const useCart = () => useContext(CartContext);

