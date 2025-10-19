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
  const [scene, setScene] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing Ochiga environment...");
  const [backendStatus, setBackendStatus] = useState<"checking" | "connected" | "failed">("checking");

  // ✅ Automatically test backend connection when page loads
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Backend connected:", data);
        setBackendStatus("connected");
      })
      .catch((err) => {
        console.error("❌ Backend connection failed:", err);
        setBackendStatus("failed");
      });
  }, []);

  const scenes = [
    {
      caption: "Initializing Network...",
      logs: [
        "Connecting to Ochiga Smart Estate Core...",
        "Verifying node integrity...",
        "Establishing secure link...",
      ],
      bg: "from-[#0a0a0a] via-[#1b0033] to-[#330a4a]",
      graphic: (
        <svg
          viewBox="0 0 800 600"
          className="absolute inset-0 w-full h-full opacity-25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100,300 C200,250 400,350 500,300 S700,350 800,300"
            stroke="#bb86fc"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;100"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
          <circle cx="150" cy="300" r="8" fill="#ff4081">
            <animate
              attributeName="cx"
              values="150;750;150"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      ),
    },
    {
      caption: "Syncing Smart Home Devices...",
      logs: [
        "Pairing home automation nodes...",
        "Calibrating room sensors...",
        "Activating device control layer...",
      ],
      bg: "from-[#010a13] via-[#001f3f] to-[#012d5e]",
      graphic: (
        <svg
          viewBox="0 0 800 600"
          className="absolute inset-0 w-full h-full opacity-25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="250"
            y="200"
            width="300"
            height="200"
            rx="20"
            stroke="#00e0ff"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="400" cy="220" r="6" fill="#00e0ff">
            <animate
              attributeName="r"
              values="6;10;6"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="320" cy="320" r="4" fill="#00e0ff" />
          <circle cx="480" cy="320" r="4" fill="#00e0ff" />
        </svg>
      ),
    },
    {
      caption: "System Ready — Seamless Experience Active",
      logs: [
        "Finalizing user environment...",
        "Running optimization checks...",
        "Ochiga Infrastructure Online ✅",
      ],
      bg: "from-[#0b0b0b] via-[#003300] to-[#0f6600]",
      graphic: (
        <svg
          viewBox="0 0 800 600"
          className="absolute inset-0 w-full h-full opacity-25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="400" cy="300" r="100" stroke="#39ff14" strokeWidth="3" fill="none">
            <animate attributeName="r" values="90;110;90" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="300" r="6" fill="#39ff14" />
        </svg>
      ),
    },
  ];

  const startLoading = (path: string) => {
    setLoading(true);
    let step = 0;

    const nextScene = () => {
      if (step < scenes.length - 1) {
        step++;
        setScene(step);
        let msgIndex = 0;
        const msgInterval = setInterval(() => {
          setLoadingText(scenes[step].logs[msgIndex]);
          msgIndex++;
          if (msgIndex === scenes[step].logs.length) clearInterval(msgInterval);
        }, 1000);
      } else {
        setTimeout(() => router.push(path), 2000);
      }
    };

    const interval = setInterval(nextScene, 3500);
    return () => clearInterval(interval);
  };

  if (loading) {
    const current = scenes[scene];
    const progressWidth = `${((scene + 1) / scenes.length) * 100}%`;

    return (
      <div
        className={`relative flex flex-col items-center justify-center h-screen text-white overflow-hidden bg-gradient-to-br ${current.bg}`}
      >
        {current.graphic}

        <div className="relative z-10 text-center px-4">
          <h2 className="text-xl md:text-3xl font-semibold mb-2 animate-pulse">
            {current.caption}
          </h2>
          <p className="text-sm text-gray-300 mb-4 transition-all">{loadingText}</p>

          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
            <div
              className="bg-gradient-to-r from-red-600 to-orange-500 h-1 transition-all duration-1000"
              style={{ width: progressWidth }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Normal landing + backend connection indicator
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">
        Welcome to <span className="text-red-700">Ochiga</span>
      </h1>

      {/* ✅ Show backend connection status */}
      <p
        className={`mb-6 px-4 py-2 rounded-full text-sm ${
          backendStatus === "connected"
            ? "bg-green-100 text-green-700"
            : backendStatus === "failed"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {backendStatus === "checking"
          ? "Checking backend connection..."
          : backendStatus === "connected"
          ? "✅ Backend connected successfully!"
          : "⚠️ Backend not reachable"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        <button
          onClick={() => startLoading("/manager-dashboard")}
          className="group relative bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center active:scale-95"
        >
          <BuildingOfficeIcon className="w-12 h-12 text-red-700 mb-3 group-hover:scale-110 transition-transform" />
          <p className="text-lg font-semibold text-gray-800 mb-1">Manager Portal</p>
          <p className="text-sm text-gray-500">Manage your estate dashboard</p>
        </button>

        <button
          onClick={() => startLoading("/dashboard")}
          className="group relative bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center active:scale-95"
        >
          <UserIcon className="w-12 h-12 text-blue-700 mb-3 group-hover:scale-110 transition-transform" />
          <p className="text-lg font-semibold text-gray-800 mb-1">Resident Portal</p>
          <p className="text-sm text-gray-500">Access your home dashboard</p>
        </button>
      </div>

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
