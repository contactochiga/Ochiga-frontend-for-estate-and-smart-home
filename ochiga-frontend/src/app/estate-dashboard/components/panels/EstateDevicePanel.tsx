"use client";

import { useEffect, useState } from "react";
import { FaPlug, FaWrench, FaToggleOn, FaSearch } from "react-icons/fa";
import { deviceService } from "@/services/deviceService";

type Device = {
  id: string;
  name: string;
  type?: string;
  status?: "online" | "offline" | "connected";
  lastSeen?: string;
  location?: string;
};

export default function EstateDevicePanel({
  estateId = "current-estate",
  devices: initial = [],
  onAction
}: {
  estateId?: string;
  devices?: Device[];
  onAction?: (id: string, action: string) => void;
}) {
  
  const [devices, setDevices] = useState<Device[]>(initial);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  const maroon = "#8A0C0C";

  /* Load devices */
  const load = async () => {
    setLoading(true);
    try {
      const d = await deviceService.listEstateDevices(estateId);
      setDevices(d || []);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  /* Toggle */
  const toggle = async (id: string) => {
    const current = devices.find((d) => d.id === id);
    if (!current) return;

    const newStatus = current.status === "online" ? "offline" : "online";

    setDevices((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: newStatus } : p
      )
    );

    try {
      await deviceService.toggleDevice(id, newStatus);
    } catch {
      load();
    }
  };

  const filtered = filter
    ? devices.filter((d) =>
        (d.name + d.type + d.location)
          .toLowerCase()
          .includes(filter.toLowerCase())
      )
    : devices;

  /* SAMPLE DEVICES (If none returned) */
  const sample = [
    {
      id: "1",
      name: "Gate Control Unit",
      type: "access",
      status: "online",
      location: "Main Gate"
    },
    {
      id: "2",
      name: "Perimeter Camera 01",
      type: "camera",
      status: "online",
      location: "Fence North"
    },
    {
      id: "3",
      name: "Street Light Controller",
      type: "lighting",
      status: "offline",
      location: "Zone B"
    }
  ];

  const finalDevices = devices.length === 0 ? sample : filtered;

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm w-full">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <FaPlug color={maroon} className="text-sm" />
        <h3 className="text-sm font-semibold text-gray-900">Estate Devices</h3>
      </div>

      {/* Search Box */}
      <input
        placeholder="Search devices..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full px-3 py-2 mb-3 rounded border border-gray-300 text-sm 
        focus:outline-none focus:ring-2"
        style={{ focusRingColor: maroon }}
      />

      {/* Scan Button */}
      <button
        onClick={load}
        className="w-full py-2 rounded-lg text-white text-sm font-medium mb-4"
        style={{ backgroundColor: maroon }}
      >
        Scan for New Devices
      </button>

      {/* Device List */}
      <div className="flex flex-col gap-2 max-h-72 overflow-auto pr-1">
        {loading ? (
          <div className="text-gray-500 text-sm">Scanning...</div>
        ) : (
          finalDevices.map((d) => (
            <div
              key={d.id}
              className="p-3 rounded-lg border border-gray-200 bg-gray-100 cursor-pointer 
              hover:bg-gray-200 transition"
            >
              {/* Row 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{d.name}</div>
                  <div className="text-xs text-gray-500">
                    {d.type} • {d.location}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="text-gray-700 text-sm" onClick={() => onAction?.(d.id, "open")}>
                    <FaWrench />
                  </button>

                  <button
                    className="px-2 py-1 rounded text-white text-xs"
                    style={{
                      backgroundColor: d.status === "online" ? "green" : "gray"
                    }}
                    onClick={() => toggle(d.id)}
                  >
                    <FaToggleOn />
                  </button>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                <div>{d.status === "online" ? "Active now" : "Offline"}</div>
                <div
                  className={
                    d.status === "online" ? "text-green-700" : "text-red-700"
                  }
                >
                  {d.status}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
