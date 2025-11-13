"use client";

import { FC } from "react";

interface Light {
  id: string;
  location: string;
  status: "ON" | "OFF";
}

interface Props {
  lights: Light[];
  onAction: (lightId: string, action: string) => void;
}

const EstateLightingPanel: FC<Props> = ({ lights, onAction }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 mt-2 shadow-md flex flex-col gap-3">
      {lights.length === 0 && (
        <p className="text-gray-400 text-sm">No estate lights configured.</p>
      )}
      {lights.map((l) => (
        <div
          key={l.id}
          className="flex justify-between items-center bg-gray-800/50 p-2 rounded-lg"
        >
          <span className="text-gray-100 text-sm">{l.location}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onAction(l.id, "ON")}
              className="px-2 py-1 text-xs bg-green-600 rounded hover:bg-green-700"
            >
              ON
            </button>
            <button
              onClick={() => onAction(l.id, "OFF")}
              className="px-2 py-1 text-xs bg-red-600 rounded hover:bg-red-700"
            >
              OFF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EstateLightingPanel;
