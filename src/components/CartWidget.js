import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'phosphor-react';

export const CartWidget = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [key, setKey] = useState(0); // New key state

  useEffect(() => {
    // Get the cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Calculate the total number of items in the cart
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Update the cart item count
    setCartItemCount(itemCount);
  }, [key]); // Trigger effect when key changes

  const addToCart = (accessory, quantity) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const newItem = {
      accessory: accessory,
      quantity: quantity
    };
    cartItems.push(newItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCartItemCount(cartItemCount + quantity); // Update the cart item count
    setKey(prevKey => prevKey + 1); // Increment the key to trigger re-render
    console.log(`Added ${quantity} ${accessory.name}(s) to cart.`);
  };

  return (
    <div className='cartWidget'>
      <p>{cartItemCount}</p>
      <ShoppingCart size={32} color='green' className='cartContainer' />
    </div>
  );
};
