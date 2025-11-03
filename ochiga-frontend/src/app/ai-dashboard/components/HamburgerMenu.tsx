"use client";

import { useState } from "react";
import { FaBars, FaMapMarkedAlt, FaBuilding, FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <>
      {/* 🔹 Top Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger button */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-gray-800 transition"
            aria-label="Toggle menu"
          >
            <FaBars className="text-white text-xl" />
          </button>

          {/* Title */}
          <span className="text-white text-sm md:text-base font-medium tracking-wide">
            Ochiga AI
          </span>
        </div>

        {/* Future right-side button placeholder */}
        <div className="flex items-center gap-2"></div>
      </header>

      {/* 🔹 Sliding Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-[80%] sm:w-[60%] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 backdrop-blur-2xl border-r border-gray-800 shadow-2xl transform transition-transform duration-500 ease-in-out z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full py-6 px-6">
          {/* Menu Header */}
          <div className="mt-10 space-y-5">
            <button className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white transition">
              <FaBuilding className="text-lg" />
              <span>Estate / Buildings</span>
            </button>
            <button className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white transition">
              <FaMapMarkedAlt className="text-lg" />
              <span>Map</span>
            </button>
          </div>

          {/* Profile Footer */}
          <div className="border-t border-gray-800 pt-5 text-gray-400 text-sm relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 w-full text-left hover:text-white transition"
            >
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                O
              </div>
              <span>Profile</span>
            </button>

            {/* Dropdown for settings + logout */}
            {showProfileMenu && (
              <div className="mt-3 ml-10 flex flex-col gap-2">
                <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                  <FaCog className="text-sm" /> Settings
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                  <FaSignOutAlt className="text-sm" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Dashboard Blur Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md transition-all duration-500 ease-in-out z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
