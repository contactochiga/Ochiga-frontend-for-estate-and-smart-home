"use client";

import { FC } from "react";

interface Camera {
  id: string;
  name: string;
  feedUrl: string;
}

interface Props {
  cameras: Camera[];
  onAction: (cameraId: string, action: string) => void;
}

const EstateCCTVPanel: FC<Props> = ({ cameras, onAction }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 mt-2 shadow-md flex flex-col gap-3">
      {cameras.length === 0 && (
        <p className="text-gray-400 text-sm">No CCTV cameras available.</p>
      )}
      {cameras.map((cam) => (
        <div
          key={cam.id}
          className="flex justify-between items-center bg-gray-800/50 p-2 rounded-lg"
        >
          <span className="text-gray-100 text-sm">{cam.name}</span>
          <button
            onClick={() => onAction(cam.id, "VIEW")}
            className="px-2 py-1 text-xs bg-blue-600 rounded hover:bg-blue-700"
          >
            VIEW
          </button>
        </div>
      ))}
    </div>
  );
};

export default EstateCCTVPanel;
