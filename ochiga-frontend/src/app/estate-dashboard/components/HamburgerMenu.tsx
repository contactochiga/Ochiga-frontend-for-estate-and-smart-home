"use client";

import { useState } from "react";
import {
  FaBars,
  FaHome,
  FaBolt,
  FaBuilding,
  FaUsers,
  FaMoneyBill,
} from "react-icons/fa";

export default function EstateHamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔹 Top Bar */}
      <header className="fixed top-0 left-0 w-full z-[60] bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center justify-between transition-all">
        <div className="flex items-center gap-3">
          {/* Hamburger Button */}
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-md hover:bg-gray-800 transition"
            aria-label="Toggle menu"
          >
            <FaBars className="text-white text-xl" />
          </button>

          <span className="text-white text-sm md:text-base font-medium tracking-wide">
            Estate Dashboard
          </span>
        </div>
      </header>

      {/* 🔹 PUSH-AWAY DASHBOARD OVERLAY */}
      <div
        className={`fixed inset-0 z-[45] transition-all duration-500 ease-in-out ${
          open ? "backdrop-blur-[6px] bg-black/40" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* 🔹 MAIN PAGE PUSH ANIMATION WRAPPER */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-[40] transition-transform duration-500 ease-in-out ${
          open ? "translate-x-[70%]" : "translate-x-0"
        }`}
      ></div>

      {/* 🔹 SLIDING SIDE MENU */}
      <aside
        className={`fixed top-0 left-0 h-[100dvh] w-[70%] max-w-[320px] 
          bg-gradient-to-b from-gray-950 to-gray-900
          backdrop-blur-2xl border-r border-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.7)]
          rounded-r-3xl z-[50]
          transform transition-transform duration-500 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-5">

          {/* 🔸 Search Bar */}
          <div className="mb-10 mt-2">
            <input
              type="text"
              placeholder="Search residents, devices or panels"
              className="w-full px-4 py-2 rounded-xl bg-gray-800/60 border border-gray-700 text-gray-200 placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-inner"
            />
          </div>

          {/* 🔸 Menu Items */}
          <nav className="flex flex-col gap-6 text-gray-300 flex-1">
            <button className="flex items-center gap-3 text-left hover:text-white transition">
              <FaHome className="text-lg" /> <span>Estate Home</span>
            </button>
            <button className="flex items-center gap-3 text-left hover:text-white transition">
              <FaBolt className="text-lg" /> <span>Power</span>
            </button>
            <button className="flex items-center gap-3 text-left hover:text-white transition">
              <FaBuilding className="text-lg" /> <span>Devices</span>
            </button>
            <button className="flex items-center gap-3 text-left hover:text-white transition">
              <FaMoneyBill className="text-lg" /> <span>Accounting</span>
            </button>
            <button className="flex items-center gap-3 text-left hover:text-white transition">
              <FaUsers className="text-lg" /> <span>Community</span>
            </button>
          </nav>

          {/* 🔸 Profile Section (Bottom-Aligned) */}
          <div className="border-t border-gray-800 pt-4">
            <button className="flex items-center gap-4 w-full hover:text-white transition">
              <div className="bg-blue-600 text-white rounded-full w-11 h-11 flex items-center justify-center text-lg font-semibold shadow-md">
                O
              </div>

              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">Ochiga Admin</span>
                <span className="text-xs text-gray-500">Profile • Settings • Logout</span>
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
