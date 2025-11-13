"use client";

import { FC } from "react";

interface Props {
  devices: { id: string; name: string; status: string }[];
  onAction: (deviceId: string, action: string) => void;
}

const EstateDevicePanel: FC<Props> = ({ devices, onAction }) => {
  const defaultDevices = devices.length
    ? devices
    : [
        { id: "d1", name: "Main Gate", status: "closed" },
        { id: "d2", name: "Estate Lights", status: "off" },
        { id: "d3", name: "CCTV", status: "off" },
        { id: "d4", name: "AC in Lobby", status: "off" },
      ];

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
              onClick={() => onAction(device.id, device.status === "on" ? "off" : "on")}
              className="bg-red-600 text-white px-3 py-1 rounded-full text-xs"
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
