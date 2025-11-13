"use client";

import { FC } from "react";

interface Resident {
  id: string;
  name: string;
  balance: number;
}

interface Props {
  residents: Resident[];
  onAction: (residentId: string, action: string) => void;
}

const EstateAccountingPanel: FC<Props> = ({ residents, onAction }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 mt-2 shadow-md flex flex-col gap-3">
      {residents.length === 0 && (
        <p className="text-gray-400 text-sm">No residents registered yet.</p>
      )}
      {residents.map((r) => (
        <div
          key={r.id}
          className="flex justify-between items-center bg-gray-800/50 p-2 rounded-lg"
        >
          <span className="text-gray-100 text-sm">{r.name}</span>
          <span className="text-gray-200 text-xs">₦{r.balance}</span>
          {r.balance > 0 && (
            <button
              onClick={() => onAction(r.id, "SEND_REMINDER")}
              className="px-2 py-1 text-xs bg-red-600 rounded hover:bg-red-700"
            >
              Remind
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default EstateAccountingPanel;
