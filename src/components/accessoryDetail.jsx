import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import accessoriesData from './accessories.json';

export const AccessoryDetail = () => {
    const [accessory, setAccessory] = useState({});
    const { productId } = useParams();

    const navigate = useNavigate()


    useEffect(() => {
        const selectedAccessory = accessoriesData.accessories.find(
            accessory => accessory.id === parseInt(productId)
        );
        setAccessory(selectedAccessory);
    }, [productId]);

    const onBack = () => {
        navigate(-1)
    }

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
                    <button className="btn btn-primary">Add to Cart</button>
                    <button onClick={onBack} className="btn btn-secondary m-2"> Volver </button>

                </div>
            </div>
        </div>
    );
};
