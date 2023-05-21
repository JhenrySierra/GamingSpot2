import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import QuantitySelector from './QuantitySelector';


export const Category = () => {
    const { productCategory } = useParams();
    const db = getFirestore();
    const [accessories, setAccessories] = useState([]);

    useEffect(() => {
        const fetchAccessories = async () => {
            try {
                const accessoriesCollectionRef = collection(db, 'accessories');
                const categoryQuery = query(accessoriesCollectionRef, where('category', '==', productCategory));
                const accessoriesSnapshot = await getDocs(categoryQuery);
                setAccessories(accessoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error('Error fetching accessories:', error);
            }
        };

        fetchAccessories();
    }, [db, productCategory]);

    const addToCart = (accessory, quantity) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const newItem = {
            accessory: accessory,
            quantity: quantity
        };
        cartItems.push(newItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log(`Added ${quantity} ${accessory.name}(s) to cart.`);
    };


    return (
        <div className="container">
            <div className="row">
                {accessories.map(accessory => (
                    <div key={accessory.id} className="col-md-3">
                        <div className="card">
                            <img src={accessory.image} className="card-img-top" alt={accessory.name} />
                            <div className="card-body">
                                <h5 className="card-title">{accessory.name}</h5>
                                <p className="card-text">{accessory.description}</p>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><strong>Price:</strong> ${accessory.price}</li>
                                </ul>
                                <Link to={`/${accessory.category}/${accessory.id}`} className="btn btn-primary m-1">View</Link>
                                <QuantitySelector addToCart={addToCart} accessory={accessory} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
