'use client';

import React, { useState } from 'react';
import OchigaLogo from './OchigaLogo';
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineSearch,
  HiOutlineInbox,
} from 'react-icons/hi';  // 👈 use hi, not hi2

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <OchigaLogo />

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Services</a>
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
          <HiOutlineSearch className="w-5 h-5 cursor-pointer" />
          <HiOutlineInbox className="w-5 h-5 cursor-pointer" />
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-100 p-4 space-y-2">
          <a href="#" className="block hover:text-blue-600">Home</a>
          <a href="#" className="block hover:text-blue-600">Services</a>
          <a href="#" className="block hover:text-blue-600">About</a>
          <a href="#" className="block hover:text-blue-600">Contact</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
