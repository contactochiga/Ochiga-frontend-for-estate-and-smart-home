"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import {
  FaHome,
  FaRegBuilding,
  FaVideo,
  FaUserCircle,
  FaLightbulb,
} from "react-icons/fa";

export default function EstateHamburgerMenu() {
  const [open, setOpen] = useState(false);

  // Push-away effect
  useEffect(() => {
    if (open) document.body.classList.add("sidebar-open");
    else document.body.classList.remove("sidebar-open");
  }, [open]);

  // Escape key support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ─────────────────────────────── TOP BAR (FULL WIDTH) ─────────────────────────────── */}
      <header
        className="
        fixed top-0 left-0 right-0 z-50
        bg-gray-900/70 backdrop-blur-xl
        border-b border-white/10
        py-3
      "
      >
        <div className="px-4 flex items-center justify-between">
          {/* Left: Hamburger + Caption */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-md active:scale-95 transition text-white"
            >
              <FiMenu size={22} />
            </button>

            <span className="text-white font-semibold text-base">
              Estate Dashboard
            </span>
          </div>

          {/* Right: 3-Dot Button */}
          <button className="p-2 rounded-md active:scale-95 transition text-white">
            <BsThreeDots size={22} />
          </button>
        </div>
      </header>

      {/* ─────────────────────────────── OVERLAY ─────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backdropFilter: open ? "blur(5px)" : "none",
          backgroundColor: open ? "rgba(0, 0, 0, 0.45)" : "transparent",
        }}
        onClick={() => setOpen(false)}
      />

      {/* ─────────────────────────────── SIDE MENU ─────────────────────────────── */}
      <aside
        className={`
        fixed top-0 left-0 h-[100dvh] w-[70%] max-w-[360px] z-50
        transform transition-transform duration-500
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
        style={{
          background: "linear-gradient(180deg, #070A10 0%, #0C0D11 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.65)",
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-5">
          {/* SEARCH */}
          <div className="mb-7 mt-1">
            <input
              type="text"
              placeholder="Search houses, estates or devices"
              className="
                w-full px-4 py-2.5 rounded-xl
                bg-gray-800/60 border border-gray-700
                text-gray-200 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-emerald-500
              "
            />
          </div>

          {/* NAV ITEMS */}
          <nav className="flex flex-col gap-5 text-gray-300 flex-1">
            <button className="flex items-center gap-3 hover:text-white active:scale-[0.97] transition">
              <FaHome className="text-lg" /> <span>Dashboard Overview</span>
            </button>

            <button className="flex items-center gap-3 hover:text-white active:scale-[0.97] transition">
              <FaRegBuilding className="text-lg" /> <span>Estate Management</span>
            </button>

            <button className="flex items-center gap-3 hover:text-white active:scale-[0.97] transition">
              <FaLightbulb className="text-lg" /> <span>Lighting & Power</span>
            </button>

            <button className="flex items-center gap-3 hover:text-white active:scale-[0.97] transition">
              <FaVideo className="text-lg" /> <span>Security & CCTV</span>
            </button>

            <button className="flex items-center gap-3 hover:text-white active:scale-[0.97] transition">
              <FaUserCircle className="text-lg" /> <span>My Profile</span>
            </button>
          </nav>

          {/* FOOTER PROFILE */}
          <div className="border-t border-gray-800 pt-4 mt-4">
            <button className="flex items-center gap-4 hover:text-white active:scale-[0.97] transition w-full">
              <div className="bg-emerald-600 text-white rounded-full w-11 h-11 flex items-center justify-center text-lg font-semibold shadow-md">
                E
              </div>

              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">Estate Admin</span>
                <span className="text-xs text-gray-500">Profile · Settings · Logout</span>
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
