import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.webp";
import basket from "../images/basket.svg";
import { useState } from "react";

const navLinks = [
  { label: "Home", link: "/" },
  { label: "Vehicles", link: "/vehicles" },
  { label: "Loan Calculator", link: "/loan" },
];

function Navbar() {
  const path = useLocation().pathname;
  const loggedIn = false;

  return (
    <div className="justify-between fixed w-full flex px-5 bg-gradient-to-b pb-5 from-green-300/80 to-transparent via-60% via-green-300/80 z-10">
      <div className="flex flex-col items-center text-center">
        <img src={logo} height={64} width={64} alt="logo" />
        <h1 className="font-serif ">Green Charge Auto</h1>
      </div>
      <ul className="flex gap-x-20 pb-5 items-end">
        {navLinks.map((link) => (
          <Link to={link.link}>
            <span
              className={`${
                path === link.link ? "text-white" : "text-black"
              } hover:text-gray-400 transition-colors`}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-x-5">
        <Link to="/cart">
          <img src={basket} alt="cart" width={50} height={50} />
        </Link>
        <button className="rounded-lg py-2 px-5 border-black border-2 hover:text-gray-900 transition-all">
          {loggedIn ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
