"use client";

import { FC } from "react";

interface Props {
  devices?: { id: string; name: string; status: string }[]; // optional now
  onAction?: (deviceId: string, action: string) => void; // optional now
}

const EstateDevicePanel: FC<Props> = ({ devices = [], onAction = () => {} }) => {
  // Use fallback default devices if none provided
  const defaultDevices =
    devices && devices.length
      ? devices
      : [
          { id: "d1", name: "Main Gate", status: "closed" },
          { id: "d2", name: "Estate Lights", status: "off" },
          { id: "d3", name: "CCTV", status: "off" },
          { id: "d4", name: "AC in Lobby", status: "off" },
        ];

  const handleAction = (deviceId: string, currentStatus: string) => {
    const newAction = currentStatus === "on" ? "off" : "on";
    onAction(deviceId, newAction);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 mt-2 shadow-md">
      <h3 className="text-white font-semibold mb-2">Estate Devices</h3>
      <div className="flex flex-col gap-2">
        {defaultDevices.map((device) => (
          <div
            key={device.id}
            className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
          >
            <span className="text-gray-200">{device.name}</span>
            <button
              onClick={() => handleAction(device.id, device.status)}
              className={`${
                device.status === "on"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              } text-white px-3 py-1 rounded-full text-xs transition-colors`}
            >
              {device.status === "on" ? "Turn Off" : "Turn On"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstateDevicePanel;
