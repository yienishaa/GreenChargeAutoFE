import { Link, useLocation } from "react-router-dom";

import logo from "../images/logo.webp";
import basket from "../images/basket.svg"
import { useState } from "react";


const navLinks = [
  { label: "Home", link: "/" },
  { label: "Vehicles", link: "/vehicles" },
  { label: "Loan Calculator", link: "/loan" },
];

const cartId = 0;
const loggedIn = false;

function Navbar() {
  const path = useLocation().pathname;

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
          <img src={basket} width={50} height={50} alt="cart" className="hover:brightness-110" />
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
