"use client";

import { useState, useEffect } from "react";
import { FaBroadcastTower, FaPlus, FaCheck, FaSync } from "react-icons/fa";

type Device = {
  id: string | number;
  name: string;
  protocol: string;
  status: "found" | "connected";
  aiSummary?: string;
};

export default function DeviceDiscoveryPanel() {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [error, setError] = useState("");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  /* -----------------------------------------------
     SCAN FOR ESTATE DEVICES (no home required)
  ------------------------------------------------ */
  const discoverDevices = async () => {
    try {
      setIsScanning(true);
      setError("");
      setDevices([]);

      const res = await fetch(`${BACKEND_URL}/estate/devices/discover`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to discover devices");

      setDevices(data.devices || []);
    } catch (err: any) {
      setError(err.message || "Failed to scan for devices");
    } finally {
      setIsScanning(false);
    }
  };

  /* -----------------------------------------------
     CONNECT A FOUND DEVICE
  ------------------------------------------------ */
  const connectDevice = async (id: string | number) => {
    try {
      const res = await fetch(`${BACKEND_URL}/estate/devices/connect/${id}`, {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Connection failed");

      setDevices((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, status: "connected" } : d
        )
      );
    } catch (err: any) {
      setError(err.message || "Unable to connect device");
    }
  };

  useEffect(() => {
    discoverDevices();
  }, []);

  return (
    <div className="relative mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm transition-all duration-300 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-green-400 font-semibold">📡 Estate Device Discovery</p>

        <button
          onClick={discoverDevices}
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

      {/* Error */}
      {error && <p className="text-red-400 text-[11px] mb-2">{error}</p>}

      {/* Device List */}
      <div className="grid grid-cols-2 gap-2">
        {devices.length > 0 ? (
          devices.map((dev) => (
            <div
              key={dev.id}
              className={`p-3 rounded-lg border ${
                dev.status === "connected"
                  ? "border-green-500 bg-green-900/20"
                  : "border-gray-700 bg-gray-800"
              } transition-all duration-300`}
            >
              {/* Name + Protocol */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-200 font-medium">{dev.name}</span>
                <span
                  className={`text-[10px] ${
                    dev.protocol.toLowerCase() === "wifi"
                      ? "text-blue-400"
                      : dev.protocol.toLowerCase() === "zigbee"
                      ? "text-pink-400"
                      : dev.protocol.toLowerCase() === "ssdp"
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                >
                  {dev.protocol.toUpperCase()}
                </span>
              </div>

              {/* AI Summary */}
              {dev.aiSummary && (
                <p className="text-gray-400 text-[10px] italic mb-1">
                  {dev.aiSummary}
                </p>
              )}

              {/* Connect Button */}
              {dev.status === "connected" ? (
                <div className="flex items-center text-green-400 text-[11px]">
                  <FaCheck className="mr-1" /> Connected
                </div>
              ) : (
                <button
                  onClick={() => connectDevice(dev.id)}
                  className="flex items-center justify-center w-full bg-green-700 hover:bg-green-600 text-white rounded-full text-[11px] py-1 mt-1 transition"
                >
                  <FaPlus className="mr-1" /> Connect
                </button>
              )}
            </div>
          ))
        ) : (
          !isScanning && (
            <div className="col-span-2 text-center py-6 text-gray-400 text-[11px] italic">
              No devices found.
            </div>
          )
        )}
      </div>

      {/* Scanning Overlay */}
      {isScanning && (
        <div className="absolute inset-0 bg-gray-900/70 flex flex-col items-center justify-center rounded-xl">
          <FaBroadcastTower className="text-green-400 text-3xl animate-pulse mb-2" />
          <p className="text-gray-400 text-[11px]">Scanning estate devices...</p>
        </div>
      )}
    </div>
  );
}
