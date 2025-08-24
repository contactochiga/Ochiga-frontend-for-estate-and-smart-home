"use client";

import Image from "next/image";

export default function TopBar() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left side: hamburger + logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger */}
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Ochiga Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/ochiga-logo.png" // place logo in /public
              alt="Ochiga"
              width={28}
              height={28}
            />
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Ochiga
            </span>
          </div>
        </div>

        {/* Right side: search + notifications + profile */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 10-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m8 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Notification dot */}
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Profile Avatar */}
          <button className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Image
              src="/user-avatar.png" // fallback image in /public
              alt="Profile"
              width={32}
              height={32}
              className="object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
