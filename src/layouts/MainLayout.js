import React from 'react';
import Navbar from '../components/Navbar';
import { CartProvider } from '../context/CartContext';


const MainLayout = ({ children }) => {
    return (
        <>
            <CartProvider>
            <Navbar />
            <main>{children}</main>

            </CartProvider>
        </>
    );
};

export default MainLayout;
