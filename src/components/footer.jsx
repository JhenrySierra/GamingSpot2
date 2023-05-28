import React from 'react';

export const Footer = () => {
    const authorName = 'Jhenry Sierra';
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <p className="text-center">
                    &copy; {currentYear} {authorName} - Gaming-Spot. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

