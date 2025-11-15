"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronDown, FiChevronUp, FiLogOut } from "react-icons/fi";
import { MdOutlinePerson, MdSettings } from "react-icons/md";

export default function EstateHamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.classList.add("sidebar-open");
    else document.body.classList.remove("sidebar-open");
  }, [open]);

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
      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0f12]/80 backdrop-blur-lg border-b border-white/10 py-3">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setOpen(!open);
                setProfileOpen(false);
              }}
              className="p-2 rounded-md text-white active:scale-95 transition"
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
            <span className="text-white font-semibold text-base">
              Estate Dashboard
            </span>
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-[100dvh] w-[72%] max-w-[350px] z-40 
        bg-[#0d0f12]/95 backdrop-blur-xl shadow-2xl border-r border-white/5
        transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="pt-20 px-4 space-y-2">
          {[
            "Dashboard Overview",
            "Estate Management",
            "Lighting & Power",
            "Security & CCTV",
            "Residents & Access",
          ].map((item, i) => (
            <button
              key={i}
              className="w-full text-left py-3 px-3 rounded-lg
              hover:bg-gray-800/70 transition text-white/90 font-medium
              active:scale-[0.97]"
            >
              {item}
            </button>
          ))}
        </div>

        {/* FOOTER PROFILE */}
        <div className="absolute bottom-0 left-0 w-full px-4 py-5 border-t border-white/10">
          <div className="flex items-center justify-between">
            {/* Avatar + Name */}
            <button
              onClick={() => console.log("Open Profile Page")}
              className="flex items-center gap-3 active:scale-95 transition"
            >
              <div className="w-12 h-12 rounded-full bg-gray-700 text-white
              flex items-center justify-center text-lg font-semibold">
                E
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Estate Admin</p>
                <p className="text-white/50 text-xs">View Profile</p>
              </div>
            </button>

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="p-2 rounded-md text-white/70"
            >
              {profileOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
          </div>

          {/* DROPDOWN MENU */}
          {profileOpen && (
            <div className="mt-3 bg-[#16191d]/95 border border-white/10 rounded-xl shadow-xl animate-slide-down">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white/85 hover:bg-gray-800/70 transition">
                <MdOutlinePerson size={18} /> Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white/85 hover:bg-gray-800/70 transition">
                <MdSettings size={18} /> Settings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800/70 transition">
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
