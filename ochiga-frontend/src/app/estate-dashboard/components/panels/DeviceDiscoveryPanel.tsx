"use client";

import { useState } from "react";

export default function DeviceDiscoveryPanel() {
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call BACKEND to scan estate network
      const res = await fetch("/api/estate/discover-devices");

      if (!res.ok) {
        throw new Error("Failed to scan estate for devices");
      }

      const data = await res.json();
      setDevices(data.devices || []);
    } catch (err: any) {
      setError(err.message || "An error occurred during scan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-4">
      <h2 className="text-xl font-bold mb-3">Estate Device Discovery</h2>

      <p className="text-gray-600 mb-4">
        Scan the **entire estate network** to automatically detect IoT devices 
        such as CCTV cameras, boom gates, access controllers, street lights, 
        water pumps, utility meters, and other estate-level devices.
      </p>

      <button
        onClick={handleScan}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded-lg mb-4 disabled:bg-gray-400"
      >
        {loading ? "Scanning..." : "Scan Estate Network"}
      </button>

      {error && (
        <p className="text-red-500 font-medium mb-4">{error}</p>
      )}

      {devices.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Discovered Devices</h3>

          <div className="space-y-3">
            {devices.map((dev, idx) => (
              <div
                key={idx}
                className="border p-3 rounded-lg bg-gray-50 shadow-sm"
              >
                <p><strong>Name:</strong> {dev.name}</p>
                <p><strong>Type:</strong> {dev.type}</p>
                <p><strong>IP Address:</strong> {dev.ip}</p>
                <p><strong>Status:</strong> {dev.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && devices.length === 0 && !error && (
        <p className="text-gray-500 text-sm">
          No devices scanned yet. Click the button above to start detection.
        </p>
      )}
    </div>
  );
}
