// src/app/components/DeviceCards.tsx
"use client";

import { useState } from "react";
import { FiPower } from "react-icons/fi";
import { MdLightbulbOutline, MdTv, MdDoorFront, MdAcUnit, MdVideocam } from "react-icons/md";

const devices = [
  { id: 1, name: "Light", location: "Living room", icon: <MdLightbulbOutline className="text-yellow-500 text-3xl" /> },
  { id: 2, name: "CCTV Monitoring", location: "Outdoor", icon: <MdVideocam className="text-red-500 text-3xl" /> },
  { id: 3, name: "TV", location: "Living room", icon: <MdTv className="text-gray-500 text-3xl" /> },
  { id: 4, name: "Doors", location: "Living room", icon: <MdDoorFront className="text-blue-500 text-3xl" /> },
  { id: 5, name: "AC", location: "Master bedroom", icon: <MdAcUnit className="text-black dark:text-white text-3xl" /> },
];

export default function DeviceCards() {
  const [powerStates, setPowerStates] = useState<{ [key: number]: boolean }>({});

  const togglePower = (id: number) => {
    setPowerStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Devices</h2>
        <button className="text-2xl">⋯</button>
      </div>

      {/* Device cards */}
      <div className="grid grid-cols-2 gap-4">
        {devices.map((device) => (
          <div
            key={device.id}
            className="flex items-center justify-between rounded-2xl p-4 shadow-sm 
                       bg-white dark:bg-gray-800 transition-colors"
          >
            <div className="flex flex-col">
              <div>{device.icon}</div>
              <h3 className="font-medium mt-2">{device.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{device.location}</p>
            </div>
            <button
              onClick={() => togglePower(device.id)}
              className={`w-10 h-10 flex items-center justify-center rounded-full 
                transition-colors ${
                  powerStates[device.id]
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-500"
                }`}
            >
              <FiPower />
            </button>
          </div>
        ))}
      </div>

      {/* Footer placeholder */}
      <div className="mt-8 text-center text-sm text-gray-400 dark:text-gray-600">
        Smart Estate · Powered by Ochiga
      </div>
    </div>
  );
}
