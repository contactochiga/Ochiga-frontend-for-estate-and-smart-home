"use client";

import { useState, useEffect } from "react";
import { FaBroadcastTower, FaPlus, FaCheck, FaSync } from "react-icons/fa";

export default function DeviceDiscoveryPanel() {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<
    { id: number; name: string; type: string; status: "found" | "connected" }[]
  >([]);

  // Mock scan function (simulate discovering devices)
  const handleScan = () => {
    setIsScanning(true);
    setDevices([]);
    setTimeout(() => {
      setDevices([
        { id: 1, name: "Smart Bulb", type: "Wi-Fi", status: "found" },
        { id: 2, name: "Door Lock", type: "Zigbee", status: "found" },
        { id: 3, name: "AC Controller", type: "Wi-Fi", status: "found" },
      ]);
      setIsScanning(false);
    }, 2500);
  };

  // Mock connect function
  const handleConnect = (id: number) => {
    setDevices((prev) =>
      prev.map((dev) =>
        dev.id === id ? { ...dev, status: "connected" } : dev
      )
    );
  };

  useEffect(() => {
    // Auto scan on mount
    handleScan();
  }, []);

  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <p className="text-green-400 font-semibold">📡 Device Discovery</p>
        <button
          onClick={handleScan}
          disabled={isScanning}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
            isScanning
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-600 text-white"
          }`}
        >
          <FaSync className={isScanning ? "animate-spin" : ""} />
          {isScanning ? "Scanning..." : "Rescan"}
        </button>
      </div>

      {/* Device List */}
      <div className="grid grid-cols-2 gap-2">
        {devices.map((dev) => (
          <div
            key={dev.id}
            className={`p-3 rounded-lg border ${
              dev.status === "connected"
                ? "border-green-500 bg-green-900/20"
                : "border-gray-700 bg-gray-800"
            } transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-200 font-medium">{dev.name}</span>
              <span
                className={`text-[10px] ${
                  dev.type === "Wi-Fi"
                    ? "text-blue-400"
                    : dev.type === "Zigbee"
                    ? "text-pink-400"
                    : "text-gray-400"
                }`}
              >
                {dev.type}
              </span>
            </div>

            {dev.status === "connected" ? (
              <div className="flex items-center text-green-400 text-[11px]">
                <FaCheck className="mr-1" /> Connected
              </div>
            ) : (
              <button
                onClick={() => handleConnect(dev.id)}
                className="flex items-center justify-center w-full bg-green-700 hover:bg-green-600 text-white rounded-full text-[11px] py-1 mt-1 transition"
              >
                <FaPlus className="mr-1" /> Connect
              </button>
            )}
          </div>
        ))}

        {devices.length === 0 && (
          <div className="col-span-2 text-center py-6 text-gray-400 text-[11px] italic">
            {isScanning ? "Scanning for nearby devices..." : "No devices found."}
          </div>
        )}
      </div>

      {/* Optional scanning animation when active */}
      {isScanning && (
        <div className="absolute inset-0 bg-gray-900/70 flex flex-col items-center justify-center rounded-xl">
          <FaBroadcastTower className="text-green-400 text-3xl animate-pulse mb-2" />
          <p className="text-gray-400 text-[11px]">Scanning nearby network...</p>
        </div>
      )}
    </div>
  );
}
