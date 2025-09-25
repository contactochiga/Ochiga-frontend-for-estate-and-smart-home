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
  UserIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function ManagerHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Ensure component is only interactive after mount (avoids hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdowns if clicked outside
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Residents", href: "/manager-dashboard/residents", icon: UsersIcon },
    { name: "Staff", href: "/manager-dashboard/staff", icon: BriefcaseIcon },
    { name: "Reports", href: "/manager-dashboard/reports", icon: ChartBarIcon },
    { name: "Announcements", href: "/manager-dashboard/announcements", icon: MegaphoneIcon },
    { name: "Complaints", href: "/manager-dashboard/complaints", icon: ExclamationTriangleIcon },
    { name: "Devices", href: "/manager-dashboard/devices", icon: Cog6ToothIcon },
    { name: "Support / Help", href: "/manager-dashboard/help", icon: LifebuoyIcon },
  ];

  const profileItems = [
    { name: "My Profile", href: "/manager-dashboard/profile", icon: UserIcon },
    { name: "Settings", href: "/manager-dashboard/settings", icon: Cog8ToothIcon },
    { name: "Logout", href: "/logout", icon: ArrowRightOnRectangleIcon, danger: true },
  ];

  if (!mounted) {
    // Render only static header on server to avoid mismatches
    return (
      <header className="fixed top-0 left-0 w-full z-50 flex flex-col bg-white dark:bg-gray-800 shadow">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            <h1 className="text-lg font-bold text-green-600 dark:text-green-400">
              Ochiga
            </h1>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col bg-white dark:bg-gray-800 shadow">
      {/* Top bar */}
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
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileOpen(!profileOpen)}>
              <UserCircleIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
            </button>

            {profileOpen && (
              <div className="absolute top-12 right-0 z-50 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 transition-opacity duration-200">
                <ul className="space-y-2">
                  {profileItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                      <li
                        key={item.name}
                        className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md ${
                          isActive
                            ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-white"
                            : item.danger
                            ? "text-red-600 hover:bg-red-100 dark:hover:bg-red-700"
                            : "hover:text-green-600"
                        }`}
                        onClick={() => {
                          setProfileOpen(false);
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
            )}
          </div>
        </div>
      </div>

      {/* Slide-down search */}
      <div
        ref={searchRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          searchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
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
