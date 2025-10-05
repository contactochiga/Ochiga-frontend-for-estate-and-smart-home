"use client";

import { useState } from "react";
import {
  MdLightbulbOutline,
  MdTv,
  MdDoorFront,
  MdAcUnit,
  MdVideocam,
} from "react-icons/md";

// Room tabs
const rooms = [
  "All",
  "Favourites",
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Office",
  "Outdoor",
];

// Device list
const devices = [
  {
    id: 1,
    name: "Light",
    location: "Living Room",
    status: "On",
    icon: <MdLightbulbOutline className="text-yellow-400 text-xl" />,
    type: "light",
    favourite: true,
  },
  {
    id: 2,
    name: "CCTV",
    location: "Outdoor",
    status: "Off",
    icon: <MdVideocam className="text-red-500 text-xl" />,
    type: "cctv",
    favourite: true,
  },
  {
    id: 3,
    name: "TV",
    location: "Living Room",
    status: "Off",
    icon: <MdTv className="text-blue-400 text-xl" />,
    type: "tv",
    favourite: false,
  },
  {
    id: 4,
    name: "Door Lock",
    location: "Main Door",
    status: "Locked",
    icon: <MdDoorFront className="text-blue-500 text-xl" />,
    type: "door",
    favourite: false,
  },
  {
    id: 5,
    name: "AC",
    location: "Bedroom",
    status: "On",
    icon: <MdAcUnit className="text-cyan-400 text-xl" />,
    type: "ac",
    favourite: true,
  },
];

// Define allowed device statuses
type DeviceStatus = "On" | "Off" | "Locked" | "Unlocked";

export default function RoomsDevices() {
  const [activeRoom, setActiveRoom] = useState("All");

  // ✅ Strongly typed state
  const [deviceStates, setDeviceStates] = useState<Record<number, DeviceStatus>>(
    devices.reduce(
      (acc, d) => ({ ...acc, [d.id]: d.status as DeviceStatus }),
      {} as Record<number, DeviceStatus>
    )
  );

  const [selectedDevice, setSelectedDevice] = useState<(typeof devices)[0] | null>(
    null
  );

  // Filter devices by room or favourites
  const filteredDevices =
    activeRoom === "All"
      ? devices
      : activeRoom === "Favourites"
      ? devices.filter((d) => d.favourite)
      : devices.filter((d) => d.location === activeRoom);

  // ✅ Safer toggle function
  const toggleDevice = (id: number) => {
    setDeviceStates((prev) => {
      const current = prev[id];
      let next: DeviceStatus;

      switch (current) {
        case "On":
          next = "Off";
          break;
        case "Off":
          next = "On";
          break;
        case "Locked":
          next = "Unlocked";
          break;
        case "Unlocked":
          next = "Locked";
          break;
        default:
          next = "Off";
          break;
      }

      return { ...prev, [id]: next };
    });
  };

  return (
    <div className="w-full">
      <div className="w-full rounded-2xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 p-5">
        {/* Header */}
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Rooms & Devices
        </h2>

        {/* Scrollable Tabs */}
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide mb-5">
          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => setActiveRoom(room)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-medium transition-all
                ${
                  activeRoom === room
                    ? "bg-gradient-to-r from-[#800000] to-black text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              {room}
            </button>
          ))}
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredDevices.map((device) => (
            <div
              key={device.id}
              onClick={() => setSelectedDevice(device)}
              className={`rounded-xl p-3 flex flex-col justify-between cursor-pointer
                bg-white dark:bg-gray-800 
                shadow-sm border transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]
                ${
                  deviceStates[device.id] === "On" ||
                  deviceStates[device.id] === "Unlocked"
                    ? "border-[#800000]/60 shadow-[0_0_6px_rgba(128,0,0,0.3)]"
                    : "border-gray-200 dark:border-gray-700"
                }`}
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-lg 
                    ${
                      deviceStates[device.id] === "On" ||
                      deviceStates[device.id] === "Unlocked"
                        ? "bg-gradient-to-br from-[#800000] to-black text-white shadow-inner"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                    }`}
                >
                  {device.icon}
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border
                    ${
                      deviceStates[device.id] === "On" ||
                      deviceStates[device.id] === "Unlocked"
                        ? "bg-[#800000]/20 text-[#800000] border-[#800000]/40"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 border-gray-300 dark:border-gray-600"
                    }`}
                >
                  {deviceStates[device.id]}
                </span>
              </div>

              {/* Bottom row */}
              <div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-white">
                  {device.name}
                </h3>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  {device.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for device control */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl p-6 shadow-xl animate-scaleUp">
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

            {/* Dynamic Controls */}
            <div className="flex flex-col items-center justify-center gap-5 py-4 text-gray-800 dark:text-gray-200">
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

              {/* Light control */}
              {selectedDevice.type === "light" && (
                <button
                  onClick={() => toggleDevice(selectedDevice.id)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#800000] to-black text-white font-semibold hover:opacity-90"
                >
                  Toggle Light
                </button>
              )}

              {/* Door control */}
              {selectedDevice.type === "door" && (
                <button
                  onClick={() => toggleDevice(selectedDevice.id)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#800000] to-black text-white font-semibold hover:opacity-90"
                >
                  {deviceStates[selectedDevice.id] === "Locked"
                    ? "Unlock Door"
                    : "Lock Door"}
                </button>
              )}

              {/* AC control */}
              {selectedDevice.type === "ac" && (
                <div className="flex items-center gap-3">
                  <button className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700">
                    -
                  </button>
                  <span className="text-base font-bold">22°C</span>
                  <button className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700">
                    +
                  </button>
                </div>
              )}

              {/* TV control */}
              {selectedDevice.type === "tv" && (
                <div className="grid grid-cols-3 gap-2">
                  {["⏮", "⏯", "⏭"].map((btn) => (
                    <button
                      key={btn}
                      className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              )}

              {/* CCTV feed */}
              {selectedDevice.type === "cctv" && (
                <div className="w-full h-36 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    🔴 Live Camera Feed
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-scaleUp {
          animation: scaleUp 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
