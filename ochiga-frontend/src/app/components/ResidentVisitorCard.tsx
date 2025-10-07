"use client";

import { useState } from "react";
import {
  QrCodeIcon,
  ChevronRightIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function ResidentVisitorCard() {
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null);
  const router = useRouter();

  const visitors = [
    { name: "Tunde Abdul", date: "Visited 2 days ago" },
    { name: "Mary John", date: "Visited yesterday" },
  ];

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 p-5">
      {/* Header */}
      <div
        onClick={() => router.push("/dashboard/visitors")}
        className="flex items-center justify-between mb-5 cursor-pointer hover:opacity-80 transition"
      >
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          Visitors
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Recent history
        </span>
      </div>

      {/* Visitor list */}
      <div className="space-y-3">
        {visitors.map((v, i) => (
          <button
            key={i}
            onClick={() => router.push("/dashboard/visitors")}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-[#800000] to-black text-white">
                <UserIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {v.name}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {v.date}
                </p>
              </div>
            </div>
            <ChevronRightIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </button>
        ))}
      </div>

      {/* Invite button */}
      <button
        onClick={() => router.push("/dashboard/visitors")}
        className="w-full flex items-center justify-center gap-2 py-2.5 mt-5 rounded-lg bg-gradient-to-r from-[#800000] to-black text-white text-sm font-medium shadow-md hover:opacity-90 transition"
      >
        <QrCodeIcon className="h-4 w-4" />
        Invite Visitor
      </button>
    </div>
  );
}
