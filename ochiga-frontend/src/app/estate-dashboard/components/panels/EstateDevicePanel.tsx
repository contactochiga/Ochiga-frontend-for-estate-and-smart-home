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
  onAction,
}: {
  estateId?: string;
  devices?: Device[];
  onAction?: (id: string, action: string) => void;
}) {
  const [devices, setDevices] = useState<Device[]>(initial);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

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

  const toggle = async (id: string) => {
    const current = devices.find((d) => d.id === id);
    if (!current) return;

    const newStatus = current.status === "online" ? "offline" : "online";

    setDevices((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
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

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaPlug className="text-[#8A0A0A]" size={18} />
          <h3 className="text-[#8A0A0A] font-semibold text-lg">
            Estate Devices
          </h3>
        </div>

        {/* SEARCH BAR */}
        <div className="flex items-center gap-2 max-w-[250px] w-full">
          <input
            placeholder="Search devices..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 text-black bg-white focus:outline-none w-full"
          />
          <button
            onClick={load}
            className="px-3 py-2 rounded bg-[#8A0A0A] text-white"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* DEVICE LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-auto">
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          filtered.map((d) => (
            <div
              key={d.id}
              className="bg-gray-100 border border-gray-300 p-3 rounded flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-black font-medium">{d.name}</div>
                  <div className="text-xs text-gray-600">
                    {d.type || "Unknown"} • {d.location || "Unassigned"}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelected(d.id);
                      onAction?.(d.id, "open");
                    }}
                    className="p-1 text-[#8A0A0A]"
                  >
                    <FaWrench />
                  </button>

                  <button
                    onClick={() => toggle(d.id)}
                    className={`px-2 py-1 rounded ${
                      d.status === "online"
                        ? "bg-green-600 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    <FaToggleOn />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600">
                <div>
                  {d.lastSeen
                    ? `seen ${new Date(d.lastSeen).toLocaleTimeString()}`
                    : "no activity"}
                </div>
                <div>{d.status}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FOOTER BUTTONS */}
      <div className="mt-4 flex gap-3">
