"use client";

import { ClipboardDocumentIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function EstateHeader() {
  const handleCopy = () => {
    navigator.clipboard.writeText("Parklane, Lagos, Nigeria");
    alert("Address copied to clipboard");
  };

  return (
    <div className="bg-gradient-to-r from-[#800000] via-black to-[#1a0000] text-white rounded-2xl p-6 shadow-xl">
      {/* Greeting */}
      <p className="text-sm opacity-80">Good afternoon,</p>
      <h2 className="text-lg font-medium mt-1">Manager John</h2>

      {/* Estate Info */}
      <h1 className="text-2xl font-bold mt-4 tracking-tight">Ochiga Estate</h1>
      <h1 className="text-xl font-semibold">Phase 2</h1>

      {/* Location */}
      <div className="flex items-center gap-2 mt-4 text-sm opacity-90">
        <MapPinIcon className="h-5 w-5" />
        <span>Parklane, Lagos, Nigeria</span>
        <button
          onClick={handleCopy}
          className="ml-2 p-1 rounded-lg hover:bg-white/20 transition"
        >
          <ClipboardDocumentIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
