import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../images/logo.webp";
import { useCart } from '../context/CartContext';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";
import API from "../globals";


const navLinks = [
  { label: "Home", link: "/" },
  { label: "Vehicles", link: "/vehicles" },
  { label: "Loan Calculator", link: "/loan" },
  { label: "Admin Dashboard", link: "/orders" },
];

const cartId = 0;

function Navbar() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { totalQuantity, loadCartItems } = useCart(); 
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const interval = setInterval(() => {
      const hasToken = !!localStorage.getItem("token");
      setLoggedIn(hasToken);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    const userId = localStorage.getItem("userId");
  
    try {
      await axios.post(`${API.BASE_URL}/auth/logout?userId=${userId}`);
    } catch (err) {
      console.error("Logout error:", err);
    }
  
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  
    loadCartItems(); // Refresh context
    setLoggedIn(false);
    navigate("/signin");
  };

  return (
    <div className="bg-gradient-to-b text-white from-lime-600 to-transparent via-70% via-lime-600 px-5 justify-between flex fixed w-full top-0 z-10">
      <div className="flex-col flex items-center align-middle justify-center">
        <img src={logo} height={70} width={70} alt="logo" />
        <h1 className="font-serif -translate-y-4">green charge auto</h1>
      </div>

      <ul className="gap-x-8 flex items-end mb-7">
        {navLinks.map((link) => (
          <li key={link.label} className="px-3 py-1 rounded-md hover:bg-gray-100 hover:bg-opacity-50 hover:brightness-75 hover:text-emerald-950 transition-colors duration-200">
            <Link className="font-sans font-light" to={link.link}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-x-10">
        <Link to={`/cart/${cartId}`}>
          <IconButton>
            <Badge color="secondary" badgeContent={totalQuantity}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="border-2 px-3 py-1 rounded-lg border-white hover:brightness-90"
          >
            Sign Out
          </button>
        ) : (
          <Link to="/signin">
            <button className="border-2 px-3 py-1 rounded-lg border-white hover:brightness-90">
              Sign In/Register
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
