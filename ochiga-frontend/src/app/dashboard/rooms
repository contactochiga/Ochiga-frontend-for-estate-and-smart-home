// src/app/dashboard/rooms/page.tsx
"use client";

import { useState } from "react";
import {
  MdLightbulbOutline,
  MdTv,
  MdDoorFront,
  MdAcUnit,
  MdVideocam,
  MdBolt,
} from "react-icons/md";
import { FaPlus, FaChevronDown } from "react-icons/fa6";

const initialRooms = [
  "All",
  "Favourites",
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Office",
  "Outdoor",
];

const devices = [
  {
    id: 1,
    name: "Light",
    location: "Living Room",
    status: "On",
    icon: <MdLightbulbOutline className="text-yellow-400 text-2xl" />,
    type: "light",
    favourite: true,
  },
  {
    id: 2,
    name: "CCTV",
    location: "Outdoor",
    status: "Off",
    icon: <MdVideocam className="text-red-500 text-2xl" />,
    type: "cctv",
    favourite: true,
  },
  {
    id: 3,
    name: "TV",
    location: "Living Room",
    status: "Off",
    icon: <MdTv className="text-blue-400 text-2xl" />,
    type: "tv",
    favourite: false,
  },
  {
    id: 4,
    name: "Door Lock",
    location: "Main Door",
    status: "Locked",
    icon: <MdDoorFront className="text-blue-500 text-2xl" />,
    type: "door",
    favourite: false,
  },
  {
    id: 5,
    name: "AC",
    location: "Bedroom",
    status: "On",
    icon: <MdAcUnit className="text-cyan-400 text-2xl" />,
    type: "ac",
    favourite: true,
  },
];

const scenes = ["Morning Mode", "Evening Mode", "Away Mode", "Movie Mode"];

export default function RoomsDevices() {
  const [rooms, setRooms] = useState(initialRooms);
  const [activeRoom, setActiveRoom] = useState("All");
  const [activeScene, setActiveScene] = useState("Evening Mode");
  const [showSceneDropdown, setShowSceneDropdown] = useState(false);
  const [deviceStates, setDeviceStates] = useState(
    devices.reduce((acc, d) => ({ ...acc, [d.id]: d.status }), {})
  );

  const filteredDevices =
    activeRoom === "All"
      ? devices
      : activeRoom === "Favourites"
      ? devices.filter((d) => d.favourite)
      : devices.filter((d) => d.location === activeRoom);

  const handleAddRoom = () => {
    const newRoom = prompt("Enter the name of the new room:");
    if (newRoom && !rooms.includes(newRoom)) {
      setRooms([...rooms, newRoom]);
    }
  };

  const handleAddDevice = () => {
    alert("🚀 Add Device flow will be here!");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black px-4 py-8">
      <div className="w-full rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 p-6">
        {/* 🔹 Header */}
        <div className="flex items-center justify-between mb-6 relative">
          {/* Left - Title & Scene */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Smart Rooms & Devices
            </h2>

            {/* Active Scene Dropdown */}
            <div className="relative inline-block">
              <button
                onClick={() => setShowSceneDropdown(!showSceneDropdown)}
                className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg text-sm font-medium 
                  bg-gradient-to-r from-[#800000]/10 to-black/10 dark:from-[#800000]/20 dark:to-black/20 
                  text-gray-700 dark:text-gray-200 hover:opacity-90 transition"
              >
                {activeScene}
                <FaChevronDown className="text-xs opacity-70" />
              </button>

              {showSceneDropdown && (
                <div className="absolute left-0 mt-2 w-44 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-20">
                  {scenes.map((scene) => (
                    <button
                      key={scene}
                      onClick={() => {
                        setActiveScene(scene);
                        setShowSceneDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm rounded-lg transition 
                        ${
                          activeScene === scene
                            ? "bg-gradient-to-r from-[#800000] to-black text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                    >
                      {scene}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Device Count */}
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-2">
              <MdBolt className="text-yellow-400" /> {devices.length} devices
              connected · {Object.values(deviceStates).filter(
                (s) => s === "On"
              ).length}{" "}
              active
            </p>
          </div>

          {/* Right - Add Device Button */}
          <button
            onClick={handleAddDevice}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#800000] to-black text-white text-sm font-medium shadow hover:opacity-90 transition"
          >
            <FaPlus className="text-xs" /> Add Device
          </button>
        </div>

        {/* 🔹 Rooms Tabs */}
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide mb-6 pb-1">
          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => setActiveRoom(room)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-all duration-300
                ${
                  activeRoom === room
                    ? "bg-gradient-to-r from-[#800000] to-black text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              {room}
            </button>
          ))}

          {/* Add Room */}
          <button
            onClick={handleAddRoom}
            className="flex items-center justify-center px-3 py-2 rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            <FaPlus className="text-sm" />
          </button>
        </div>

        {/* 🔹 Devices Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredDevices.map((device) => (
            <div
              key={device.id}
              className={`rounded-2xl p-4 flex flex-col justify-between cursor-pointer
                bg-gray-50 dark:bg-gray-800 
                shadow-md border transition-transform duration-300 ease-out 
                hover:scale-[1.05] active:scale-[0.98]
                ${
                  deviceStates[device.id] === "On" ||
                  deviceStates[device.id] === "Unlocked"
                    ? "border-[#800000]/40 shadow-[#800000]/30"
                    : "border-gray-300 dark:border-gray-700"
                }`}
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl 
                    ${
                      deviceStates[device.id] === "On" ||
                      deviceStates[device.id] === "Unlocked"
                        ? "bg-[#800000]/20 text-[#800000] shadow-inner shadow-[#800000]/30"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}
                >
                  {device.icon}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide border
                    ${
                      deviceStates[device.id] === "On" ||
                      deviceStates[device.id] === "Unlocked"
                        ? "bg-[#800000]/20 text-[#800000] border-[#800000]/40"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 border-gray-400 dark:border-gray-600"
                    }`}
                >
                  {deviceStates[device.id]}
                </span>
              </div>

              {/* Bottom row */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {device.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {device.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
