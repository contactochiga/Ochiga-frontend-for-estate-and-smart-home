'use client';

import React from 'react';
import OchigaLogo from './OchigaLogo';
import { HiOutlineMenu, HiOutlineMagnifyingGlass, HiOutlineInbox } from 'react-icons/hi2';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section (Hamburger Menu) */}
          <div className="flex items-center">
            <button className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open main menu</span>
              <HiOutlineMenu className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Center section (Ochiga Logo) */}
          <div className="flex-1 flex justify-center items-center">
            <OchigaLogo />
          </div>

          {/* Right section (Icons and User Profile) */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Search</span>
              <HiOutlineMagnifyingGlass className="h-6 w-6 text-gray-700" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Notifications</span>
              <HiOutlineInbox className="h-6 w-6 text-gray-700" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-300 ring-1 ring-gray-300">
              {/* Replace with <img src="/path/to/avatar.png" alt="User" className="rounded-full" /> later */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
