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
      <h2 className="text-xl font-bold mb-4 text-white dark:text-white/90">
        Rooms & Devices
      </h2>

      {/* Scrollable Tabs */}
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide mb-6">
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-all duration-300
              ${
                activeRoom === room
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/40"
                  : "bg-white/10 dark:bg-gray-800 text-gray-400 hover:text-white hover:bg-white/20"
              }`}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Device Card */}
        {[
          {
            name: "Light",
            location: "Living Room",
            status: "On",
            icon: <MdLightbulbOutline className="text-yellow-400 text-2xl" />,
          },
          {
            name: "CCTV",
            location: "Outdoor",
            status: "Off",
            icon: <MdVideocam className="text-red-500 text-2xl" />,
          },
          {
            name: "TV",
            location: "Living Room",
            status: "Off",
            icon: <MdTv className="text-blue-400 text-2xl" />,
          },
          {
            name: "Door Lock",
            location: "Main Door",
            status: "Locked",
            icon: <MdDoorFront className="text-blue-500 text-2xl" />,
          },
          {
            name: "AC",
            location: "Master Bedroom",
            status: "On",
            icon: <MdAcUnit className="text-cyan-400 text-2xl" />,
          },
        ].map((device, index) => (
          <div
            key={index}
            className={`rounded-2xl p-4 flex flex-col justify-between 
              bg-white/10 dark:bg-[#1f1f1f]/80 
              backdrop-blur-md shadow-lg border 
              transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl 
              ${
                device.status === "On"
                  ? "border-blue-400/40 shadow-blue-500/30"
                  : "border-gray-700/40"
              }`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl 
                  ${
                    device.status === "On"
                      ? "bg-blue-500/20 text-blue-400 shadow-inner shadow-blue-500/30"
                      : "bg-gray-200/30 dark:bg-gray-800/70 text-gray-500"
                  }`}
              >
                {device.icon}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide border
                  ${
                    device.status === "On"
                      ? "bg-blue-500/20 text-blue-400 border-blue-400/40"
                      : "bg-gray-300/20 dark:bg-gray-700/40 text-gray-400 border-gray-500/30"
                  }`}
              >
                {device.status}
              </span>
            </div>

            {/* Bottom row */}
            <div>
              <h3 className="font-semibold text-white/90">{device.name}</h3>
              <p className="text-xs text-gray-400">{device.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
