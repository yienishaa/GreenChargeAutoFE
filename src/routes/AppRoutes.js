import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Vehicles from '../pages/Vehicles';
import LoanCalculator from '../pages/LoanCalculator';
import UploadForm from '../pages/admin-pages/UploadForm';
import VehicleDetail from '../pages/VehicleDetail';
import Cart from "../pages/Cart";
import CheckoutPage from '../pages/Checkout';
import Compare from '../pages/Compare';
import Login from '../pages/Login';
import SalesAnalytics from '../pages/admin-pages/SalesAnalytics'
import DashboardLayoutBasic from "../pages/admin-pages/AdminDashbord";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/loan" element={<LoanCalculator />} />
            <Route path="/UploadForm" element={<UploadForm />} />
            <Route path="/vehicles/:id" element={<VehicleDetail />} />
            <Route path="/cart/:id" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/DashboardLayoutBasic" element={<DashboardLayoutBasic />} />
            <Route path="/*" element={<DashboardLayoutBasic />} />
            <Route path="/SalesAnalytics" element={<SalesAnalytics />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
};

export default AppRoutes;


//https://aaronmams.github.io/Connect-to-Amazon-RDS-DB-with-MySQL-Workbench/
