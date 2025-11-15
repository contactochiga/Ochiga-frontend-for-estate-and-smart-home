// ochiga-frontend/src/app/ai-dashboard/components/HamburgerMenu.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FiMenu, FiX, FiChevronDown, FiChevronUp, FiLogOut, FiSearch } from "react-icons/fi";
import { MdOutlinePerson, MdSettings } from "react-icons/md";

/**
 * Resident Hamburger Menu — matches Estate behavior but with Resident theme
 * Title: "My Home" (as requested)
 *
 * - Reads a simple auth-user fallback from localStorage / window for initials & name
 * - Sidebar push / backdrop / escape to close / click outside to close
 * - Profile area with initials circle, name, chevron to open dropdown
 * - Avatar click -> open profile handler (placeholder for real routing)
 * - Four quick links as placeholders (replace with real routes/actions later)
 *
 * Copy & paste directly.
 */

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
    // Try common places where frontend auth might expose the user
    if (typeof window !== "undefined") {
      // 1) window.__AUTH_USER__ (app might set this)
      // 2) localStorage "authUser" or "user"
      // 3) fallback nulls
      // NOTE: adapt these keys to your actual auth implementation later.
      // This will not throw if nothing exists.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const winUser = window.__AUTH_USER__;
      if (winUser && (winUser.name || winUser.email)) return { name: winUser.name, email: winUser.email };

      const raw = localStorage.getItem("authUser") || localStorage.getItem("user");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && (parsed.name || parsed.email)) return { name: parsed.name, email: parsed.email };
        } catch {
          // raw might be plain text (email or name)
          return { name: raw };
        }
      }
    }
  } catch (e) {
    // swallow - just return fallback below
  }
  return { name: "Resident User", email: null };
}

export default function ResidentHamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<UserInfo>({ name: "Resident User", email: null });
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // load user once
    const u = loadAuthUser();
    setUser(u);
  }, []);

  useEffect(() => {
    if (open) document.body.classList.add("sidebar-open");
    else document.body.classList.remove("sidebar-open");
  }, [open]);

  // Close on Escape
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

  // click outside to close (sidebar)
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    // clicking backdrop closes everything
    setOpen(false);
    setProfileOpen(false);
  }, []);

  // stop propagation when clicking inside sidebar so backdrop handler doesn't run
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  // Avatar / Profile handlers (replace console.log with router push or modal)
  const openProfile = () => {
    // placeholder — wire to your auth/profile route
    console.log("Open resident profile page");
    // e.g. router.push("/profile")
  };
  const openSettings = () => {
    console.log("Open resident settings");
  };
  const logout = () => {
    console.log("Perform logout");
    // e.g. call auth signout, then router.push("/auth/login")
  };

  const initials = getInitials(user?.name);

  // quick links placeholder - replace with actual navigation/actions
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
                setOpen((v) => !v);
                if (open) setProfileOpen(false);
              }}
              className="p-2 rounded-md active:scale-95 transition text-white"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>

            <span className="text-white font-semibold text-base">My Home</span>
          </div>

          {/* optional right-side action when closed */}
          {!open && (
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-md active:scale-95 transition text-white/90"
                aria-label="More"
                onClick={() => console.log("resident options")}
              >
                <FiSearch size={18} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* SIDEBAR */}
      <div
        className={`fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={handleBackdropClick}
          className={`absolute inset-0 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          style={{
            backgroundColor: open ? "rgba(0,0,0,0.38)" : "transparent",
            backdropFilter: open ? "blur(6px) saturate(.9)" : "none",
          }}
        />

        {/* Actual sliding panel */}
        <aside
          ref={sidebarRef}
          onClick={stopPropagation}
          className={`absolute top-0 left-0 h-[100dvh] w-[72%] max-w-[360px] z-50 transform transition-transform duration-400 ease-in-out
            ${open ? "translate-x-0" : "-translate-x-full"}`}
          style={{
            background: "linear-gradient(180deg, rgba(7,10,16,1) 0%, rgba(11,12,17,1) 100%)",
            borderRight: "1px solid rgba(255,255,255,0.03)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            borderTopRightRadius: 18,
            borderBottomRightRadius: 18,
            paddingTop: 84,
          }}
        >
          {/* Search */}
          <div className="px-4">
            <div className="flex items-center gap-3 bg-gray-800/60 rounded-xl px-3 py-2">
              <FiSearch className="text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search rooms, devices or scenes"
                className="bg-transparent outline-none text-sm text-gray-200 placeholder-gray-400 w-full"
                aria-label="Search"
              />
            </div>
          </div>

          {/* Quick Links */}
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

          {/* Divider filler */}
          <div className="flex-1" />

          {/* PROFILE FOOTER */}
          <div className="absolute bottom-0 left-0 w-full px-4 py-5 border-t border-white/6 bg-gradient-to-t from-transparent to-[rgba(255,255,255,0.01)]">
            <div className="flex items-center justify-between">
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <button
                  onClick={openProfile}
                  className="flex items-center gap-3 active:scale-95 transition"
                  aria-label="Open profile"
                >
                  <div
                    className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center text-lg font-semibold shadow-sm"
                    title={user?.name ?? "Resident User"}
                  >
                    {initials}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">
                      {user?.name ?? "Resident User"}
                    </p>
                    <p className="text-white/50 text-xs">
                      View profile
                    </p>
                  </div>
                </button>
              </div>

              {/* Chevron Control */}
              <div>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="p-2 rounded-md text-white/70 hover:bg-gray-800 transition"
                  aria-expanded={profileOpen}
                  aria-label="Profile options"
                >
                  {profileOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                </button>
              </div>
            </div>

            {/* DROPDOWN MENU */}
            {profileOpen && (
              <div className="mt-3 bg-gray-900/95 border border-white/6 rounded-xl shadow-xl overflow-hidden">
                <button
                  onClick={openProfile}
                  className="w-full flex items-center gap-3 px-4 py-3 text-white/95 hover:bg-gray-800 transition text-left"
                >
                  <MdOutlinePerson size={18} /> <span>Profile</span>
                </button>

                <button
                  onClick={openSettings}
                  className="w-full flex items-center gap-3 px-4 py-3 text-white/95 hover:bg-gray-800 transition text-left"
                >
                  <MdSettings size={18} /> <span>Settings</span>
                </button>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 transition text-left"
                >
                  <FiLogOut size={18} /> <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
