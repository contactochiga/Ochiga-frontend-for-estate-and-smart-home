"use client";

import { ClipboardDocumentIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function EstateHeader() {
  const handleCopy = () => {
    navigator.clipboard.writeText("Parklane, Lagos, Nigeria");
    alert("Address copied to clipboard");
  };

  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-md">
      {/* Greeting */}
      <p className="text-sm text-gray-600 dark:text-gray-400">Good afternoon,</p>
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mt-1">
        Manager John
      </h2>

      {/* Estate Info */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 tracking-tight">
        Ochiga Estate
      </h1>
      <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
        Phase 2
      </h1>

      {/* Location */}
      <div className="flex items-center gap-2 mt-4 text-sm text-gray-700 dark:text-gray-300">
        <MapPinIcon className="h-5 w-5 text-[#800000]" />
        <span>Parklane, Lagos, Nigeria</span>
        <button
          onClick={handleCopy}
          className="ml-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ClipboardDocumentIcon className="h-4 w-4 text-[#800000]" />
        </button>
      </div>
    </div>
  );
}
