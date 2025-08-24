"use client";

import Image from "next/image";

export default function TopBar() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Ochiga Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/ochiga-logo.png" // 👉 replace with your logo in /public folder
            alt="Ochiga"
            width={32}
            height={32}
          />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Ochiga
          </span>
        </div>

        {/* Placeholder for menu or profile (optional) */}
        <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
          ☰
        </button>
      </div>
    </header>
  );
}
