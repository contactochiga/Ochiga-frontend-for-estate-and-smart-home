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
  const [deviceStates, setDeviceStates] = useState<Record<number, string>>(
    devices.reduce(
      (acc, d) => ({ ...acc, [d.id]: d.status }),
      {} as Record<number, string>
    )
  );

  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [newRoom, setNewRoom] = useState("");

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 pb-24 space-y-6 relative">
      {/* Header */}
      <h1 className="text-2xl font-bold">Rooms & Devices</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Manage your rooms and control connected devices in real-time.
      </p>

      {/* Room Tabs */}
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
              ${
                activeRoom === room
                  ? "bg-[#800000] text-white shadow"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
          >
            {room}
          </button>
        ))}

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
              shadow border transition-transform duration-200 hover:scale-[1.03]
              ${
                deviceStates[device.id] === "On" ||
                deviceStates[device.id] === "Unlocked"
                  ? "border-[#800000]/60 shadow-[0_0_6px_rgba(128,0,0,0.3)]"
                  : "border-gray-200 dark:border-gray-700"
              }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl 
                  ${
                    deviceStates[device.id] === "On" ||
                    deviceStates[device.id] === "Unlocked"
                      ? "bg-[#800000] text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500"
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
                      : "bg-gray-200 dark:bg-gray-800 text-gray-500 border-gray-300 dark:border-gray-600"
                  }`}
              >
                {deviceStates[device.id]}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-sm">{device.name}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {device.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setShowAddDevice(true)}
        className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-[#800000] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform z-50"
      >
        <MdAdd className="text-2xl" />
      </button>
    </div>
  );
}
