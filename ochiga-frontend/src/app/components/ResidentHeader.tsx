// ochiga-frontend/src/app/components/ResidentHeader.tsx
"use client";

import { useState } from "react";
import { ClipboardDocumentIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface ResidentHeaderProps {
  name: string;
  estate: string;
  phase?: string;
  address: string;
}

export default function ResidentHeader({
  name,
  estate,
  phase,
  address,
}: ResidentHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-2xl p-6 shadow-md bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      {/* Greeting */}
      <p className="text-sm text-gray-600 dark:text-gray-400">Good afternoon,</p>
      <h2 className="text-lg font-medium mt-1">{name}</h2>

      {/* Estate Info */}
      <h1 className="text-2xl font-bold mt-4 tracking-tight">{estate}</h1>
      {phase && (
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          {phase}
        </h1>
      )}

      {/* Address */}
      <div className="flex items-center gap-2 mt-4 text-sm text-gray-700 dark:text-gray-300">
        <MapPinIcon className="h-5 w-5 text-[#800000]" />
        <span className="font-semibold text-base">{address}</span>
        <button
          onClick={handleCopy}
          className="ml-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ClipboardDocumentIcon className="h-4 w-4 text-[#800000]" />
        </button>
      </div>

      {/* Toast Notification */}
      {copied && (
        <div className="absolute bottom-3 right-3 bg-[#800000] text-white text-xs px-3 py-1 rounded-md shadow-md animate-fadeInOut">
          📋 Address copied!
        </div>
      )}

      {/* Add animation style */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
