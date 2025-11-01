// ochiga-frontend/src/app/components/TopBar.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  UsersIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useDashboard } from "../context/DashboardContext";

export default function ResidentHeader() {
  const router = useRouter();
  const pathname = usePathname() || "";

  const profileRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const notifPanelRef = useRef<HTMLDivElement | null>(null);

  // ✅ Use DashboardContext
  const {
    notifications,
    hasNewNotif,
    sidebarOpen,
    profileOpen,
    searchOpen,
    addNotification,
    markNotifRead,
    toggleSidebar,
    toggleProfile,
    toggleSearch,
  } = useDashboard();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const t = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(t) && profileOpen) toggleProfile();
      if (searchRef.current && !searchRef.current.contains(t) && searchOpen) toggleSearch();
      if (notifPanelRef.current && !notifPanelRef.current.contains(t) && hasNewNotif) markNotifRead();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen, searchOpen, hasNewNotif, toggleProfile, toggleSearch, markNotifRead]);

  const menuItems = [
    { name: "Maintenance", href: "/dashboard/maintenance", icon: WrenchScrewdriverIcon },
    { name: "Utilities", href: "/dashboard/Utilities", icon: BoltIcon },
    { name: "Directory", href: "/dashboard/directory", icon: UsersIcon },
    { name: "Reports", href: "/dashboard/reports", icon: ChartBarIcon },
    { name: "Help & Support", href: "/dashboard/help", icon: QuestionMarkCircleIcon },
    { name: "Legal & Policies", href: "/dashboard/legal", icon: DocumentTextIcon },
  ];

  const openNotifPanel = () => {
    markNotifRead();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left */}
        <div className="flex items-center space-x-3">
          <button onClick={toggleSidebar} className="flex items-center justify-center">
            <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <h1 className="text-lg font-bold text-black dark:text-white">Ochiga</h1>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-5">
          {/* SEARCH */}
          <div ref={searchRef} className="relative flex items-center">
            <button onClick={toggleSearch} className="flex items-center justify-center">
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>
            {searchOpen && (
              <div className="absolute top-10 left-0 right-0 px-4 pb-3 z-50">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                />
              </div>
            )}
          </div>

          {/* MESSAGES */}
          <button
            onClick={() => router.push("/dashboard/messages")}
            aria-label="Messages"
            className="flex items-center justify-center"
          >
            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>

          {/* NOTIFICATIONS */}
          <div className="relative flex items-center justify-center" ref={notifPanelRef}>
            <button onClick={openNotifPanel} aria-label="Notifications">
              <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              {hasNewNotif && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#800000] ring-2 ring-white dark:ring-gray-800 animate-ping" />
              )}
            </button>

            <AnimatePresence>
              {hasNewNotif && (
                <>
                  <motion.div
                    className="fixed inset-0 backdrop-blur-sm z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={openNotifPanel}
                  />
                  <motion.div
                    className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl z-50"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Notifications
                      </h3>
                      <button onClick={openNotifPanel}>
                        <XMarkIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </button>
                    </div>
                    <div className="p-4 space-y-3 overflow-y-auto max-h-full">
                      {notifications.length === 0 ? (
                        <p className="text-sm text-gray-600 dark:text-gray-300">No notifications.</p>
                      ) : (
                        notifications.map((n, i) => (
                          <div key={i} className="py-2 border-b border-gray-100 dark:border-gray-800">
                            <p className="text-sm text-gray-700 dark:text-gray-200">{n}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* PROFILE */}
          <div className="relative flex items-center justify-center" ref={profileRef}>
            <button onClick={toggleProfile}>
              <UserCircleIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
            </button>

            {profileOpen && (
              <div className="absolute top-10 right-0 z-50 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2">
                <button
                  onClick={() => router.push("/dashboard/profile")}
                  className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => router.push("/dashboard/settings")}
                  className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  <Cog6ToothIcon className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <XMarkIcon className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
            />
            <motion.div
              className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 p-4"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#800000] dark:text-[#ffcccc]">
                  Resident Tools
                </h2>
                <button onClick={toggleSidebar}>
                  <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                </button>
              </div>

              <ul className="space-y-4 text-gray-700 dark:text-gray-200">
                {menuItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <li
                      key={item.name}
                      onClick={() => {
                        toggleSidebar();
                        router.push(item.href);
                      }}
                      className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md ${
                        isActive
                          ? "bg-[#800000]/10 text-[#800000] dark:bg-[#800000] dark:text-white"
                          : "hover:text-[#800000]"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
