import { useState, useEffect } from "react";

interface Device {
  id: string;
  name: string;
  type: string;
}

interface DeviceDiscoveryPanelProps {
  estateId: string;
  homeId: string;
}

export default function DeviceDiscoveryPanel({ estateId, homeId }: DeviceDiscoveryPanelProps) {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    // Simulate fetching devices
    const fetchDevices = async () => {
      // Replace with your API call
      const res = await fetch(`/api/devices?estateId=${estateId}&homeId=${homeId}`);
      const data: Device[] = await res.json();
      setDevices(data);
    };

    fetchDevices();
  }, [estateId, homeId]);

  return (
    <div className="space-y-2 text-gray-200">
      <h3 className="font-semibold text-lg">Device Discovery Panel</h3>
      <p className="text-gray-400 text-xs">Estate: {estateId} | Home: {homeId}</p>
      {devices.length === 0 && <p className="text-gray-500 text-sm">No devices found.</p>}
      {devices.map((d) => (
        <div key={d.id} className="bg-gray-800 p-2 rounded-md flex justify-between items-center">
          <span>{d.name}</span>
          <span className="text-gray-400 text-xs">{d.type}</span>
        </div>
      ))}
    </div>
  );
}
