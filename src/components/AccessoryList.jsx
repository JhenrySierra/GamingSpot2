import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuantitySelector from './QuantitySelector';
import { ToastContainer, toast } from 'react-toastify';

import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { CheckoutModal } from './CheckoutModal';

export const Accessories = ({ categories }) => {
    const db = getFirestore();
    const [accessories, setAccessories] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const productsDB = collection(db, 'accessories');

        getDocs(productsDB).then((accessories) => {
            setAccessories(accessories.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
    }, [db]);

    const addToCart = (accessory, quantity) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const newItem = {
            accessory: accessory,
            quantity: quantity,
        };

        cartItems.push(newItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        setCartItems((prevCartItems) => [...prevCartItems, newItem]);
        const notify = () =>
            toast(`Added ${quantity} ${accessory.name}(s) to cart.`, {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        notify();
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    return (
        <div className="container">
            <div className="row">
                {accessories.map((accessory) => (
                    <div key={accessory.id} className="col-md-3">
                        <div className="card">
                            <img src={accessory.image} className="card-img-top" alt={accessory.name} />
                            <div className="card-body">
                                <h5 className="card-title">{accessory.name}</h5>
                                <p className="card-text">{accessory.description}</p>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <strong>Price:</strong> ${accessory.price}
                                    </li>
                                </ul>
                                <Link to={`/${accessory.category}/${accessory.id}`} className="btn btn-primary m-1">
                                    View
                                </Link>
                                <QuantitySelector addToCart={addToCart} accessory={accessory} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};
