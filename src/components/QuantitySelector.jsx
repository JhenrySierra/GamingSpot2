import React, { useState } from 'react';

const QuantitySelector = ({ addToCart, accessory }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart(accessory, quantity);
    };

    return (
        <div className='quantitySelector'>
            <button onClick={handleDecrease} className='quantitySelectorBtn'>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease} className='quantitySelectorBtn'>+</button>
            <button onClick={handleAddToCart} className='btn btn-secondary'>Add to Cart</button>
        </div>
    );
};

export default QuantitySelector;
