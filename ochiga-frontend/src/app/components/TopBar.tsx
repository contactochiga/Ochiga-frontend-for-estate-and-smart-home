"use client";

import { useState } from "react";
import Image from "next/image";
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
  ShieldCheckIcon,
  ArrowLeftOnRectangleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      {/* 🔹 Sticky Header */}
      <header
        className="sticky top-0 z-50 w-screen -mx-4 sm:-mx-6 md:-mx-8 
        bg-white/70 dark:bg-gray-900/60 
        backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 
        shadow-lg transition"
      >
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Left side: hamburger + logo */}
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

          {/* Right side */}
          <div className="flex items-center gap-4 relative">
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

            {/* Profile Menu */}
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
                  <a href="/profile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    <UserIcon className="h-4 w-4 mr-2" /> My Profile
                  </a>
                  <a href="/settings" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Cog6ToothIcon className="h-4 w-4 mr-2" /> Settings
                  </a>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {darkMode ? (
                      <>
                        <SunIcon className="h-4 w-4 mr-2" /> Light Mode
                      </>
                    ) : (
                      <>
                        <MoonIcon className="h-4 w-4 mr-2" /> Dark Mode
                      </>
                    )}
                  </button>
                  <a href="/security" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    <ShieldCheckIcon className="h-4 w-4 mr-2" /> Security
                  </a>
                  <a href="/activity" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    <ClockIcon className="h-4 w-4 mr-2" /> My Activity
                  </a>
                  <a href="/logout" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
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
          {/* Announcements → Community Page */}
          <a
            href="/dashboard/community"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:underline"
          >
            <MegaphoneIcon className="h-5 w-5" /> Announcements
          </a>

          {/* Maintenance → Maintenance Page */}
          <a
            href="/dashboard/maintenance"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:underline"
          >
            <WrenchScrewdriverIcon className="h-5 w-5" /> Maintenance Requests
          </a>

          {/* Utilities → Utilities Page */}
          <a
            href="/dashboard/Utilities"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:underline"
          >
            <BoltIcon className="h-5 w-5" /> Utilities
          </a>

          {/* 🔹 Placeholders for future */}
          <a href="/directory" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:underline">
            <UsersIcon className="h-5 w-5" /> Directory
          </a>
          <a href="/reports" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:underline">
            <ChartBarIcon className="h-5 w-5" /> Reports & History
          </a>
          <a href="/help" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:underline">
            <QuestionMarkCircleIcon className="h-5 w-5" /> Help & Support
          </a>
          <a href="/legal" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:underline">
            <DocumentTextIcon className="h-5 w-5" /> Legal & Policies
          </a>
        </nav>
      </aside>
    </>
  );
}
