"use client";

import { useState } from "react";
import { FaPlus, FaCog, FaTimes } from "react-icons/fa";

export default function CCTVPanel() {
  const [cameras, setCameras] = useState([
    { id: 1, name: "Front Gate", feed: "Live Feed Placeholder" },
    { id: 2, name: "Living Room", feed: "Live Feed Placeholder" },
    { id: 3, name: "Backyard", feed: "Live Feed Placeholder" },
  ]);

  const [activeCam, setActiveCam] = useState<null | number>(null);

  const handleView = (id: number) => {
    setActiveCam(id);
  };

  const closeModal = () => {
    setActiveCam(null);
  };

  const selectedCam = cameras.find((cam) => cam.id === activeCam);

  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn relative">
      <div className="flex items-center justify-between mb-2">
        <p className="text-red-400 font-semibold">📹 CCTV Feeds</p>
        <FaCog className="text-gray-500 hover:text-gray-300 cursor-pointer" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {cameras.map((cam) => (
          <div
            key={cam.id}
            onClick={() => handleView(cam.id)}
            className="relative aspect-video bg-black flex items-center justify-center text-gray-500 text-[10px] md:text-xs rounded-md border border-gray-700 hover:border-gray-500 cursor-pointer transition"
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

      {/* Modal for expanded camera view */}
      {activeCam && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
          <div className="relative bg-gray-900 border border-gray-700 rounded-xl p-3 w-11/12 md:w-2/3 lg:w-1/2">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
            >
              <FaTimes />
            </button>
            <p className="text-red-400 font-semibold mb-2">
              {selectedCam?.name} — Live Feed
            </p>
            <div className="aspect-video bg-black flex items-center justify-center text-gray-500 text-xs rounded-md border border-gray-700">
              {selectedCam?.feed}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
