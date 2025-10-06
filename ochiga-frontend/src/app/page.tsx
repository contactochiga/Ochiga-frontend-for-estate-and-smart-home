"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserIcon,
  BuildingOfficeIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Preparing environment...");

  const handleClick = (path: string) => {
    setLoading(true);
    let messages = [
      "Initializing Ochiga environment...",
      "Connecting to smart infrastructure...",
      "Syncing dashboards...",
      "Loading modules...",
      "Almost ready...",
    ];

    let index = 0;
    const interval = setInterval(() => {
      setLoadingText(messages[index]);
      index++;
      if (index === messages.length) {
        clearInterval(interval);
        router.push(path);
      }
    }, 800);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-mono p-4">
        <div className="w-full max-w-sm">
          <p className="text-sm text-gray-400 mb-4 animate-pulse">
            {loadingText}
          </p>
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="animate-progress bg-gradient-to-r from-red-600 to-orange-500 h-1 w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">
        Welcome to <span className="text-red-700">Ochiga</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        {/* Manager Card */}
        <button
          onClick={() => handleClick("/manager-dashboard")}
          className="group relative bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center active:scale-95"
        >
          <BuildingOfficeIcon className="w-12 h-12 text-red-700 mb-3 group-hover:scale-110 transition-transform" />
          <p className="text-lg font-semibold text-gray-800 mb-1">
            Manager Portal
          </p>
          <p className="text-sm text-gray-500">Manage your estate dashboard</p>
        </button>

        {/* Resident Card */}
        <button
          onClick={() => handleClick("/dashboard")}
          className="group relative bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center active:scale-95"
        >
          <UserIcon className="w-12 h-12 text-blue-700 mb-3 group-hover:scale-110 transition-transform" />
          <p className="text-lg font-semibold text-gray-800 mb-1">
            Resident Portal
          </p>
          <p className="text-sm text-gray-500">Access your home dashboard</p>
        </button>
      </div>

      {/* Login button */}
      <button
        onClick={() => handleClick("/login")}
        className="mt-10 flex items-center gap-2 bg-gradient-to-r from-red-700 to-black text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        Go to Login
        <ArrowRightCircleIcon className="w-5 h-5" />
      </button>

      {/* Footer */}
      <p className="mt-8 text-gray-400 text-sm">© 2025 Ochiga Systems</p>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-progress {
          animation: progress 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
