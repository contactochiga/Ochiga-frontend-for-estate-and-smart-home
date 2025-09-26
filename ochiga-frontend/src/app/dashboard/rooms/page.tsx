// src/app/dashboard/rooms/page.tsx
"use client";

import { useState } from "react";
import {
  MdLightbulbOutline,
  MdTv,
  MdDoorFront,
  MdAcUnit,
  MdVideocam,
  MdAdd,
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

export default function RoomsPage() {
  const [activeRoom, setActiveRoom] = useState("All");
  const [deviceStates, setDeviceStates] = useState(
    devices.reduce((acc, d) => ({ ...acc, [d.id]: d.status }), {})
  );
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  // Add modals state
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [newRoom, setNewRoom] = useState("");
  const [newDevice, setNewDevice] = useState({
    name: "",
    location: "",
    type: "",
  });

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
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white p-6 pb-24 space-y-6 relative">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Rooms & Devices
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Manage your rooms and control connected devices in real-time.
      </p>

      {/* Scrollable Rooms Tabs */}
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
              ${
                activeRoom === room
                  ? "bg-gradient-to-r from-[#800000] to-black text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
          >
            {room}
          </button>
        ))}
        {/* Add Room Button */}
        <button
          onClick={() => setShowAddRoom(true)}
          className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border-2 border-dashed border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center gap-1"
        >
          <MdAdd className="text-lg" /> Add Room
        </button>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            onClick={() => setSelectedDevice(device)}
            className={`rounded-xl p-4 flex flex-col justify-between cursor-pointer
              bg-white dark:bg-gray-900 
              shadow-sm border transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]
              ${
                deviceStates[device.id] === "On" ||
                deviceStates[device.id] === "Unlocked"
                  ? "border-[#800000]/60 shadow-[0_0_6px_rgba(128,0,0,0.3)]"
                  : "border-gray-200 dark:border-gray-700"
              }`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl 
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
                className={`px-3 py-1 rounded-full text-[11px] font-medium border
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
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                {device.name}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {device.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Device Button */}
      <button
        onClick={() => setShowAddDevice(true)}
        className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#800000] to-black text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform z-50"
      >
        <MdAdd className="text-2xl" />
      </button>

      {/* Device Control Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl p-6 shadow-xl animate-scaleUp">
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

            {/* Device-specific controls */}
            <div className="flex flex-col items-center gap-5 py-4 text-gray-800 dark:text-gray-200">
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

              {selectedDevice.type === "light" && (
                <button
                  onClick={() => toggleDevice(selectedDevice.id)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#800000] to-black text-white font-semibold hover:opacity-90"
                >
                  Toggle Light
                </button>
              )}

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

      {/* Add Room Modal */}
      {showAddRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl p-6 shadow-xl animate-scaleUp">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New Room
            </h3>
            <input
              type="text"
              placeholder="Room Name"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddRoom(false)}
                className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newRoom.trim()) {
                    rooms.push(newRoom); // mock add
                    setNewRoom("");
                    setShowAddRoom(false);
                  }
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#800000] to-black text-white font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl p-6 shadow-xl animate-scaleUp">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New Device
            </h3>
            <input
              type="text"
              placeholder="Device Name"
              value={newDevice.name}
              onChange={(e) =>
                setNewDevice({ ...newDevice, name: e.target.value })
              }
              className="w-full px-4 py-2 mb-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Location (e.g. Living Room)"
              value={newDevice.location}
              onChange={(e) =>
                setNewDevice({ ...newDevice, location: e.target.value })
              }
              className="w-full px-4 py-2 mb-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <select
              value={newDevice.type}
              onChange={(e) =>
                setNewDevice({ ...newDevice, type: e.target.value })
              }
              className="w-full px-4 py-2 mb-4 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Select Type</option>
              <option value="light">Light</option>
              <option value="tv">TV</option>
              <option value="door">Door Lock</option>
              <option value="ac">AC</option>
              <option value="cctv">CCTV</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddDevice(false)}
                className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newDevice.name && newDevice.location && newDevice.type) {
                    devices.push({
                      id: devices.length + 1,
                      ...newDevice,
                      status: "Off",
                      favourite: false,
                      icon: (
                        <MdLightbulbOutline className="text-gray-400 text-xl" />
                      ),
                    }); // mock add
                    setNewDevice({ name: "", location: "", type: "" });
                    setShowAddDevice(false);
                  }
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#800000] to-black text-white font-semibold"
              >
                Save
              </button>
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
