import React from 'react';
import Navbar from '../components/Navbar';
import { CartProvider } from '../context/CartContext';
import Chatbot from '../components/Chatbot';


const MainLayout = ({ children }) => {
    return (
        <>
            <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Chatbot />
            </CartProvider>
        </>
    );
};

export default MainLayout;
