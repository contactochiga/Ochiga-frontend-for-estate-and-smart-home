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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy address");
    }
  };

  return (
    <div className="relative rounded-2xl p-6 shadow-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Greeting */}
      <p className="text-sm text-gray-600 dark:text-gray-400">Good afternoon,</p>
      <h2 className="text-lg font-medium mt-1 text-gray-900 dark:text-gray-100">
        {name}
      </h2>

      {/* Address */}
      <div className="flex items-center gap-2 mt-4 text-base font-semibold text-[#800000] dark:text-[#d97777]">
        <MapPinIcon className="h-5 w-5 text-[#800000] dark:text-[#d97777]" />
        <span>{address}</span>
        <button
          onClick={handleCopy}
          className="ml-1 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ClipboardDocumentIcon className="h-4 w-4 text-[#800000] dark:text-[#d97777]" />
        </button>
      </div>

      {/* Estate Info */}
      <h1 className="text-lg font-medium mt-2 tracking-tight">
        <span className="font-bold text-gray-900 dark:text-gray-100">{estate}</span>
        {phase && (
          <span className="font-normal text-gray-600 dark:text-gray-400">
            {" — "}{phase}
          </span>
        )}
      </h1>

      {/* Toast Notification */}
      {copied && (
        <div className="absolute bottom-3 right-3 bg-[#800000] dark:bg-[#d97777] text-white text-xs px-3 py-1.5 rounded-md shadow-lg animate-fadeInOut">
          📋 Address copied!
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(8px);
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
            transform: translateY(8px);
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
