import React, { useEffect, useState } from 'react';

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedItems) {
      setCartItems(storedItems);
    }
  }, []);

  const removeFromCart = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  // Calculate the total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.accessory.price * item.quantity,
    0
  );

  const emptyCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const checkout = () => {
    // Perform the checkout logic here
    // e.g., redirect to a payment page or show a success message
    console.log('Checkout');
  };

  return (
    <div className="container">
      <h2>Cart</h2>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p> 
      <button onClick={checkout}>Checkout</button>
      <button onClick={emptyCart}>Empty Cart</button>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={item.accessory.image} className="img-fluid" alt={item.accessory.name} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.accessory.name}</h5>
                  <p className="card-text">{item.accessory.description}</p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Price:</strong> ${item.accessory.price}</li>
                    <li className="list-group-item"><strong>Quantity:</strong> {item.quantity}</li>
                  </ul>
                  <button className="btn btn-danger" onClick={() => removeFromCart(index)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};



