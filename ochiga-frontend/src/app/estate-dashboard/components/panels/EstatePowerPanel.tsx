"use client";

import { FC } from "react";

interface Device {
  id: string;
  name: string;
  status: string;
  type: "water" | "power";
}

interface Props {
  powerDevices: Device[];
  onAction: (deviceId: string, action: string) => void;
}

const EstatePowerPanel: FC<Props> = ({ powerDevices, onAction }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 mt-2 shadow-md flex flex-col gap-3">
      {powerDevices.length === 0 && (
        <p className="text-gray-400 text-sm">No estate power/water devices configured.</p>
      )}
      {powerDevices.map((d) => (
        <div
          key={d.id}
          className="flex justify-between items-center bg-gray-800/50 p-2 rounded-lg"
        >
          <span className="text-gray-100 text-sm">{d.name}</span>
          <button
            onClick={() => onAction(d.id, "TOGGLE")}
            className="px-2 py-1 text-xs bg-blue-600 rounded hover:bg-blue-700"
          >
            {d.status === "ON" ? "OFF" : "ON"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default EstatePowerPanel;
