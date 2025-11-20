"use client";

import { useState, useEffect } from "react";

type Device = {
  id: string;
  name: string;
  type: string;
  ip: string;
};

interface DeviceDiscoveryPanelProps {
  estateId: string;   // ONLY estate ID required
}

export default function DeviceDiscoveryPanel({ estateId }: DeviceDiscoveryPanelProps) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);

  const scanDevices = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/estate/${estateId}/discover-devices`);
      const data = await res.json();
      setDevices(data.devices || []);
    } catch (err) {
      console.error("Scan error:", err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Estate Device Discovery</h2>

      <button
        onClick={scanDevices}
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {loading ? "Scanning..." : "Scan for Estate Devices"}
      </button>

      {devices.length === 0 && !loading && <p>No devices discovered yet.</p>}

      {devices.map((dev) => (
        <div
          key={dev.id}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        >
          <strong>{dev.name}</strong>
          <p>Type: {dev.type}</p>
          <p>IP: {dev.ip}</p>
        </div>
      ))}
    </div>
  );
}
