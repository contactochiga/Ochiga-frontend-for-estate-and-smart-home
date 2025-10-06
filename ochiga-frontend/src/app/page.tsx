"use client";

import { useState, useEffect } from "react";
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
  const [bgIndex, setBgIndex] = useState(0);

  const bgImages = [
    {
      src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1920&q=80",
      caption: "Future-ready smart estates",
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
      caption: "Smart home automation at your fingertips",
    },
    {
      src: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1920&q=80",
      caption: "Connected devices, seamless living",
    },
    {
      src: "https://images.unsplash.com/photo-1616486248646-3d9b4a6e8a43?auto=format&fit=crop&w=1920&q=80",
      caption: "Convenience powered by innovation",
    },
  ];

  const startLoading = (path: string) => {
    setLoading(true);
    let messages = [
      "Initializing Ochiga environment...",
      "Connecting to smart infrastructure...",
      "Syncing dashboards...",
      "Loading devices and automation...",
      "Almost ready...",
    ];

    let i = 0;
    const msgInterval = setInterval(() => {
      setLoadingText(messages[i]);
      i++;
      if (i === messages.length) {
        clearInterval(msgInterval);
        router.push(path);
      }
    }, 1200);
  };

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return (
      <div className="relative flex flex-col items-center justify-center h-screen text-white overflow-hidden">
        {/* Background images */}
        {bgImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === bgIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.5)",
            }}
          ></div>
        ))}

        {/* Overlay text */}
        <div className="relative z-10 text-center px-4">
          <h2 className="text-xl md:text-3xl font-semibold mb-2 animate-pulse">
            {bgImages[bgIndex].caption}
          </h2>
          <p className="text-sm text-gray-300 mb-4">{loadingText}</p>

          {/* Progress line */}
          <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
            <div className="animate-progress bg-gradient-to-r from-red-600 to-orange-500 h-1 w-full"></div>
          </div>
        </div>

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
            animation: progress 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // Default selection screen
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">
        Welcome to <span className="text-red-700">Ochiga</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        {/* Manager Card */}
        <button
          onClick={() => startLoading("/manager-dashboard")}
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
          onClick={() => startLoading("/dashboard")}
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
        onClick={() => startLoading("/login")}
        className="mt-10 flex items-center gap-2 bg-gradient-to-r from-red-700 to-black text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        Go to Login
        <ArrowRightCircleIcon className="w-5 h-5" />
      </button>

      <p className="mt-8 text-gray-400 text-sm">© 2025 Ochiga Systems</p>
    </div>
  );
}
