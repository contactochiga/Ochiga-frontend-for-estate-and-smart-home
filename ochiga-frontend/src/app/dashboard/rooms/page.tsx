"use client";

import { useState } from "react";
import {
  MdLightbulbOutline,
  MdTv,
  MdDoorFront,
  MdAcUnit,
  MdVideocam,
} from "react-icons/md";

const rooms = ["All", "Living Room", "Kitchen", "Bedroom", "Office", "Outdoor"];

const devices = [
  { id: 1, name: "Light", location: "Living Room", status: "On", icon: <MdLightbulbOutline className="text-yellow-400 text-3xl" />, type: "light" },
  { id: 2, name: "CCTV", location: "Outdoor", status: "Off", icon: <MdVideocam className="text-red-500 text-3xl" />, type: "cctv" },
  { id: 3, name: "TV", location: "Living Room", status: "Off", icon: <MdTv className="text-blue-400 text-3xl" />, type: "tv" },
  { id: 4, name: "Door Lock", location: "Main Door", status: "Locked", icon: <MdDoorFront className="text-blue-500 text-3xl" />, type: "door" },
  { id: 5, name: "AC", location: "Bedroom", status: "On", icon: <MdAcUnit className="text-cyan-400 text-3xl" />, type: "ac" },
];

export default function RoomsPage() {
  const [activeRoom, setActiveRoom] = useState("All");
  const [deviceStates, setDeviceStates] = useState<any>(
    devices.reduce((acc, d) => {
      acc[d.id] = d.status;
      return acc;
    }, {})
  );
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  const filteredDevices =
    activeRoom === "All"
      ? devices
      : devices.filter((d) => d.location === activeRoom);

  const toggleDevice = (id: number) => {
    setDeviceStates((prev: any) => ({
      ...prev,
      [id]: prev[id] === "On" ? "Off" : "On",
    }));
  };

  return (
    <div className="p-4">
      {/* Room Selector */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeRoom === room
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            onClick={() => setSelectedDevice(device)}
            className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition"
          >
            {device.icon}
            <p className="font-semibold text-gray-800 dark:text-gray-200">{device.name}</p>
            <p
              className={`text-xs ${
                deviceStates[device.id] === "On" ||
                deviceStates[device.id] === "Unlocked"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {deviceStates[device.id]}
            </p>
          </div>
        ))}
      </div>

      {/* Device Details Drawer */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black/40 flex items-end z-50">
          <div className="bg-white dark:bg-gray-900 w-full max-h-[60%] rounded-t-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{selectedDevice.name}</h3>
              <button
                onClick={() => setSelectedDevice(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center gap-4">
              {selectedDevice.icon}
              <p className="text-gray-700 dark:text-gray-300">
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

              {/* Toggle Control */}
              {selectedDevice.type !== "cctv" && (
                <button
                  onClick={() => toggleDevice(selectedDevice.id)}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                >
                  Toggle {selectedDevice.name}
                </button>
              )}

              {selectedDevice.type === "cctv" && (
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <p className="text-sm text-gray-500">Live Camera Feed</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
