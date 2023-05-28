import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export const CheckoutModal = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirmation, setEmailConfirmation] = useState('');
    const [phone, setPhone] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedItems) {
            setCartItems(storedItems);
        }
    }, []);

    useEffect(() => {
        setIsFormValid(name !== '' && email !== '' && emailConfirmation !== '' && phone !== '');
    }, [name, email, emailConfirmation, phone]);

    const db = getFirestore();

    const handleClose = () => {
        setShowForm(false);
        setShowConfirmation(false);
        setOrderId('');
    };

    const emptyCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const handleShowForm = () => setShowForm(true);

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.accessory.price * item.quantity,
        0
    );
    
    const handleSaveChanges = async () => {
        if (email !== emailConfirmation) {
            setEmailError("Email and Email Confirmation do not match");
            return;
        }

        const collectionName = 'orders';
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
            setOrderId(docRef.id);
            setShowForm(false);
            setShowConfirmation(true);
            emptyCart();
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };


    return (
        <>
            <Button variant="primary" onClick={handleShowForm}>
                Checkout
            </Button>

            {showForm && (
                <Modal show={showForm} onHide={handleClose}>
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
                            <label>Confirm Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                value={emailConfirmation}
                                onChange={(e) => setEmailConfirmation(e.target.value)}
                            />
                        </div>
                        {emailError && (
                            <p style={{ color: 'red' }}>{emailError}</p>
                        )}
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
                        <Button variant="success" onClick={handleSaveChanges} disabled={!isFormValid}>
                            Place Order
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {showConfirmation && (
                <Modal show={showConfirmation} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Your order has been placed successfully!</p>
                        <p>
                            <strong>Order ID:</strong> {orderId}
                        </p>
                        <p>
                            <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
                        </p>
                        <p>Thank you for your purchase.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};
