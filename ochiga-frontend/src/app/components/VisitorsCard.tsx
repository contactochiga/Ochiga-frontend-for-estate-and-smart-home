"use client";

import { useState } from "react";
import {
  QrCodeIcon,
  ChevronRightIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation"; // ✅ import router

export default function VisitorsCard() {
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null);
  const router = useRouter(); // ✅ init router

  const visitors = [
    { name: "Tunde Abdul", date: "Visited 2 days ago" },
    { name: "Mary John", date: "Visited yesterday" },
  ];

  return (
    <div
      className="w-screen -mx-4 sm:-mx-6 md:-mx-8 
        p-6 rounded-2xl shadow-xl 
        bg-white/70 dark:bg-gray-800/60 
        backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 
        transition"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Visitors
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Recent history
        </span>
      </div>

      {/* Visitor list */}
      <div className="space-y-4">
        {visitors.map((v, i) => (
          <button
            key={i}
            onClick={() => setSelectedVisitor(v)}
            className="w-full flex items-center justify-between p-4 rounded-xl 
              bg-gray-100/70 dark:bg-gray-700/50 
              hover:bg-gray-200 dark:hover:bg-gray-600/70 
              transition"
          >
            <div className="flex items-center gap-3 text-left">
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full 
                bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
              >
                <UserIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {v.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {v.date}
                </p>
              </div>
            </div>
            <ChevronRightIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </button>
        ))}
      </div>

      {/* Invite button → now navigates to /dashboard/visitors */}
      <button
        onClick={() => router.push("/dashboard/visitors")}
        className="w-full flex items-center justify-center gap-2 py-4 mt-6 rounded-xl 
        bg-gradient-to-r from-indigo-600 to-purple-600 
        text-white font-medium shadow-lg hover:opacity-90 transition"
      >
        <QrCodeIcon className="h-5 w-5" />
        Invite Visitor
      </button>
    </div>
  );
}
