"use client";

import { useState } from "react";
import { FiMenu, FiSearch, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

export default function ResidentHamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ───── Top Bar ───── */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <div
          className="
            mx-3 mt-3 px-4 py-3
            bg-gray-900/70 backdrop-blur-xl
            border border-white/10 rounded-xl
            flex items-center justify-between
          "
        >
          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-md active:scale-95 transition"
          >
            <FiMenu size={22} />
          </button>

          {/* Title */}
          <span className="font-semibold text-lg">Ochiga AI</span>

          {/* 3-Dot Button (active state, no action) */}
          <button className="p-2 rounded-md active:scale-95 transition">
            <BsThreeDots size={22} />
          </button>
        </div>
      </div>

      {/* ───── Dark Overlay ───── */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ───── Slide Menu ───── */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[80%] max-w-[300px]
          bg-gray-900 border-r border-white/10
          shadow-xl z-50 p-4 pt-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Search Bar */}
        <div className="mb-5">
          <div className="flex items-center gap-2 bg-gray-800/70 p-2 rounded-md border border-white/10">
            <FiSearch size={18} className="opacity-60" />
            <input
              type="text"
              placeholder="Search modules, devices..."
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          <button className="w-full p-3 rounded-lg bg-gray-800/50 border border-white/5 active:scale-[0.97] transition text-left">
            Dashboard
          </button>

          <button className="w-full p-3 rounded-lg bg-gray-800/50 border border-white/5 active:scale-[0.97] transition text-left">
            CCTV
          </button>

          <button className="w-full p-3 rounded-lg bg-gray-800/50 border border-white/5 active:scale-[0.97] transition text-left">
            Lights
          </button>

          <button className="w-full p-3 rounded-lg bg-gray-800/50 border border-white/5 active:scale-[0.97] transition text-left">
            Rooms
          </button>
        </div>

        {/* Footer Profile */}
        <div className="absolute bottom-5 left-0 right-0 px-4">
          <div className="p-3 bg-gray-800/40 rounded-lg border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <FiUser size={20} />
              <span className="font-medium">Profile</span>
            </div>

            <div className="pl-9 space-y-2">
              <button className="block text-sm opacity-80 active:scale-95 transition">
                Settings
              </button>
              <button className="block text-sm opacity-80 active:scale-95 transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
