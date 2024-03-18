import React from 'react';
import { useCart } from '../../hooks/useCart';
import classes from './cartpage.module.css';

export default function CartPage() {
  const { cart } = useCart();
  return (
    <div>
      {cart.items.length}
    </div>
  )
}
