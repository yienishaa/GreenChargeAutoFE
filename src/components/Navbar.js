import { Link, useLocation } from "react-router-dom";

import logo from "../images/logo.webp";
import { useCart } from '../context/CartContext';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const navLinks = [
  { label: "Home", link: "/" },
  { label: "Vehicles", link: "/vehicles" },
  { label: "Loan Calculator", link: "/loan" },
  { label: "UploadForm", link: "/UploadForm" },
];

const cartId = 0;
const loggedIn = false;

function Navbar() {
  const path = useLocation().pathname;
    const { totalQuantity } = useCart();

  return (
    <div className="bg-gradient-to-b text-white from-lime-600 to-transparent via-70% via-lime-600 px-5 justify-between flex fixed w-full z-10">
      <div className="flex-col flex items-center align-middle justify-center">
        <img src={logo} height={75} width={75} alt="logo" />
        <h1 className="font-serif -translate-y-4">green charge auto</h1>
      </div>

      <ul className="gap-x-5 flex items-end mb-5">
        {navLinks.map((link) => (
          <li className=" hover:brightness-75">
            <Link to={link.link}>{link.label}</Link>
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
        <Link to={loggedIn ? "/signout" : "/signin"}>
        <button className="border-2 px-3 py-1 rounded-lg border-white hover:brightness-90 ">
          {loggedIn ? "Sign Out" : "Sign In"}
        </button>
        </Link>
      </div>
    </div>

  );
}

export default Navbar;
