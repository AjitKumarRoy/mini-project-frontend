import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import api from "../api/api";
import { Link } from 'react-router-dom';
import logo from '../assets/react.svg'; // Corrected import path

const Login = () => {
  const { googleLogin } = useAuth();

  const handleGoogleLogin = () => {
    window.location.href = api.defaults.baseURL + '/api/auth/google';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* ... background circles ... */}
      </div>

      {/* Login Card */}
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full ">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="EasySheets Logo" className="h-12" /> {/* Adjust size with className */}
        </div>

        <h2 className="text-3xl font-extrabold text-black tracking-wider text-center mb-6">
          EASY <span className="text-yellow-300">SHEETS</span>
        </h2>

        {/* Introductory Content */}
        <div className="mb-8 text-center text-gray-700">
          <p className="mb-4">
            Welcome to EasySheets! Your intuitive platform for creating, managing, and collaborating on spreadsheets. Get started by signing in with your Google account.
          </p>
          <p className="text-sm">
            By signing in, you agree to our <Link to="/terms-of-service" className="text-indigo-500 hover:underline">Terms of Service</Link> and acknowledge our <Link to="/privacy-policy" className="text-indigo-500 hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        {/* Google Sign-in Button */}
        <button
          onClick={handleGoogleLogin}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
        >
          <span className="absolute left-4 inset-y-0 flex items-center">
            <FcGoogle className="h-6 w-6" aria-hidden="true" />
          </span>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;