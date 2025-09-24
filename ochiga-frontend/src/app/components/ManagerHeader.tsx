"use client";

import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function ManagerHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          {/* Search toggle */}
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />

          {/* Profile dropdown toggle */}
          <button onClick={() => setProfileOpen(!profileOpen)}>
            <UserCircleIcon className="w-7 h-7 text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      </div>

      {/* Slide-down search bar */}
      {searchOpen && (
        <div className="px-4 pb-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      )}

      {/* Profile Dropdown */}
      {profileOpen && (
        <div className="absolute top-14 right-4 z-50 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2">
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            My Profile
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            Settings
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            Support / Help
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            Logout
          </button>
        </div>
      )}

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
                Estate Menu
              </h2>
              <button onClick={() => setSidebarOpen(false)}>
                <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </button>
            </div>
            <ul className="space-y-4 text-gray-700 dark:text-gray-200">
              <li className="cursor-pointer hover:text-green-600">Houses</li>
              <li className="cursor-pointer hover:text-green-600">Requests</li>
              <li className="cursor-pointer hover:text-green-600">Finance</li>
              <li className="cursor-pointer hover:text-green-600">Community</li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
