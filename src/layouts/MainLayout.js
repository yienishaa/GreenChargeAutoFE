import React from 'react';
import Navbar from '../components/Navbar';
import logo from "../images/logo.webp";

const MainLayout = ({ children }) => {
    return (
        <>
            <img className="h-24 w-auto" src={logo} />
            <Navbar />
            <main className="p-4">{children}</main>
        </>
    );
};

export default MainLayout;
