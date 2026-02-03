import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import logo1 from "../assets/logo1.png";
import ScrollProgress from "./ScrollProgress";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur border-b border-white/10">
      {/* Progress Bar */}
      <ScrollProgress />

      <div className="flex items-center justify-between h-16 px-6 sm:px-16 xl:px-28">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <img
            src={logo1}
            alt="logo"
            className="w-28 sm:w-36 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate("/admin")}
          className="group relative inline-flex items-center gap-2 rounded-full 
                     bg-white/10 text-white px-6 py-2 text-sm
                     hover:bg-white/20 transition-all duration-300"
        >
          <span className="font-medium">{token ? "Dashboard" : "Login"}</span>

          <img
            src={assets.arrow}
            alt="arrow"
            className="w-3 transition-transform duration-300 group-hover:translate-x-1"
          />

          <span className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
