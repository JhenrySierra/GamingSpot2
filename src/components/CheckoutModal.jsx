import React, { useState } from 'react';
import Modal from 'react-modal';

export const CheckoutModal = ({ isOpen, closeModal }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleCheckout = () => {
        // Perform the checkout logic here
        console.log('Checkout:', name, email, phone);

        // Close the modal after checkout
        closeModal();

    };

    return (
        <div>
            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <h2>Checkout</h2>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={handleNameChange} required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={handleEmailChange} required />

                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} required />

                <button onClick={handleCheckout}>Submit</button>
                <button onClick={closeModal}>Cancel</button>
            </Modal>
        </div>
    );
};
