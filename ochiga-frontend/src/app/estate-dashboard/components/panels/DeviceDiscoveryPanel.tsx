"use client";

import { useState, useEffect } from "react";

interface Device {
  id: string;
  name: string;
  type: string;
}

interface DeviceDiscoveryPanelProps {
  estateId: string;
  homeId: string;
  onAction?: (deviceId: string, action: string) => void;
}

export default function DeviceDiscoveryPanel({
  estateId,
  homeId,
  onAction,
}: DeviceDiscoveryPanelProps) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      try {
        // Replace with your real API endpoint
        const res = await fetch(`/api/devices?estateId=${estateId}&homeId=${homeId}`);
        const data: Device[] = await res.json();
        setDevices(data);
      } catch (err) {
        console.error("Error fetching devices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [estateId, homeId]);

  const filteredDevices = devices.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 text-gray-200">
      <h3 className="font-semibold text-lg">Device Discovery</h3>
      <input
        type="text"
        placeholder="Search devices..."
        className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p className="text-gray-400 text-sm">Loading devices...</p>}
      {filteredDevices.length === 0 && !loading && (
        <p className="text-gray-500 text-sm">No devices found.</p>
      )}
      <div className="space-y-2">
        {filteredDevices.map((d) => (
          <div
            key={d.id}
            className="bg-gray-800 p-3 rounded-md flex justify-between items-center"
          >
            <span>{d.name}</span>
            <span className="text-gray-400 text-xs">{d.type}</span>
            {onAction && (
              <button
                onClick={() => onAction(d.id, "toggle")}
                className="ml-2 px-2 py-1 bg-blue-600 rounded-md text-white text-xs hover:bg-blue-700"
              >
                Toggle
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
