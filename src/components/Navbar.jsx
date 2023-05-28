import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { CartWidget } from "./CartWidget";

export const CustomNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" >
            <div className="container-fluid">
                <Navbar.Brand as={Link} to="/" className='logo'>Gaming Spot</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
                <Navbar.Collapse id="navbarNavAltMarkup">
                    <Nav className="navbar-nav mx-auto">
                        <Nav.Link as={Link} to="/">Shop Accessories</Nav.Link>
                        <Nav.Link as={Link} to="/Mouse">Mouse</Nav.Link>
                        <Nav.Link as={Link} to="/Keyboard">Keyboards</Nav.Link>
                        <Nav.Link as={Link} to="/Chair">Gaming Chairs</Nav.Link>
                        <Nav.Link as={Link} to="/Mat">Desk Mats</Nav.Link>
                    </Nav>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/cart">
                        <CartWidget />
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};
