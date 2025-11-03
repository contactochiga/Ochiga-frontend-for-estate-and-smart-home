"use client";

import { useState, useEffect } from "react";
import {
  FaBars,
  FaMapMarkedAlt,
  FaBuilding,
  FaHome,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // 🔹 Animate dashboard blur and shift
  useEffect(() => {
    const dashboard = document.getElementById("dashboard-wrapper");
    if (!dashboard) return;
    if (open) {
      dashboard.style.transform = "translateX(50%)";
      dashboard.style.filter = "blur(4px)";
      dashboard.style.transition = "transform 0.4s ease, filter 0.4s ease";
    } else {
      dashboard.style.transform = "translateX(0)";
      dashboard.style.filter = "blur(0)";
    }
  }, [open]);

  return (
    <>
      {/* 🔹 Top Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger Button */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-gray-800 transition"
            aria-label="Toggle menu"
          >
            <FaBars className="text-white text-xl" />
          </button>

          {/* App Title */}
          <span className="text-white text-sm md:text-base font-medium tracking-wide">
            Ochiga AI
          </span>
        </div>
      </header>

      {/* 🔹 Sliding Drawer */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[80%] sm:w-[60%] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 border-r border-gray-800 shadow-2xl transform transition-transform duration-500 ease-in-out z-50 flex flex-col justify-between ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Upper Section */}
        <div className="pt-16 pb-6 px-6 flex flex-col gap-6 text-gray-300">
          <button className="flex items-center gap-3 w-full text-left hover:text-white transition">
            <FaHome className="text-lg" />
            <span>Estate</span>
          </button>

          <button className="flex items-center gap-3 w-full text-left hover:text-white transition">
            <FaBuilding className="text-lg" />
            <span>Buildings</span>
          </button>

          <button className="flex items-center gap-3 w-full text-left hover:text-white transition">
            <FaMapMarkedAlt className="text-lg" />
            <span>Map</span>
          </button>
        </div>

        {/* Footer / Profile */}
        <div className="border-t border-gray-800 py-5 px-6 text-gray-400 text-sm">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 w-full text-left hover:text-white transition"
          >
            <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              O
            </div>
            <span>Profile</span>
          </button>

          {showProfileMenu && (
            <div className="mt-3 ml-12 flex flex-col gap-2">
              <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                <FaCog className="text-sm" /> Settings
              </button>
              <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                <FaSignOutAlt className="text-sm" /> Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* 🔹 Overlay (click to close) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-all duration-500 ease-in-out"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
