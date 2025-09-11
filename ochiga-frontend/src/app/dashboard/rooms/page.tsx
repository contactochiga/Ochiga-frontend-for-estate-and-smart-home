"use client";

import { useState } from "react";
import {
  MdLightbulbOutline,
  MdTv,
  MdDoorFront,
  MdAcUnit,
  MdVideocam,
  MdStar,
  MdStarBorder,
} from "react-icons/md";

const rooms = ["All", "Favourites", "Living Room", "Kitchen", "Bedroom", "Office", "Outdoor"];

const devices = [
  {
    id: 1,
    name: "Light",
    location: "Living Room",
    status: "On",
    icon: <MdLightbulbOutline className="text-yellow-400 text-3xl" />,
    type: "light",
    favourite: true,
  },
  {
    id: 2,
    name: "CCTV",
    location: "Outdoor",
    status: "Off",
    icon: <MdVideocam className="text-red-500 text-3xl" />,
    type: "cctv",
    favourite: true,
  },
  {
    id: 3,
    name: "TV",
    location: "Living Room",
    status: "Off",
    icon: <MdTv className="text-blue-400 text-3xl" />,
    type: "tv",
    favourite: false,
  },
  {
    id: 4,
    name: "Door Lock",
    location: "Main Door",
    status: "Locked",
    icon: <MdDoorFront className="text-blue-500 text-3xl" />,
    type: "door",
    favourite: false,
  },
  {
    id: 5,
    name: "AC",
    location: "Bedroom",
    status: "On",
    icon: <MdAcUnit className="text-cyan-400 text-3xl" />,
    type: "ac",
    favourite: true,
  },
];

export default function RoomsDevices() {
  const [activeRoom, setActiveRoom] = useState("All");
  const [deviceStates, setDeviceStates] = useState(
    devices.reduce((acc, d) => ({ ...acc, [d.id]: d.status }), {})
  );
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [favourites, setFavourites] = useState(
    devices.reduce((acc, d) => ({ ...acc, [d.id]: d.favourite }), {})
  );

  const filteredDevices =
    activeRoom === "All"
      ? devices
      : activeRoom === "Favourites"
      ? devices.filter((d) => favourites[d.id])
      : devices.filter((d) => d.location === activeRoom);

  const toggleDevice = (id: number) => {
    setDeviceStates((prev) => ({
      ...prev,
      [id]:
        prev[id] === "On"
          ? "Off"
          : prev[id] === "Off"
          ? "On"
          : prev[id] === "Locked"
          ? "Unlocked"
          : "Locked",
    }));
  };

  const toggleFavourite = (id: number) => {
    setFavourites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-screen -mx-4 sm:-mx-6 md:-mx-8">
      <div className="w-full rounded-3xl bg-gradient-to-br from-gray-900/70 via-gray-800/70 to-gray-900/70 
                      shadow-2xl backdrop-blur-xl border border-gray-700/40 p-6">
        {/* Header */}
        <h2 className="text-2xl font-extrabold mb-6 text-white tracking-wide">
          Rooms & Devices
        </h2>

        {/* Scrollable Tabs */}
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide mb-6">
          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => setActiveRoom(room)}
              className={`px-5 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold transition-all duration-300
                ${
                  activeRoom === room
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/10 dark:bg-gray-800 text-gray-400 hover:text-white hover:bg-white/20"
                }`}
            >
              {room}
            </button>
          ))}
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredDevices.map((device) => (
            <div
              key={device.id}
              onClick={() => setSelectedDevice(device)}
              className={`relative rounded-2xl p-5 flex flex-col justify-between cursor-pointer
                bg-gradient-to-br from-gray-800/70 to-gray-900/70
                backdrop-blur-md shadow-lg border 
                transition-transform duration-300 ease-out hover:scale-[1.07] active:scale-[0.97]
                ${
                  deviceStates[device.id] === "On" || deviceStates[device.id] === "Unlocked"
                    ? "border-blue-400/60 shadow-blue-500/50"
                    : "border-gray-700/40"
                }`}
            >
              {/* Favourite Star */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourite(device.id);
                }}
                className="absolute top-3 right-3"
              >
                {favourites[device.id] ? (
                  <MdStar className="text-yellow-400 text-lg" />
                ) : (
                  <MdStarBorder className="text-gray-400 text-lg" />
                )}
              </button>

              {/* Top row */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all
                    ${
                      deviceStates[device.id] === "On" || deviceStates[device.id] === "Unlocked"
                        ? "bg-gradient-to-br from-blue-500/30 to-cyan-400/20 shadow-inner shadow-blue-400/40"
                        : "bg-gray-200/20 dark:bg-gray-800/50 text-gray-500"
                    }`}
                >
                  {device.icon}
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wide border
                    ${
                      deviceStates[device.id] === "On" || deviceStates[device.id] === "Unlocked"
                        ? "bg-blue-500/20 text-blue-400 border-blue-400/40"
                        : "bg-gray-300/20 dark:bg-gray-700/40 text-gray-400 border-gray-500/30"
                    }`}
                >
                  {deviceStates[device.id]}
                </span>
              </div>

              {/* Bottom row */}
              <div>
                <h3 className="font-semibold text-white text-lg">{device.name}</h3>
                <p className="text-xs text-gray-400">{device.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-up Remote Panel */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black/60 flex items-end z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-t from-gray-900 to-gray-800 w-full rounded-t-3xl p-8 animate-slideUp shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {selectedDevice.name} Control
              </h3>
              <button
                onClick={() => setSelectedDevice(null)}
                className="text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Dynamic Remote Controls */}
            <div className="flex flex-col items-center justify-center gap-6 text-gray-200">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500/10">
                {selectedDevice.icon}
              </div>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-bold ${
                    deviceStates[selectedDevice.id] === "On" || deviceStates[selectedDevice.id] === "Unlocked"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {deviceStates[selectedDevice.id]}
                </span>
              </p>

              {/* Device-specific actions */}
              {selectedDevice.type === "light" && (
                <button
                  onClick={() => toggleDevice(selectedDevice.id)}
                  className="px-6 py-3 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 transition"
                >
                  Toggle Light
                </button>
              )}

              {selectedDevice.type === "door" && (
                <button
                  onClick={() => toggleDevice(selectedDevice.id)}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  {deviceStates[selectedDevice.id] === "Locked" ? "Unlock Door" : "Lock Door"}
                </button>
              )}

              {selectedDevice.type === "ac" && (
                <div className="flex items-center gap-5">
                  <button className="px-5 py-2 rounded-full bg-gray-700 hover:bg-gray-600">-</button>
                  <span className="text-2xl font-bold">22°C</span>
                  <button className="px-5 py-2 rounded-full bg-gray-700 hover:bg-gray-600">+</button>
                </div>
              )}

              {selectedDevice.type === "tv" && (
                <div className="grid grid-cols-3 gap-4">
                  {["⏮", "⏯", "⏭"].map((btn) => (
                    <button
                      key={btn}
                      className="px-5 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              )}

              {selectedDevice.type === "cctv" && (
                <div className="w-full h-48 rounded-lg bg-black flex items-center justify-center border border-gray-700">
                  <p className="text-sm text-red-400">🔴 Live Camera Feed</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
