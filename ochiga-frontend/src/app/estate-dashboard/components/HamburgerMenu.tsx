"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

export default function EstateHamburgerMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.classList.add("sidebar-open");
    else document.body.classList.remove("sidebar-open");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/70 backdrop-blur-xl border-b border-white/10 py-3">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md active:scale-95 transition text-white"
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
            <span className="text-white font-semibold text-base">
              Estate Dashboard
            </span>
          </div>
          {!open && (
            <button className="p-2 rounded-md active:scale-95 transition text-white">
              <BsThreeDots size={22} />
            </button>
          )}
        </div>
      </header>

      {/* SLIDE MENU */}
      <div
        className={`fixed top-0 left-0 h-[100dvh] w-[65%] max-w-[360px] z-40 bg-gray-900/95 backdrop-blur-xl shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16" />

        {/* SEARCH slightly lower */}
        <div className="px-4 mt-2 flex items-center mb-4">
          <div className="flex items-center flex-1 bg-gray-800 rounded-xl px-3 py-2">
            <FiSearch className="opacity-50" size={18} />
            <input
              type="text"
              placeholder="Search houses, estates or devices"
              className="bg-transparent outline-none text-sm ml-2 w-full"
            />
          </div>
        </div>

        {/* MENU BUTTONS */}
        <div className="px-4 space-y-3">
          <button className="w-full text-left py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 active:scale-[0.97] transition">
            Dashboard Overview
          </button>
          <button className="w-full text-left py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 active:scale-[0.97] transition">
            Estate Management
          </button>
          <button className="w-full text-left py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 active:scale-[0.97] transition">
            Lighting & Power
          </button>
          <button className="w-full text-left py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 active:scale-[0.97] transition">
            Security & CCTV
          </button>
          <button className="w-full text-left py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 active:scale-[0.97] transition">
            My Profile
          </button>
        </div>

        {/* PROFILE FOOTER */}
        <div className="absolute bottom-0 left-0 w-full px-4 py-5 border-t border-white/10">
          <button className="w-full py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 active:scale-[0.97] transition">
            Estate Admin • Profile · Settings · Logout
          </button>
        </div>
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
}
