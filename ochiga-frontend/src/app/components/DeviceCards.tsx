"use client";

import { useState } from "react";
import {
  MdLightbulbOutline,
  MdTv,
  MdDoorFront,
  MdAcUnit,
  MdVideocam,
} from "react-icons/md";

const rooms = ["All", "Favourites", "Living Room", "Kitchen", "Bedroom", "Office"];

export default function RoomsDevices() {
  const [activeRoom, setActiveRoom] = useState("All");

  return (
    <div className="p-4">
      {/* Header */}
      <h2 className="text-xl font-bold mb-4">Rooms & Devices</h2>

      {/* Scrollable Tabs */}
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide mb-4">
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeRoom === room
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Light */}
        <div className="rounded-xl p-4 flex flex-col justify-between bg-white text-gray-900 dark:bg-gray-900 dark:text-white shadow">
          <div className="flex items-center justify-between">
            <MdLightbulbOutline className="text-yellow-400 text-2xl" />
            <button className="px-3 py-1 rounded-full border text-sm border-gray-300 text-gray-600 dark:border-gray-500 dark:text-gray-300">
              On
            </button>
          </div>
          <div>
            <h3 className="font-semibold">Light</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Living Room</p>
          </div>
        </div>

        {/* CCTV */}
        <div className="rounded-xl p-4 flex flex-col justify-between bg-white text-gray-900 dark:bg-gray-900 dark:text-white shadow">
          <div className="flex items-center justify-between">
            <MdVideocam className="text-red-500 text-2xl" />
            <button className="px-3 py-1 rounded-full border text-sm border-gray-300 text-gray-600 dark:border-gray-500 dark:text-gray-300">
              Off
            </button>
          </div>
          <div>
            <h3 className="font-semibold">CCTV</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Outdoor</p>
          </div>
        </div>

        {/* TV */}
        <div className="rounded-xl p-4 flex flex-col justify-between bg-white text-gray-900 dark:bg-gray-900 dark:text-white shadow">
          <div className="flex items-center justify-between">
            <MdTv className="text-blue-400 text-2xl" />
            <button className="px-3 py-1 rounded-full border text-sm border-gray-300 text-gray-600 dark:border-gray-500 dark:text-gray-300">
              Off
            </button>
          </div>
          <div>
            <h3 className="font-semibold">TV</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Living Room</p>
          </div>
        </div>

        {/* Door Lock */}
        <div className="rounded-xl p-4 flex flex-col justify-between bg-white text-gray-900 dark:bg-gray-900 dark:text-white shadow">
          <div className="flex items-center justify-between">
            <MdDoorFront className="text-blue-500 text-2xl" />
            <button className="px-3 py-1 rounded-full border text-sm border-gray-300 text-gray-600 dark:border-gray-500 dark:text-gray-300">
              Locked
            </button>
          </div>
          <div>
            <h3 className="font-semibold">Door Lock</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Main Door</p>
          </div>
        </div>

        {/* AC */}
        <div className="rounded-xl p-4 flex flex-col justify-between bg-white text-gray-900 dark:bg-gray-900 dark:text-white shadow">
          <div className="flex items-center justify-between">
            <MdAcUnit className="text-cyan-400 text-2xl" />
            <button className="px-3 py-1 rounded-full border text-sm border-gray-300 text-gray-600 dark:border-gray-500 dark:text-gray-300">
              On
            </button>
          </div>
          <div>
            <h3 className="font-semibold">AC</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Master Bedroom</p>
          </div>
        </div>
      </div>
    </div>
  );
}
