"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaDoorOpen, FaVideo, FaFan, FaLock } from "react-icons/fa";

interface Device {
  id: string;
  name: string;
  type: "light" | "ac" | "door" | "camera" | "gate";
  status: "on" | "off" | "locked" | "unlocked";
}

interface Props {
  devices?: Device[];
  onAction: (deviceId: string, action: string) => void;
}

export default function EstateDevicePanel({ devices = [], onAction }: Props) {
  const [estateDevices, setEstateDevices] = useState<Device[]>(devices.length ? devices : [
    { id: "d1", name: "Main Gate", type: "gate", status: "locked" },
    { id: "d2", name: "Lobby Light", type: "light", status: "off" },
    { id: "d3", name: "CCTV Camera 1", type: "camera", status: "off" },
    { id: "d4", name: "AC Lounge", type: "ac", status: "off" },
    { id: "d5", name: "Back Door", type: "door", status: "locked" },
  ]);

  const handleToggle = (device: Device) => {
    let newStatus: Device["status"] = device.status;

    switch (device.type) {
      case "light":
      case "ac":
      case "camera":
        newStatus = device.status === "on" ? "off" : "on";
        break;
      case "door":
      case "gate":
        newStatus = device.status === "locked" ? "unlocked" : "locked";
        break;
    }

    const updatedDevices = estateDevices.map((d) =>
      d.id === device.id ? { ...d, status: newStatus } : d
    );
    setEstateDevices(updatedDevices);

    // Pass action to parent (dashboard/chat)
    onAction(device.id, newStatus);
  };

  const getIcon = (type: Device["type"]) => {
    switch (type) {
      case "light":
        return <FaLightbulb />;
      case "ac":
        return <FaFan />;
      case "door":
        return <FaDoorOpen />;
      case "camera":
        return <FaVideo />;
      case "gate":
        return <FaLock />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-md w-full max-w-3xl mx-auto">
      <h3 className="text-white font-semibold mb-4">Estate Device Control</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {estateDevices.map((device) => (
          <motion.button
            key={device.id}
            onClick={() => handleToggle(device)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-md transition-all border ${
              device.status === "on" || device.status === "unlocked"
                ? "bg-green-600 border-green-500 text-white"
                : "bg-gray-800 border-gray-700 text-gray-300"
            }`}
          >
            <div className="text-2xl mb-2">{getIcon(device.type)}</div>
            <span className="text-sm font-medium text-center">{device.name}</span>
            <span className="text-xs mt-1 capitalize">
              {device.status === "on" || device.status === "unlocked" ? "Active" : "Inactive"}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
