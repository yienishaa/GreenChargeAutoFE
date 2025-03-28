import { Link, useLocation } from "react-router-dom";

import logo from "../images/logo.webp";
import { useState } from "react";
import UploadForm from "../pages/UploadForm";


const navLinks = [
  { label: "Home", link: "/" },
  { label: "Vehicles", link: "/vehicles" },
  { label: "Loan Calculator", link: "/loan" },
  { label: "UploadForm", link: "/UploadForm" },
];

const id=0;
const loggedIn = false;

function Navbar() {
  const path = useLocation().pathname;
  const [menu, showMenu] = useState(false);

  return (

    <div className="bg-gradient-to-b from-green-400 to-transparent via-70% via-green-300 px-5 justify-between flex fixed w-full z-10">
      <div className="flex-col flex items-center align-middle justify-center">
        <img src={logo} height={75} width={75} alt="logo" />
        <h1 className="font-serif -translate-y-4">green charge auto</h1>
      </div>

      <ul className="gap-x-5 flex items-end mb-5">
        {navLinks.map((link) => (
          <li className="transition-all">
            <Link to={link.link}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-x-10">
        <Link to={`/cart/${id}`}>
          <img src={logo} width={64} height={64} alt="cart" />
        </Link>
        <Link to={loggedIn ? "/signout" : "/signin"}>
        <button className="border-2 px-3 py-1 rounded-lg border-black hover:border-gray-700 hover:text-gray-700 transition-all">
          {loggedIn ? "Sign Out" : "Sign In"}
        </button>
        </Link>
      </div>
    </div>

  );
}

export default Navbar;
