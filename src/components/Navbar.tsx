// Navbar.tsx
import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo-2.png'; // Replace with your logo path

const Navbar: React.FC = () => {
  return (
    <header className="w-full bg-gray-800 px-8 py-3 flex items-center justify-between shadow-md fixed top-0 left-0 z-30">
      {/* Logo Section */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-8 w-auto" />
        <span className="text-2xl font-bold text-white">TarotF</span>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-6 text-white">
        <Link to="/blog" className="hover:text-gray-300 transition duration-200">Blog</Link>
        <Link to="/booking" className="hover:text-gray-300 transition duration-200">Booking</Link>
      </nav>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        <Link to="/login">
          <Button type="default" className="px-6 py-1 rounded-lg text-green-600 bg-green-100 hover:bg-green-200">
            Log in
          </Button>
        </Link>
        <Link to="/register">
          <Button type="default" className="px-6 py-1 rounded-lg text-gray-800 bg-gray-100 hover:bg-gray-200">
            Sign up
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
