import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg py-3 px-6 fixed w-full top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-white tracking-wider"
        >
          EASY <span className="text-yellow-300">SHEETS</span>
        </Link>

        {/* Profile Menu (also serves as hamburger menu) */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none flex items-center gap-2"
          >
            <img
              src={user?.profilePicture || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white hover:shadow-lg transition"
            />
          </button>

          {/* Dropdown / Navigation Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white text-gray-800 shadow-xl rounded-lg py-3 animate-fadeIn">
              <div className="text-center px-4">
                <img
                  src={user?.profilePicture || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full mx-auto border-2 border-indigo-500"
                />
                <p className="mt-2 font-semibold text-gray-900">
                  {user?.name || "User"}
                </p>
              </div>
              <hr className="my-2" />

              {/* Nav Links */}
              <ul className="text-center">
                <li className="py-2 hover:bg-gray-100">
                  <Link to="/" className="block text-gray-700">
                    Home
                  </Link>
                </li>
                <li className="py-2 hover:bg-gray-100">
                  <Link to="/about" className="block text-gray-700">
                    About
                  </Link>
                </li>
                <li className="py-2 hover:bg-gray-100">
                  <Link to="/contact" className="block text-gray-700">
                    Contact
                  </Link>
                </li>
              </ul>

              <hr className="my-2" />

              <button
                onClick={logout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
