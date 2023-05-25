import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getFirestore, collection, addDoc } from 'firebase/firestore';


export const CheckoutModal = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedItems) {
            setCartItems(storedItems);
        }
    }, []);
    
    const db = getFirestore();


    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSaveChanges = async () => {
        const collectionName = 'orders'; // Replace with your desired collection name
        const order = {
            name: name,
            email: email,
            phone: phone,
            totalAmount: totalAmount,
            cartItems: cartItems,
            orderDate: new Date().toISOString(),
        };

        try {
            const docRef = await addDoc(collection(db, collectionName), order);
            alert('Order placed with ID:', docRef.id);
            // Perform desired action after successfully placing the order
            handleClose();
        } catch (error) {
            console.error('Error placing order:', error);
        }
    ;
        handleClose();
    };

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.accessory.price * item.quantity,
        0
    );

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Checkout
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Continue Shopping
                    </Button>
                    <Button variant="success" onClick={handleSaveChanges}>
                        Place Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
