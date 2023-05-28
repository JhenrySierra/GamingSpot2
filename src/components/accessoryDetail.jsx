import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import QuantitySelector from './QuantitySelector';
import { ToastContainer, toast } from 'react-toastify';


export const AccessoryDetail = () => {
    const [accessory, setAccessory] = useState({});
    const { productId } = useParams();
    const db = getFirestore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccessory = async () => {
            try {
                const accessoryDocRef = doc(db, 'accessories', productId);
                const accessoryDocSnapshot = await getDoc(accessoryDocRef);
                if (accessoryDocSnapshot.exists()) {
                    setAccessory({ id: accessoryDocSnapshot.id, ...accessoryDocSnapshot.data() });
                } else {
                    console.log('Accessory not found.');
                }
            } catch (error) {
                console.error('Error fetching accessory:', error);
            }
        };

        fetchAccessory();
    }, [db, productId]);

    const onBack = () => {
        navigate(-1);
    };

    const addToCart = (accessory, quantity) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const newItem = {
            accessory: accessory,
            quantity: quantity
        };
        cartItems.push(newItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={accessory.image} className="img-fluid" alt={accessory.name} />
                </div>
                <div className="col-md-6">
                    <h1>{accessory.name}</h1>
                    <p>{accessory.description}</p>
                    <ul>
                        <li><strong>Brand:</strong> {accessory.brand}</li>
                        <li><strong>Price:</strong> ${accessory.price}</li>
                    </ul>
                    <QuantitySelector addToCart={addToCart} accessory={accessory} />
                    <button onClick={onBack} className="btn btn-secondary m-2"> Volver </button>
                </div>
            </div>
        </div>
    );
};
