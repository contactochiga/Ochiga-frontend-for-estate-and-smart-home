"use client";

import { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

// ----- Small demo panels -----
const LightControl = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-blue-400 font-semibold">💡 Light Control</p>
    <div className="flex items-center gap-2">
      <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full text-white">
        On
      </button>
      <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full">
        Off
      </button>
      <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full">
        Dim
      </button>
    </div>
  </div>
);

const WalletPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-purple-400 font-semibold">💳 Wallet</p>
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span>Balance:</span>
        <span className="font-semibold text-green-400">₦ 0.00</span>
      </div>
      <button className="self-start bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-full text-white">
        Add Funds
      </button>
    </div>
  </div>
);

const CCTVPanel = () => (
  <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
    <p className="mb-2 text-red-400 font-semibold">📹 CCTV Feed</p>
    <div className="aspect-video bg-black flex items-center justify-center text-gray-500 text-xs rounded-md border border-gray-700">
      Live Feed Placeholder
    </div>
  </div>
);

// ----- Main Dashboard -----
export default function AIDashboard() {
  const [input, setInput] = use
