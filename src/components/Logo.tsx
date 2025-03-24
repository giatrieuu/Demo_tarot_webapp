import React from 'react';
import { Link } from 'react-router-dom';
import logo from "/assets/logo.png"
const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img
        src={logo}
        alt="Logo"
        className="w-12 h-12 rounded-full object-cover"
      />

      <span className="text-[#4a044e] text-3xl font-bold" style={{ fontFamily: 'Uncial Antiqua, sans-serif' }}>
        TarotF
      </span>
    </Link>
  );
};

export default Logo;
