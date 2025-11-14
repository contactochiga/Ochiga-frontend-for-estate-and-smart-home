"use client";

import { useEffect, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaLightbulb,
  FaFan,
  FaVideo,
  FaUserCircle,
} from "react-icons/fa";

export default function ResidentHamburgerMenu() {
  const [open, setOpen] = useState(false);

  // BODY CLASS FOR PUSH-AWAY EFFECT
  useEffect(() => {
    if (open) document.body.classList.add("sidebar-open");
    else document.body.classList.remove("sidebar-open");
  }, [open]);

  // ESC KEY CLOSE
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* 🔹 TOP BAR */}
      <header className="fixed top-0 left-0 w-full z-[60] bg-transparent px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Toggle Button */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md bg-gray-800/60 hover:bg-gray-800 transition text-white"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>

          <span className="text-white text-sm md:text-base font-medium tracking-wide">
            Resident Dashboard
          </span>
        </div>
      </header>

      {/* 🔹 OVERLAY (click to close) */}
      <div
        className={`fixed inset-0 z-[55] transition-opacity duration-400 ease-in-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backdropFilter: open ? "blur(6px) saturate(.9)" : "none",
          backgroundColor: open ? "rgba(0,0,0,0.38)" : "transparent",
        }}
        onClick={() => setOpen(false)}
      />

      {/* 🔹 SLIDING SIDE MENU */}
      <aside
        className={`fixed top-0 left-0 h-[100dvh] w-[70%] max-w-[360px] z-[60] transform transition-transform duration-500 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background:
            "linear-gradient(180deg, rgba(7,10,16,1) 0%, rgba(11,12,17,1) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.03)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-5">
          {/* 🔍 SEARCH */}
          <div className="mb-8 mt-2">
            <input
              type="text"
              placeholder="Search rooms, devices or scenes"
              className="w-full px-4 py-2 rounded-xl bg-gray-800/60 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
            />
          </div>

          {/* 🔹 MENU ITEMS */}
          <nav className="flex flex-col gap-6 text-gray-300 flex-1">
            <button className="flex items-center gap-3 text-left hover:text-white transition">
              <FaHome className="text-lg" /> <span>Home Overview</span>
            </button>

            <button className="flex items-center gap-3 text-left hover:text-white transition">
              <FaLightbulb className="text-lg" /> <span>Lights Control</span>
            </button>

            <button className="flex items-center gap-3 text-left hover:text-white transition">
              <FaFan className="text-lg" /> <span>Fans & Cooling</span>
            </button>

            <button className="flex items-center gap-3 text-left hover:text-white transition">
              <FaVideo className="text-lg" /> <span>Security Cameras</span>
            </button>

            <button className="flex items-center gap-3 text-left hover:text-white transition">
              <FaUserCircle className="text-lg" /> <span>My Profile</span>
            </button>
          </nav>

          {/* 👤 PROFILE FOOTER */}
          <div className="border-t border-gray-800 pt-4 mt-4">
            <button className="flex items-center gap-4 w-full hover:text-white transition">
              <div className="bg-blue-600 text-white rounded-full w-11 h-11 flex items-center justify-center text-lg font-semibold shadow-md">
                R
              </div>

              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">Resident User</span>
                <span className="text-xs text-gray-500">Settings • Logout</span>
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
