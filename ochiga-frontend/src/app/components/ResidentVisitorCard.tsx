"use client";

import { useState } from "react";
import {
  QrCodeIcon,
  ChevronRightIcon,
  UserIcon,
  XMarkIcon,
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
    <div className="relative w-full rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 p-6">
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
        {visitors.length > 0 ? (
          visitors.map((v, i) => (
            <button
              key={i}
              onClick={() => setSelectedVisitor(v)}
              className="w-full flex items-center justify-between p-4 rounded-xl 
                bg-gray-100 dark:bg-gray-800 
                hover:bg-gray-200 dark:hover:bg-gray-700 
                transition border border-transparent hover:border-[#800000]/40"
            >
              <div className="flex items-center gap-3 text-left">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full 
                  bg-gradient-to-br from-[#800000] to-black text-white"
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
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
            No visitors yet.
          </p>
        )}
      </div>

      {/* Invite button */}
      <button
        onClick={() => router.push("/dashboard/visitors")}
        className="w-full flex items-center justify-center gap-2 py-4 mt-6 rounded-xl 
          bg-gradient-to-r from-[#800000] to-black 
          text-white font-medium shadow-lg hover:opacity-90 transition"
      >
        <QrCodeIcon className="h-5 w-5" />
        Invite Visitor
      </button>

      {/* Modal */}
      {selectedVisitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-11/12 max-w-sm relative animate-fadeIn">
            <button
              onClick={() => setSelectedVisitor(null)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full 
                bg-gradient-to-br from-[#800000] to-black text-white mb-3"
              >
                <UserIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedVisitor.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {selectedVisitor.date}
              </p>

              {/* QR placeholder */}
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                <QrCodeIcon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Show this code at the gate for easy access.
              </p>

              <button
                onClick={() => setSelectedVisitor(null)}
                className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-[#800000] to-black text-white font-medium shadow hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out forwards;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
