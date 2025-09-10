"use client";

import { useState } from "react";
import {
  MdOutlineLightbulb,
  MdOutlineCamera,
  MdOutlineLock,
  MdOutlineAir,
  MdOutlineAddCircleOutline,
} from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";

/* --- Device Data --- */
const devices = [
  {
    id: 1,
    name: "Light",
    location: "Living Room",
    status: "On",
    icon: <MdOutlineLightbulb />,
    category: "Living Room",
  },
  {
    id: 2,
    name: "CCTV",
    location: "Outdoor",
    status: "Off",
    icon: <MdOutlineCamera />,
    category: "Outdoor",
  },
  {
    id: 3,
    name: "Door Lock",
    location: "Main Door",
    status: "Locked",
    icon: <MdOutlineLock />,
    category: "Main Door",
  },
  {
    id: 4,
    name: "AC",
    location: "Master Bedroom",
    status: "On",
    icon: <MdOutlineAir />,
    category: "Bedroom",
  },
  {
    id: 5,
    name: "Good Morning",
    location: "Wake up with a warm welcome!",
    status: "Run",
    icon: <WiDaySunny />,
    category: "Scene",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("All");

  // Filter devices based on tab
  const filteredDevices =
    activeTab === "All"
      ? devices
      : devices.filter((d) => d.category === activeTab);

  return (
    <div className="bg-gray-50 dark:bg-[#121212] min-h-screen p-6 font-[Poppins]">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Rooms & Devices
          </h1>

          {/* Nav Tabs */}
          <div className="flex bg-gray-100 dark:bg-[#1f1f1f] rounded-xl p-1 gap-2">
            {["All", "Favourites", "Living Room", "Outdoor", "Main Door", "Bedroom", "Scene"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm rounded-lg transition ${
                    activeTab === tab
                      ? "bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white shadow"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#2a2a2a]"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevices.map((device) => (
            <DeviceCard
              key={device.id}
              name={device.name}
              location={device.location}
              status={device.status}
              icon={device.icon}
            />
          ))}

          {/* Add Device Card */}
          <div className="rounded-2xl p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] cursor-pointer transition">
            <MdOutlineAddCircleOutline className="text-2xl mr-2" />
            Add Device
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Device Card Component --- */
interface DeviceCardProps {
  name: string;
  location: string;
  status: string;
  icon?: React.ReactNode;
}

function DeviceCard({ name, location, status, icon }: DeviceCardProps) {
  return (
    <div
      className="rounded-2xl p-5 shadow-md 
      bg-white text-gray-900 
      dark:bg-[#1f1f1f] dark:text-gray-100 
      transition-colors duration-300 hover:shadow-xl"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-blue-500 text-2xl">
          {icon}
        </div>
        <button
          className="px-3 py-1 rounded-full text-sm font-medium border 
          border-gray-300 text-gray-600 
          hover:bg-gray-200 hover:text-gray-900
          dark:border-gray-600 dark:text-gray-300 
          dark:hover:bg-gray-700 dark:hover:text-white transition"
        >
          {status}
        </button>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
      </div>
    </div>
  );
}
