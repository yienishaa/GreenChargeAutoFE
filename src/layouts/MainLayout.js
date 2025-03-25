import React from 'react';
import Navbar from '../components/Navbar';


const MainLayout = ({ children }) => {
    return (
        <>
            
            <Navbar />
            <main className="p-4">{children}</main>
        </>
    );
};

export default MainLayout;
