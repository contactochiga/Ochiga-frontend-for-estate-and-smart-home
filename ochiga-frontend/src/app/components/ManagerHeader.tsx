"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
  UserCircleIcon,
  UsersIcon,
  BriefcaseIcon,
  ChartBarIcon,
  MegaphoneIcon,
  ExclamationTriangleIcon,
  LifebuoyIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function ManagerHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const profileRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  // Outside click handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }

    if (profileOpen || searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen, searchOpen]);

  const menuItems = [
    { name: "Residents", href: "/manager-dashboard/residents", icon: UsersIcon },
    { name: "Staff", href: "/manager-dashboard/staff", icon: BriefcaseIcon },
    { name: "Reports", href: "/manager-dashboard/reports", icon: ChartBarIcon },
    { name: "Announcements", href: "/manager-dashboard/announcements", icon: MegaphoneIcon },
    { name: "Complaints", href: "/manager-dashboard/complaints", icon: ExclamationTriangleIcon },
    { name: "Devices", href: "/manager-dashboard/devices", icon: Cog6ToothIcon },
    { name: "Support / Help", href: "/manager-dashboard/help", icon: LifebuoyIcon },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center space-x-3">
          <button onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <h1 className="text-lg font-bold text-green-600 dark:text-green-400">
            Ochiga
          </h1>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div ref={searchRef} className="relative flex items-center">
            <button onClick={() => setSearchOpen(!searchOpen)}>
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>
            {searchOpen && (
              <div className="absolute top-10 right-0 w-64 px-4 pb-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            )}
          </div>

          {/* Chat & Bell */}
          <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />

          {/* Profile */}
          <div className="relative flex items-center justify-center" ref={profileRef}>
            <button onClick={() => setProfileOpen(!profileOpen)}>
              <UserCircleIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
            </button>

            {profileOpen && (
              <div className="absolute top-10 right-0 z-50 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2">
                <button
                  onClick={() => router.push("/manager-dashboard/profile")}
                  className={`flex items-center space-x-2 w-full text-left px-4 py-2 text-sm ${
                    pathname === "/manager-dashboard/profile"
                      ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => router.push("/manager-dashboard/settings")}
                  className={`flex items-center space-x-2 w-full text-left px-4 py-2 text-sm ${
                    pathname === "/manager-dashboard/settings"
                      ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <Cog6ToothIcon className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <XMarkIcon className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Drawer */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-green-600 dark:text-green-400">
                Management Tools
              </h2>
              <button onClick={() => setSidebarOpen(false)}>
                <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </button>
            </div>
            <ul className="space-y-4 text-gray-700 dark:text-gray-200">
              {menuItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li
                    key={item.name}
                    className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md ${
                      isActive
                        ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-white"
                        : "hover:text-green-600"
                    }`}
                    onClick={() => {
                      setSidebarOpen(false);
                      router.push(item.href);
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
