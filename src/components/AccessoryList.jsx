import React, { useState, useEffect } from 'react';
import accessoriesData from './accessories.json';
import { Link } from 'react-router-dom'
import QuantitySelector from './QuantitySelector'

export const Accessories = ({ categories }) => {
    const [accessories, setAccessories] = useState([]);

    useEffect(() => {
        setAccessories(accessoriesData.accessories);
    }, []);

    const filteredAccessories = categories && categories.length > 0
        ? accessories.filter(accessory => categories.includes(accessory.category))
        : accessories;

    return (
        <div className="container">
            <div className="row">
                {filteredAccessories.map(accessory => (
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
                                <a href="#" className="btn btn-secondary">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
