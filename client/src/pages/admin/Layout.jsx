/* eslint-disable react-hooks/immutability */
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";
import logo1 from "../../assets/logo1.png";

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-300">
      {/* Header */}
      <header className="flex items-center justify-between h-16 px-6 sm:px-12 bg-gray-950 border-b border-gray-800 shadow-lg sticky top-0 z-20">
        <img
          src={logo1}
          alt="Postly Logo"
          className="w-32 sm:w-40 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        />
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition shadow-md"
        >
          Logout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7"
            />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex-shrink-0">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-10 bg-gray-900 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 transition-colors duration-300">
          <Outlet />
        </main>
      </div>

      {/* Optional floating gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900 via-transparent to-gray-900 opacity-20"></div>
    </div>
  );
};

export default Layout;
