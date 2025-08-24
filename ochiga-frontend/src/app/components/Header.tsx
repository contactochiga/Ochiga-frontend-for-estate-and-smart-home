'use client';

import React, { useState } from 'react';
import OchigaLogo from './OchigaLogo';
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineMagnifyingGlass,
  HiOutlineInbox,
} from 'react-icons/hi2';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section (Hamburger Menu) */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Open main menu"
            >
              <HiOutlineMenu className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Center section (Ochiga Logo) */}
          <div className="flex-1 flex justify-center">
            <OchigaLogo />
          </div>

          {/* Right section (Search, Notifications, Profile) */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Search"
            >
              <HiOutlineMagnifyingGlass className="h-6 w-6 text-gray-700" />
            </button>

            <button
              type="button"
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Notifications"
            >
              <HiOutlineInbox className="h-6 w-6 text-gray-700" />
            </button>

            {/* User avatar placeholder */}
            <div className="h-8 w-8 rounded-full bg-gray-300 ring-1 ring-gray-300 overflow-hidden">
              {/* Later: <img src="/path/to/avatar.png" alt="User" className="h-full w-full object-cover rounded-full" /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="relative w-64 bg-white h-full shadow-lg z-50 p-6 flex flex-col">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Close menu"
            >
              <HiOutlineX className="h-6 w-6 text-gray-700" />
            </button>

            {/* Menu content */}
            <nav className="mt-10 space-y-4">
              <a href="#" className="block text-gray-700 hover:text-indigo-600">
                Dashboard
              </a>
              <a href="#" className="block text-gray-700 hover:text-indigo-600">
                Payments
              </a>
              <a href="#" className="block text-gray-700 hover:text-indigo-600">
                Service Requests
              </a>
              <a href="#" className="block text-gray-700 hover:text-indigo-600">
                Settings
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
