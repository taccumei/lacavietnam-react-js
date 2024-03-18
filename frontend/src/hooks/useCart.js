import React, { createContext, useContext, useEffect, useState } from 'react'
import { sample_foods } from '../data';

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  
  const [cartItems, setCartItems] = useState(sample_foods.slice(1, 4).map(food => ({ food, quantity: 1, price: food.price })));
  console.log(cartItems);
  const [totalPrice, setTotalPrice] = useState(40);
  const [totalCount, setTotalCount] = useState(3);

  useEffect(() => {
    const totalPrice = sum(cartItems.map(item => item.price));
    setTotalPrice(totalPrice);
    const totalCount = sum(cartItems.map(item => item.quantity));
    setTotalCount(totalCount);
  }, [cartItems])
  
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

