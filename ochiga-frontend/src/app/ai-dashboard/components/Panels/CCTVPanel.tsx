"use client";

import { useState } from "react";
import { FaPlus, FaCog } from "react-icons/fa";

export default function CCTVPanel() {
  const [cameras, setCameras] = useState([
    { id: 1, name: "Front Gate", feed: "Live Feed Placeholder" },
    { id: 2, name: "Living Room", feed: "Live Feed Placeholder" },
    { id: 3, name: "Backyard", feed: "Live Feed Placeholder" },
  ]);

  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <p className="text-red-400 font-semibold">📹 CCTV Feeds</p>
        <FaCog className="text-gray-500 hover:text-gray-300 cursor-pointer" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {cameras.map((cam) => (
          <div
            key={cam.id}
            className="relative aspect-video bg-black flex items-center justify-center text-gray-500 text-[10px] md:text-xs rounded-md border border-gray-700"
          >
            {cam.feed}
            <div className="absolute bottom-1 left-1 bg-gray-800 bg-opacity-70 text-[10px] px-1 rounded">
              {cam.name}
            </div>
          </div>
        ))}

        {/* Add / View More Tile */}
        <div className="aspect-video bg-gray-800 border border-gray-700 flex flex-col items-center justify-center text-gray-500 rounded-md hover:bg-gray-700 cursor-pointer transition">
          <FaPlus className="mb-1" />
          <span className="text-[10px]">Add / View More</span>
        </div>
      </div>
    </div>
  );
}
