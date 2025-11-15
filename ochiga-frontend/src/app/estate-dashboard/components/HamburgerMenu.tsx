"use client";

import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiLogOut,
} from "react-icons/fi";
import { MdOutlinePerson, MdSettings } from "react-icons/md";

export default function EstateHamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // toggle body class so other layouts can react (pushable)
  useEffect(() => {
    if (open) document.body.classList.add("sidebar-open");
    else document.body.classList.remove("sidebar-open");
  }, [open]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* TOP BAR: hamburger on left — header remains unchanged when sidebar opens */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setOpen((v) => !v);
              if (open) setProfileOpen(false);
            }}
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2 rounded-md bg-gray-800/60 hover:bg-gray-800 transition text-white"
          >
            {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>

          <span className="text-white text-sm md:text-base font-medium tracking-wide">
            Estate Dashboard
          </span>
        </div>

        {/* optional right-side control kept minimal */}
        <div />
      </header>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-[100dvh] w-[72%] max-w-[360px] z-40 transform transition-transform duration-300 ease-in-out
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
        {/* top spacer so header doesn't overlap */}
        <div className="h-16" />

        {/* SEARCH (inside sidebar, like resident) */}
        <div className="px-4 mt-2">
          <div className="flex items-center bg-gray-800/60 rounded-xl px-3 py-2">
            <FiSearch className="opacity-50 text-gray-300" size={18} />
            <input
              type="text"
              placeholder="Search houses, estates or devices"
              className="bg-transparent outline-none text-sm ml-3 w-full text-gray-100 placeholder-gray-400"
            />
          </div>
        </div>

        {/* NAV ITEMS */}
        <nav className="px-4 mt-6 space-y-2 text-gray-200">
          <button className="w-full text-left py-3 px-3 rounded-lg hover:bg-gray-800 transition active:scale-[0.98]">
            Dashboard Overview
          </button>
          <button className="w-full text-left py-3 px-3 rounded-lg hover:bg-gray-800 transition active:scale-[0.98]">
            Estate Management
          </button>
          <button className="w-full text-left py-3 px-3 rounded-lg hover:bg-gray-800 transition active:scale-[0.98]">
            Lighting & Power
          </button>
          <button className="w-full text-left py-3 px-3 rounded-lg hover:bg-gray-800 transition active:scale-[0.98]">
            Security & CCTV
          </button>
          <button className="w-full text-left py-3 px-3 rounded-lg hover:bg-gray-800 transition active:scale-[0.98]">
            Residents & Access
          </button>
        </nav>

        {/* PROFILE FOOTER */}
        <div className="absolute bottom-0 left-0 w-full px-4 py-5 border-t border-white/6 bg-gradient-to-t from-black/40 to-transparent">
          <div className="flex items-center justify-between">
            {/* Clicking avatar area should open profile page (placeholder handler) */}
            <button
              onClick={() => {
                // placeholder — replace with router push or auth profile open
                console.log("Open Profile Page");
              }}
              className="flex items-center gap-3 active:scale-95 transition"
            >
              <div
                className="w-12 h-12 rounded-full bg-rose-600 text-white
                flex items-center justify-center text-lg font-semibold"
                aria-hidden
              >
                E
              </div>

              <div className="text-left">
                <p className="text-white font-semibold text-sm">Estate Admin</p>
                <p className="text-white/50 text-xs">View profile</p>
              </div>
            </button>

            {/* Chevron toggles dropdown actions */}
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="p-2 rounded-md text-white/70"
              aria-label="Profile options"
            >
              {profileOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
          </div>

          {/* DROPDOWN */}
          {profileOpen && (
            <div className="mt-3 bg-gray-900/95 border border-white/5 rounded-xl shadow-xl overflow-hidden">
              <button
                onClick={() => console.log("Open profile")}
                className="w-full flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-gray-800 transition"
              >
                <MdOutlinePerson size={18} /> Profile
              </button>
              <button
                onClick={() => console.log("Open settings")}
                className="w-full flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-gray-800 transition"
              >
                <MdSettings size={18} /> Settings
              </button>
              <button
                onClick={() => console.log("Logout")}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 transition"
              >
                <FiLogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => {
            setOpen(false);
            setProfileOpen(false);
          }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
}
