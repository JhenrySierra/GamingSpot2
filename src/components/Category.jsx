import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import accessoriesData from './accessories.json';

export const Category = () => {
    const { productCategory } = useParams();
    const [accessories, setAccessories] = useState([]);

    useEffect(() => {
        const filteredAccessories = accessoriesData.accessories.filter(
            (accessory) => accessory.category === productCategory
        );
        setAccessories(filteredAccessories);
    }, [productCategory]);

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
                                <Link to={`/${accessory.category}/${accessory.id}`} className="btn btn-secondary m-1">Add to Cart</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
