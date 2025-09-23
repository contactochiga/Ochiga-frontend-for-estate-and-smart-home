"use client";

import { useState } from "react";
import {
  MdLightbulbOutline,
  MdTv,
  MdDoorFront,
  MdAcUnit,
  MdVideocam,
} from "react-icons/md";

const rooms = [
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

export default function RoomsDevices() {
  const [activeRoom, setActiveRoom] = useState("All");
  const [deviceStates, setDeviceStates] = useState(
    devices.reduce((acc, d) => ({ ...acc, [d.id]: d.status }), {})
  );
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  const filteredDevices =
    activeRoom === "All"
      ? devices
      : activeRoom === "Favourites"
      ? devices.filter((d) => d.favourite)
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

  return (
    <div className="w-screen -mx-4 sm:-mx-6 md:-mx-8">
      <div className="w-full rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 p-6">
        {/* Header */}
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
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
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              {room}
            </button>
          ))}
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredDevices.map((device) => (
            <div
              key={device.id}
              onClick={() => setSelectedDevice(device)}
              className={`rounded-2xl p-4 flex flex-col justify-between cursor-pointer
                bg-gray-50 dark:bg-gray-800 
                shadow-md border 
                transition-transform duration-300 ease-out hover:scale-[1.05] active:scale-[0.98]
                ${
                  deviceStates[device.id] === "On" ||
                  deviceStates[device.id] === "Unlocked"
                    ? "border-blue-400/40 shadow-blue-500/30"
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
                        ? "bg-blue-500/20 text-blue-400 shadow-inner shadow-blue-500/30"
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
                        ? "bg-blue-500/20 text-blue-500 border-blue-400/40"
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

      {/* Slide-up Remote Panel */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white dark:bg-gray-900 w-full rounded-t-2xl p-6 animate-slideUp">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedDevice.name} Control
              </h3>
              <button
                onClick={() => setSelectedDevice(null)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Dynamic Remote Controls */}
            <div className="flex flex-col items-center justify-center gap-6 py-6 text-gray-800 dark:text-gray-200">
              {selectedDevice.icon}
              <p className="text-sm">
                Current Status:{" "}
                <span
                  className={`font-semibold ${
                    deviceStates[selectedDevice.id] === "On" ||
                    deviceStates[selectedDevice.id] === "Unlocked"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {deviceStates[selectedDevice.id]}
                </span>
              </p>

              {/* Device-specific actions */}
              {selectedDevice.type === "light" && (
                <button
                  onClick={() => toggleDevice(selectedDevice.id)}
                  className="px-6 py-3 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500"
                >
                  Toggle Light
                </button>
              )}

              {selectedDevice.type === "door" && (
                <button
                  onClick={() => toggleDevice(selectedDevice.id)}
                  className="px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600"
                >
                  {deviceStates[selectedDevice.id] === "Locked"
                    ? "Unlock Door"
                    : "Lock Door"}
                </button>
              )}

              {selectedDevice.type === "ac" && (
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700">
                    -
                  </button>
                  <span className="text-lg font-bold">22°C</span>
                  <button className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700">
                    +
                  </button>
                </div>
              )}

              {selectedDevice.type === "tv" && (
                <div className="grid grid-cols-3 gap-3">
                  {["⏮", "⏯", "⏭"].map((btn) => (
                    <button
                      key={btn}
                      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              )}

              {selectedDevice.type === "cctv" && (
                <div className="w-full h-40 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    🔴 Live Camera Feed
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
