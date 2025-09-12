"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MegaphoneIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  UsersIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <>
      {/* 🔹 Sticky Header */}
      <header
        className="sticky top-0 z-50 w-full 
        bg-white/70 dark:bg-gray-900/60 
        backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 
        shadow-md transition"
      >
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <Image src="/ochiga-logo.png" alt="Ochiga" width={28} height={28} />
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Ochiga
              </span>
            </div>
          </div>

          {/* Right: Notification + Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 10-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m8 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-600 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <Image
                  src="/user-avatar.png"
                  alt="Profile"
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 py-2">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <UserIcon className="h-4 w-4 mr-2" /> My Profile
                  </Link>

                  <Link
                    href="/dashboard/settings"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Cog6ToothIcon className="h-4 w-4 mr-2" /> Settings
                  </Link>

                  {/* Dark Mode Toggle Switch */}
                  <div className="flex items-center justify-between px-4 py-2 text-sm">
                    <span className="flex items-center gap-2">
                      {darkMode ? (
                        <MoonIcon className="h-4 w-4" />
                      ) : (
                        <SunIcon className="h-4 w-4" />
                      )}
                      {darkMode ? "Dark Mode" : "Light Mode"}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={toggleTheme}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 relative">
                        <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-4"></span>
                      </div>
                    </label>
                  </div>

                  {/* Logout */}
                  <a
                    href="/logout"
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2" /> Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 🔹 Slide-out Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <span className="font-semibold text-gray-800 dark:text-gray-100">Estate Tools</span>
          <button onClick={() => setIsOpen(false)} className="p-1">✕</button>
        </div>

        <nav className="p-4 space-y-3">
          <a href="/dashboard/community" className="flex items-center gap-2 hover:underline">
            <MegaphoneIcon className="h-5 w-5" /> Announcements
          </a>
          <a href="/dashboard/maintenance" className="flex items-center gap-2 hover:underline">
            <WrenchScrewdriverIcon className="h-5 w-5" /> Maintenance Requests
          </a>
          <a href="/dashboard/utilities" className="flex items-center gap-2 hover:underline">
            <BoltIcon className="h-5 w-5" /> Utilities
          </a>
          <a href="/directory" className="flex items-center gap-2 hover:underline">
            <UsersIcon className="h-5 w-5" /> Directory
          </a>
          <a href="/reports" className="flex items-center gap-2 hover:underline">
            <ChartBarIcon className="h-5 w-5" /> Reports & History
          </a>
          <a href="/help" className="flex items-center gap-2 hover:underline">
            <QuestionMarkCircleIcon className="h-5 w-5" /> Help & Support
          </a>
          <a href="/legal" className="flex items-center gap-2 hover:underline">
            <DocumentTextIcon className="h-5 w-5" /> Legal & Policies
          </a>
        </nav>
      </aside>
    </>
  );
}
