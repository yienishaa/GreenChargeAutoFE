import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Vehicles from '../pages/Vehicles';
import LoanCalculator from '../pages/LoanCalculator';
import VehicleDetail from '../pages/VehicleDetail';
import Cart from "../pages/Cart";
import CheckoutPage from '../pages/Checkout';
import Login from '../pages/Login';
import DashboardLayoutBasic from "../pages/admin-pages/AdminDashbord";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

const AppRoutes = () => {
        //const { user } = useAuth();
        const user = "ADMIN"
        return (
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/vehicles" element={<Vehicles />} />
                    <Route path="/loan" element={<LoanCalculator />} />
                    <Route path="/vehicles/:id" element={<VehicleDetail />} />
                    <Route path="/cart/:id" element={<Cart />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/signin" element={<Login />} />
                    <Route path="/orders" element={<DashboardLayoutBasic />} />
                    <Route path="/*" element={<DashboardLayoutBasic />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
            </Routes>
    );
};

export default AppRoutes;


//https://aaronmams.github.io/Connect-to-Amazon-RDS-DB-with-MySQL-Workbench/
