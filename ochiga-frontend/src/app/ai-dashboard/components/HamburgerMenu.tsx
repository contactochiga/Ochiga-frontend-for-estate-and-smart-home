"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";

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

        {/* Right side placeholder (for future buttons) */}
        <div className="flex items-center gap-2">
          {/* e.g. future profile button / settings icon */}
        </div>
      </header>

      {/* 🔹 Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-[94%] bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 shadow-2xl transform transition-transform duration-500 ease-in-out z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu Content */}
        <div className="flex flex-col justify-between h-full py-6 px-6">
          {/* Upper Menu Section */}
          <nav className="space-y-5 mt-10 text-gray-300">
            <button className="block w-full text-left hover:text-white transition">🏠 Buildings</button>
            <button className="block w-full text-left hover:text-white transition">⚙️ Settings</button>
          </nav>

          {/* Bottom Section (Profile / Logout) */}
          <div className="border-t border-gray-800 pt-5 text-gray-400 text-sm">
            <button className="block w-full text-left hover:text-white transition">
              👤 Profile / Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay (click to close) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
