"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiX, FiChevronDown, FiChevronUp, FiLogOut, FiSearch } from "react-icons/fi";
import { MdOutlinePerson, MdSettings } from "react-icons/md";

type UserInfo = {
  name?: string | null;
  email?: string | null;
};

function getInitials(name?: string | null) {
  if (!name) return "R";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0].slice(0, 1) + parts[parts.length - 1].slice(0, 1)).toUpperCase();
}

function loadAuthUser(): UserInfo {
  try {
    if (typeof window !== "undefined") {
      const winUser = (window as any).__AUTH_USER__;
      if (winUser && (winUser.name || winUser.email))
        return { name: winUser.name, email: winUser.email };

      const raw = localStorage.getItem("authUser");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && (parsed.name || parsed.email)) return parsed;
        } catch {
          return { name: raw };
        }
      }
    }
  } catch {}

  return { name: "Resident User", email: null };
}

export default function ResidentHamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<UserInfo>({ name: "Resident User", email: null });

  // 🔥 Added for logout confirmation modal
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const u = loadAuthUser();
    setUser(u);
  }, []);

  useEffect(() => {
    if (open) document.body.classList.add("sidebar-open");
    else document.body.classList.remove("sidebar-open");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setProfileOpen(false);
        setShowLogoutConfirm(false);
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

  const openProfile = () => router.push("/profile");
  const openSettings = () => router.push("/settings");

  // 🔥 Logout now matches Estate logic
  const handleLogout = () => {
    try {
      localStorage.removeItem("authUser");
      sessionStorage.clear();
    } catch {}

    router.push("/auth");
  };

  const initials = getInitials(user?.name);

  const quickLinks = [
    { id: "q1", label: "Smart Devices", onClick: () => console.log("goto devices") },
    { id: "q2", label: "Lighting & Rooms", onClick: () => console.log("goto lights") },
    { id: "q3", label: "Security & CCTV", onClick: () => console.log("goto cctv") },
    { id: "q4", label: "Scenes & Automations", onClick: () => console.log("goto scenes") },
  ];

  return (
    <>
      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/70 backdrop-blur-xl border-b border-white/8 py-3">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setOpen(!open);
                if (open) setProfileOpen(false);
              }}
              className="p-2 rounded-md active:scale-95 transition text-white"
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>

            <span className="text-white font-semibold text-base">My Home</span>
          </div>

          {!open && (
            <button
              className="p-2 rounded-md active:scale-95 transition text-white/90"
            >
              <FiSearch size={18} />
            </button>
          )}
        </div>
      </header>

      {/* SIDEBAR */}
      <div
        className={`fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          onClick={handleBackdropClick}
          className={`absolute inset-0 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          } bg-black/40 backdrop-blur-sm`}
        />

        <aside
          ref={sidebarRef}
          onClick={stopPropagation}
          className={`absolute top-0 left-0 h-[100dvh] w-[72%] max-w-[360px] z-50 transform transition-transform duration-400 ease-in-out
            ${open ? "translate-x-0" : "-translate-x-full"}`}
          style={{
            background: "linear-gradient(180deg, rgba(7,10,16,1) 0%, rgba(11,12,17,1) 100%)",
            borderRight: "1px solid rgba(255,255,255,0.03)",
            borderTopRightRadius: 18,
            borderBottomRightRadius: 18,
            paddingTop: 84,
          }}
        >
          {/* SEARCH */}
          <div className="px-4">
            <div className="flex items-center gap-3 bg-gray-800/60 rounded-xl px-3 py-2">
              <FiSearch className="text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search rooms, devices or scenes"
                className="bg-transparent outline-none text-sm text-gray-200 placeholder-gray-400 w-full"
              />
            </div>
          </div>

          {/* QUICK LINKS */}
          <nav className="px-4 mt-4 space-y-2">
            {quickLinks.map((q) => (
              <button
                key={q.id}
                onClick={q.onClick}
                className="w-full text-left py-3 px-3 rounded-lg hover:bg-gray-800 transition text-white/95 font-medium active:scale-[0.97]"
              >
                {q.label}
              </button>
            ))}
          </nav>

          <div className="flex-1" />

          {/* PROFILE FOOTER */}
          <div className="absolute bottom-0 left-0 w-full px-4 py-5 border-t border-white/6 bg-gradient-to-t from-transparent to-[rgba(255,255,255,0.01)]">
            <div className="flex items-center justify-between">
              <button
                onClick={openProfile}
                className="flex items-center gap-3 active:scale-95 transition"
              >
                <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center text-lg font-semibold">
                  {initials}
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">{user?.name}</p>
                  <p className="text-white/50 text-xs">View profile</p>
                </div>
              </button>

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="p-2 rounded-md text-white/70 hover:bg-gray-800 transition"
              >
                {profileOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
              </button>
            </div>

            {profileOpen && (
              <div className="mt-3 bg-gray-900/95 border border-white/6 rounded-xl shadow-xl overflow-hidden">
                <button
                  onClick={openProfile}
                  className="w-full flex items-center gap-3 px-4 py-3 text-white/95 hover:bg-gray-800 transition"
                >
                  <MdOutlinePerson size={18} /> <span>Profile</span>
                </button>

                <button
                  onClick={openSettings}
                  className="w-full flex items-center gap-3 px-4 py-3 text-white/95 hover:bg-gray-800 transition"
                >
                  <MdSettings size={18} /> <span>Settings</span>
                </button>

                {/* 🔥 Logout now opens modal */}
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 transition"
                >
                  <FiLogOut size={18} /> <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* 🔥 LOGOUT CONFIRMATION MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="bg-gray-900 px-6 py-6 rounded-2xl w-full max-w-sm border border-gray-700">
            <p className="text-white text-center font-semibold text-lg mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-xl bg-gray-700 text-white font-medium"
              >
                No
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
