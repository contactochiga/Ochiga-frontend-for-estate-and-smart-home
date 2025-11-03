"use client";

import { useState } from "react";
import {
  FaBars,
  FaHome,
  FaBuilding,
  FaMapMarkedAlt,
  FaUserCircle,
} from "react-icons/fa";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔹 Top Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger Button */}
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
      </header>

      {/* 🔹 Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-[100dvh] w-[80%] bg-gradient-to-b from-gray-950/95 to-gray-900/90 backdrop-blur-2xl border-r border-gray-800 shadow-[0_8px_40px_rgba(0,0,0,0.7)] rounded-r-3xl transform transition-transform duration-500 ease-in-out z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-5">
          {/* Search Bar */}
          <div className="mb-8 mt-2">
            <input
              type="text"
              placeholder="Search estates, rooms or devices"
              className="w-full px-4 py-2 rounded-xl bg-gray-800/60 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-inner"
            />
          </div>

          {/* Menu Buttons */}
          <nav className="flex flex-col gap-5 text-gray-300 flex-1">
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

          {/* Profile Section */}
          <div className="mt-6 border-t border-gray-800 pt-4">
            <button className="flex items-center gap-3 w-full text-gray-400 hover:text-white transition">
              <div className="bg-blue-600 text-white rounded-full w-9 h-9 flex items-center justify-center font-semibold shadow-md">
                I
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-sm font-medium">Info Pav</span>
                <span className="text-xs text-gray-500">Settings / Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Overlay (click to close) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
