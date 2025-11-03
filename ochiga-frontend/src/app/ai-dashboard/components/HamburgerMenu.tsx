"use client";

import { useState } from "react";
import { FaBars, FaHome, FaBuilding, FaMapMarkedAlt, FaUserCircle } from "react-icons/fa";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔹 Top Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center justify-between">
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

        {/* Right side placeholder for future button */}
        <div className="flex items-center gap-2"></div>
      </header>

      {/* 🔹 Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-[80%] bg-gradient-to-b from-gray-950/95 to-gray-900/90 backdrop-blur-2xl border-r border-gray-800 shadow-2xl transform transition-transform duration-500 ease-in-out z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu Content */}
        <div className="flex flex-col justify-between h-full pt-16 pb-6 px-6">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search estates, rooms, devices..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent backdrop-blur-md"
            />
          </div>

          {/* Main Menu */}
          <nav className="flex flex-col gap-4 text-gray-300">
            <button className="flex items-center gap-3 text-left hover:text-white transition">
              <FaHome className="text-lg" /> <span>Estate</span>
            </button>
            <button className="flex items-center gap-3 text-left hover:text-white transition">
              <FaBuilding className="text-lg" /> <span>Buildings</span>
            </button>
            <button className="flex items-center gap-3 text-left hover:text-white transition">
              <FaMapMarkedAlt className="text-lg" /> <span>Map</span>
            </button>
          </nav>

          {/* Footer (Profile) */}
          <div className="border-t border-gray-800 mt-8 pt-4">
            <button className="flex items-center gap-3 text-gray-400 hover:text-white transition">
              <FaUserCircle className="text-2xl" />
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">Profile</span>
                <span className="text-xs text-gray-500">Settings / Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay (click to close) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
