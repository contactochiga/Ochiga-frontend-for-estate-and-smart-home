"use client";

import { FC } from "react";

interface Resident {
  id: string;
  name: string;
}

interface Props {
  residents: Resident[];
  onAction: (residentId: string, action: string) => void;
}

const EstateCommunityPanel: FC<Props> = ({ residents, onAction }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 mt-2 shadow-md flex flex-col gap-3">
      {residents.length === 0 && (
        <p className="text-gray-400 text-sm">No residents in the community yet.</p>
      )}
      {residents.map((r) => (
        <div
          key={r.id}
          className="flex justify-between items-center bg-gray-800/50 p-2 rounded-lg"
        >
          <span className="text-gray-100 text-sm">{r.name}</span>
          <button
            onClick={() => onAction(r.id, "MESSAGE")}
            className="px-2 py-1 text-xs bg-blue-600 rounded hover:bg-blue-700"
          >
            Message
          </button>
        </div>
      ))}
    </div>
  );
};

export default EstateCommunityPanel;
