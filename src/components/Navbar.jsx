import React from 'react';
import { Link } from 'react-router-dom';
import { CartWidget } from "./CartWidget";

export const Navbar = () => {
    return (
        <div className='navbar'>
            <div>
            <Link to="/" className='logo'>Gaming Spot</Link>
            </div>
            <div className='links'>
                <Link to="/">Shop Accessories</Link>
                <Link to="/Mouse">Mouse</Link>
                <Link to="/Keyboard">Keyboards</Link>
                <Link to="/Chair">Gaming Chairs</Link>
                <Link to="/Mat">Desk Mats</Link>
                <Link to="/cart">
                    <CartWidget />
                </Link>
            </div>
        </div>
    )
}
