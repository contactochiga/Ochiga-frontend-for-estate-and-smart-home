"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { FaBroadcastTower, FaPlus, FaCheck, FaSync } from "react-icons/fa";

type Device = {
  id: string | number;
  name: string;
  protocol: string;
  status: "found" | "connected";
  aiSummary?: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DeviceDiscoveryPanel() {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [error, setError] = useState("");

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:5000"; // updated fallback

  /* -------------------------
      FETCH: Discover Devices
  -------------------------- */
  const discoverDevices = async () => {
    try {
      setIsScanning(true);
      setError("");
      setDevices([]);

      // fetch supabase access token
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const token = session?.access_token;
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`${BACKEND_URL}/devices/discover`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Discovery failed");

      setDevices(data.devices || []);
    } catch (err: any) {
      setError(err.message || "Failed to discover devices");
    } finally {
      setIsScanning(false);
    }
  };

  /* -------------------------
     CONNECT SPECIFIC DEVICE
  -------------------------- */
  const connectDevice = async (id: string | number) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const token = session?.access_token;
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`${BACKEND_URL}/devices/connect/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Connection failed");

      setDevices((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, status: "connected" } : d
        )
      );
    } catch (err: any) {
      setError(err.message || "Failed to connect device");
    }
  };

  useEffect(() => {
    discoverDevices();
  }, []);

  return (
    <div className="relative mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm transition-all duration-300 animate-fadeIn">

      <div className="flex items-center justify-between mb-2">
        <p className="text-green-400 font-semibold">📡 AI Device Discovery</p>

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

      {error && <p className="text-red-400 text-[11px] mb-2">{error}</p>}

      <div className="grid grid-cols-2 gap-2">
        {devices.length ? (
          devices.map((dev) => (
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
                    dev.protocol.toLowerCase() === "wifi"
                      ? "text-blue-400"
                      : dev.protocol.toLowerCase() === "zigbee"
                      ? "text-pink-400"
                      : "text-gray-400"
                  }`}
                >
                  {dev.protocol.toUpperCase()}
                </span>
              </div>

              {dev.aiSummary && (
                <p className="text-gray-400 text-[10px] italic mb-1">
                  {dev.aiSummary}
                </p>
              )}

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

      {isScanning && (
        <div className="absolute inset-0 bg-gray-900/70 flex flex-col items-center justify-center rounded-xl">
          <FaBroadcastTower className="text-green-400 text-3xl animate-pulse mb-2" />
          <p className="text-gray-400 text-[11px]">AI scanning nearby network...</p>
        </div>
      )}
    </div>
  );
}
