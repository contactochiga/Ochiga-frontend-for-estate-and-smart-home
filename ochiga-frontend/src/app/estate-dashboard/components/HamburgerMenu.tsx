"use client";

import { useEffect, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBolt,
  FaBuilding,
  FaUsers,
  FaMoneyBill,
} from "react-icons/fa";

export default function EstateHamburgerMenu() {
  const [open, setOpen] = useState(false);

  // toggle body class so other elements (pushable) can react
  useEffect(() => {
    if (open) document.body.classList.add("sidebar-open");
    else document.body.classList.remove("sidebar-open");
  }, [open]);

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <header className="fixed top-0 left-0 w-full z-[60] bg-transparent px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger / X Button */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md bg-gray-800/60 hover:bg-gray-800 transition text-white"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>

          <span className="text-white text-sm md:text-base font-medium tracking-wide">
            Estate Dashboard
          </span>
        </div>
      </header>

      {/* PUSH-AWAY DASHBOARD OVERLAY (captures click to close) */}
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

      {/* Sliding side menu */}
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
        onClick={(e) => e.stopPropagation()} // allow clicks inside menu
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-5">
          {/* Search */}
          <div className="mb-8 mt-2">
            <input
              type="text"
              placeholder="Search residents, devices or panels"
              className="w-full px-4 py-2 rounded-xl bg-gray-800/60 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
            />
          </div>

          {/* Menu Items */}
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

          {/* Profile bottom */}
          <div className="border-t border-gray-800 pt-4 mt-4">
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
