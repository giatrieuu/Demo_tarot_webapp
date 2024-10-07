import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-4">
      <img
        src="/Tarot.png" 
        alt="Logo"
        className="w-12 h-12 rounded-full object-cover"
      />
      
      <span className="text-white text-2xl font-bold" style={{ fontFamily: 'Uncial Antiqua, sans-serif' }}>
        TarotF
      </span>
    </Link>
  );
};

export default Logo;
