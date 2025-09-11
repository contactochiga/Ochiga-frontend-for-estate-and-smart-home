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

const devices = [
  { name: "Light", location: "Living Room", status: "On", icon: <MdLightbulbOutline className="text-yellow-400 text-2xl" />, favourite: true, type: "light" },
  { name: "CCTV", location: "Outdoor", status: "Off", icon: <MdVideocam className="text-red-500 text-2xl" />, favourite: true, type: "cctv" },
  { name: "TV", location: "Living Room", status: "Off", icon: <MdTv className="text-blue-400 text-2xl" />, favourite: false, type: "tv" },
  { name: "Door Lock", location: "Main Door", status: "Locked", icon: <MdDoorFront className="text-blue-500 text-2xl" />, favourite: false, type: "door" },
  { name: "AC", location: "Bedroom", status: "On", icon: <MdAcUnit className="text-cyan-400 text-2xl" />, favourite: true, type: "ac" },
];

export default function RoomsDevices() {
  const [activeRoom, setActiveRoom] = useState("All");
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [deviceStates, setDeviceStates] = useState<any>({});

  const toggleDevice = (device: any) => {
    setDeviceStates((prev: any) => ({
      ...prev,
      [device.name]: prev[device.name] === "On" ? "Off" : "On",
    }));
  };

  const filteredDevices = devices.filter((device) => {
    if (activeRoom === "All") return true;
    if (activeRoom === "Favourites") return device.favourite;
    return device.location === activeRoom;
  });

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-wide">
        Rooms & Devices
      </h2>

      {/* Room Tabs */}
      <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeRoom === room
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
            }`}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDevices.map((device) => (
          <div
            key={device.name}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col justify-between cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedDevice(device)}
          >
            {/* Icon and Status */}
            <div className="flex items-center justify-between mb-4">
              <span>{device.icon}</span>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  (deviceStates[device.name] || device.status) === "On"
                    ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-100"
                    : "bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-100"
                }`}
              >
                {deviceStates[device.name] || device.status}
              </span>
            </div>

            {/* Device Info */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                {device.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {device.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Device Remote Panel */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[90%] sm:w-[400px] shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 dark:text-gray-300 hover:text-red-500"
              onClick={() => setSelectedDevice(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {selectedDevice.name} Control
            </h3>
            <div className="flex justify-center mb-6">{selectedDevice.icon}</div>

            {/* Toggle Button */}
            <button
              onClick={() => toggleDevice(selectedDevice)}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                (deviceStates[selectedDevice.name] || selectedDevice.status) === "On"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {(deviceStates[selectedDevice.name] || selectedDevice.status) === "On"
                ? "Turn Off"
                : "Turn On"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
