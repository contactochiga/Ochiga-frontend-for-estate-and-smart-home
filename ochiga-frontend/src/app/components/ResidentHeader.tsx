"use client";

import { ClipboardDocumentIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface ResidentHeaderProps {
  name: string;
  estate: string;
  phase?: string; // optional
  address: string;
}

export default function ResidentHeader({
  name,
  estate,
  phase,
  address,
}: ResidentHeaderProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    alert("Address copied to clipboard");
  };

  return (
    <div className="rounded-2xl p-6 shadow-md bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      {/* Greeting */}
      <p className="text-sm text-gray-600 dark:text-gray-400">Good afternoon,</p>
      <h2 className="text-lg font-medium mt-1">{name}</h2>

      {/* Resident Full Address — emphasized */}
      <div className="flex items-start gap-2 mt-5 text-gray-800 dark:text-gray-100">
        <MapPinIcon className="h-6 w-6 text-[#800000] flex-shrink-0 mt-1" />
        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold leading-snug">{address}</h1>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-1">
            {estate}
            {phase && ` — ${phase}`}
          </h2>
        </div>
        <button
          onClick={handleCopy}
          className="ml-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Copy address"
        >
          <ClipboardDocumentIcon className="h-5 w-5 text-[#800000]" />
        </button>
      </div>
    </div>
  );
}
