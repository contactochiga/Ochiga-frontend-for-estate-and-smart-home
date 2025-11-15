"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FiMenu, FiX, FiChevronDown, FiChevronUp, FiLogOut, FiSearch } from "react-icons/fi";
import { MdOutlinePerson, MdSettings } from "react-icons/md";

// Placeholder admin data — will connect to backend auth later
const AdminInfo = {
  name: "Estate Admin",
  email: "admin@estate.com",
};

function getInitials(name?: string | null) {
  if (!name) return "E";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function EstateHamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const initials = getInitials(AdminInfo.name);

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

  const handleBackdropClick = useCallback(() => {
    setOpen(false);
    setProfileOpen(false);
  }, []);

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const menuItems = [
    "Dashboard Overview",
    "Estate Management",
    "Lighting & Power",
    "Security & CCTV",
    "Residents & Access",
  ];

  return (
    <>
      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/70 backdrop-blur-xl border-b border-white/10 py-3">
        <div className="px-4 flex items-center justify-between">
          <button
            onClick={() => {
              setOpen((v) => !v);
              setProfileOpen(false);
            }}
            className="p-2 rounded-md text-white active:scale-[0.95] transition"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <span className="text-white font-semibold text-base">Estate Dashboard</span>

          {!open && (
            <button className="p-2 text-white/80 active:scale-95 transition">
              <FiSearch size={18} />
            </button>
          )}
        </div>
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/40 backdrop-blur-[6px] z-40 transition-opacity duration-300"
        />
      )}

      {/* SIDEBAR PANEL */}
      <aside
        ref={sidebarRef}
        onClick={stopPropagation}
        className={`fixed top-0 left-0 h-[100dvh] w-[72%] max-w-[350px] z-50
          transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          background: "linear-gradient(180deg, rgba(7,10,16,1) 0%, rgba(11,12,17,1) 100%)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
          paddingTop: 84,
        }}
      >
        {/* SEARCH BAR */}
        <div className="px-4">
          <div className="flex items-center gap-3 bg-gray-800/60 rounded-xl px-3 py-2">
            <FiSearch className="text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search estate..."
              className="bg-transparent text-sm text-gray-200 placeholder-gray-400 w-full outline-none"
            />
          </div>
        </div>

        {/* MENU LIST */}
        <nav className="px-4 mt-4 space-y-2">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className="w-full text-left py-3 px-3 rounded-lg hover:bg-gray-800/80
              transition text-white/90 font-medium active:scale-[0.97]"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* PROFILE FOOTER */}
        <div className="absolute bottom-0 left-0 w-full px-4 py-5 border-t border-white/10 bg-gradient-to-t from-transparent to-black/10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => console.log("Profile")}
              className="flex items-center gap-3 active:scale-95 transition"
            >
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold shadow-sm">
                {initials}
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">{AdminInfo.name}</p>
                <p className="text-white/50 text-xs">View Profile</p>
              </div>
            </button>

            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="p-2 text-white/70 hover:bg-gray-800 rounded-lg transition"
            >
              {profileOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>

          {profileOpen && (
            <div className="mt-3 bg-gray-900/95 border border-white/10 rounded-xl shadow-xl overflow-hidden">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-gray-800 transition">
                <MdOutlinePerson size={18} /> Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-gray-800 transition">
                <MdSettings size={18} /> Settings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 transition">
                <FiLogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
