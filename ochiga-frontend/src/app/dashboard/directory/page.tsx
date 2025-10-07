"use client";

import { UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const residents = [
    { id: 1, name: "John Ade", flat: "B-12", phone: "0901 234 5678" },
    { id: 2, name: "Mary Johnson", flat: "C-05", phone: "0803 111 2222" },
    { id: 3, name: "Ibrahim Musa", flat: "A-09", phone: "0812 789 6543" },
  ];

  const filtered = residents.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Community Directory
      </h1>

      {/* Search */}
      <div className="relative mb-6">
        <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search residents..."
          className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-[#800000] focus:outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <UserCircleIcon className="h-10 w-10 text-[#800000]" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{r.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Flat {r.flat}
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              📞 {r.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
