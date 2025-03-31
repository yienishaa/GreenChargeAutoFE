import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Vehicles from '../pages/Vehicles';
import LoanCalculator from '../pages/LoanCalculator';
import UploadForm from '../pages/UploadForm';
import VehicleDetail from '../pages/VehicleDetail';
import Cart from "../pages/Cart";
import Checkout from '../pages/Checkout';
import Compare from '../pages/Compare';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/loan" element={<LoanCalculator />} />
            <Route path="/UploadForm" element={<UploadForm />} />
            <Route path="/vehicles/:id" element={<VehicleDetail />} />
            <Route path="/cart/:id" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/compare" element={<Compare />} />
        </Routes>
    );
};

export default AppRoutes;
