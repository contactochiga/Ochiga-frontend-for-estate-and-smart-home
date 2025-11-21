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

  /* LOAD ESTATE DEVICES */
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

  /* TOGGLE DEVICE */
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
    } catch (err) {
      console.error(err);
      load();
      alert("Action failed");
    }
  };

  const filtered = filter
    ? devices.filter((d) =>
        (d.name + d.type + d.location)
          .toLowerCase()
          .includes(filter.toLowerCase())
      )
    : devices;

  /* -------------------------
     OCHIGA BRAND COLORS
     maroonRed = #8A0C0C
  ------------------------- */
  const maroon = "bg-[#8A0C0C]";
  const maroonText = "text-[#8A0C0C]";

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaPlug className={`${maroonText}`} />
          <h3 className="text-gray-900 font-semibold">Estate Devices</h3>
        </div>

        {/* SEARCH */}
        <div className="flex items-center gap-2">
          <input
            placeholder="Search devices..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 text-gray-800 w-40 focus:outline-none focus:ring-2 focus:ring-[#8A0C0C]"
          />
          <button
            onClick={load}
            className={`${maroon} text-white px-3 py-2 rounded`}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* DEVICE GRID */}
      <div className="grid grid-cols-2 gap-3 max-h-72 overflow-auto">
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          filtered.map((d) => (
            <div
              key={d.id}
              className="bg-gray-100 p-3 rounded-lg border border-gray-200 flex flex-col gap-2"
            >
              {/* Title Row */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900 font-medium">{d.name}</div>
                  <div className="text-xs text-gray-500">
                    {d.type || "Unknown"} • {d.location || "Unassigned"}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Settings */}
                  <button
                    onClick={() => onAction?.(d.id, "open")}
                    className="p-1 text-gray-700"
                  >
                    <FaWrench />
                  </button>

                  {/* Toggle */}
                  <button
                    onClick={() => toggle(d.id)}
                    className={`px-2 py-1 rounded text-white ${
                      d.status === "online"
                        ? "bg-green-600"
                        : "bg-gray-500"
                    }`}
                  >
                    <FaToggleOn />
                  </button>
                </div>
              </div>

              {/* Status Row */}
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div>
                  {d.lastSeen
                    ? `seen ${new Date(d.lastSeen).toLocaleTimeString()}`
                    : "no activity"}
                </div>
                <div className={d.status === "online" ? "text-green-700" : "text-red-700"}>
                  {d.status}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-4 flex gap-3">
        <button className={`${maroon} text-white px-4 py-2 rounded`}>
          Assign
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded">
          Maintenance
        </button>
      </div>
    </div>
  );
}
