"use client";

import { useEffect, useState } from "react";
import { FaPlug, FaWrench, FaToggleOn, FaSearch } from "react-icons/fa";
import { deviceService } from "@/app/services/deviceService";

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
  const [selected, setSelected] = useState<string | null>(null);

  /* -----------------------------------------------------------
     LOAD ALL DEVICES FOR THE ESTATE
  ----------------------------------------------------------- */
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

  /* -----------------------------------------------------------
     TOGGLE DEVICE ONLINE/OFFLINE
     Uses new: deviceService.toggleDevice()
  ----------------------------------------------------------- */
  const toggle = async (id: string) => {
    const current = devices.find((d) => d.id === id);
    if (!current) return;

    const newStatus = current.status === "online" ? "offline" : "online";

    // Optimistic UI
    setDevices((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: newStatus } : p
      )
    );

    try {
      await deviceService.toggleDevice(id, newStatus);
    } catch (err) {
      console.error(err);
      load(); // rollback
      alert("Action failed");
    }
  };

  /* FILTER DEVICES */
  const filtered = filter
    ? devices.filter((d) =>
        (d.name + d.type + d.location)
          .toLowerCase()
          .includes(filter.toLowerCase())
      )
    : devices;

  return (
    <div className="p-3 bg-gray-900 rounded border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FaPlug className="text-green-400" />
          <h3 className="text-white">Estate Devices</h3>
        </div>
        <div className="flex gap-2">
          <input
            placeholder="search devices"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 border border-gray-700"
          />
          <button onClick={load} className="bg-blue-600 px-3 rounded">
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-auto">
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          filtered.map((d) => (
            <div
              key={d.id}
              className="bg-gray-800 p-2 rounded flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white">{d.name}</div>
                  <div className="text-xs text-gray-400">
                    {d.type || "Unknown"} • {d.location || "Unassigned"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelected(d.id);
                      onAction?.(d.id, "open");
                    }}
                    className="p-1"
                  >
                    <FaWrench />
                  </button>

                  {/* Toggle button */}
                  <button
                    onClick={() => toggle(d.id)}
                    className={`px-2 py-1 rounded ${
                      d.status === "online"
                        ? "bg-green-600"
                        : "bg-gray-700"
                    }`}
                  >
                    <FaToggleOn />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400">
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

      {/* Bottom buttons */}
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => alert("Open device assignment")}
          className="bg-blue-600 px-3 py-2 rounded"
        >
          Assign
        </button>
        <button
          onClick={() => alert("Open maintenance queue")}
          className="bg-gray-700 px-3 py-2 rounded"
        >
          Maintenance
        </button>
      </div>
    </div>
  );
}
