"use client";

import { FC } from "react";

interface DeviceAction {
  id: string;
  name: string;
  status: string;
  type: string;
}

interface Props {
  devices: DeviceAction[];
  onAction: (deviceId: string, action: string) => void;
}

const EstateDevicePanel: FC<Props> = ({ devices, onAction }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 mt-2 shadow-md flex flex-col gap-3">
      {devices.length === 0 && (
        <p className="text-gray-400 text-sm">No estate devices detected.</p>
      )}

      {devices.map((d) => (
        <div
          key={d.id}
          className="flex justify-between items-center bg-gray-800/50 p-2 rounded-lg"
        >
          <span className="text-gray-100 text-sm">{d.name}</span>
          <div className="flex gap-2">
            {d.type === "toggle" && (
              <>
                <button
                  onClick={() => onAction(d.id, "ON")}
                  className="px-2 py-1 text-xs bg-green-600 rounded hover:bg-green-700"
                >
                  ON
                </button>
                <button
                  onClick={() => onAction(d.id, "OFF")}
                  className="px-2 py-1 text-xs bg-red-600 rounded hover:bg-red-700"
                >
                  OFF
                </button>
              </>
            )}
            {d.type === "view" && (
              <button
                onClick={() => onAction(d.id, "VIEW")}
                className="px-2 py-1 text-xs bg-blue-600 rounded hover:bg-blue-700"
              >
                VIEW
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EstateDevicePanel;
