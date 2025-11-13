"use client";

import { FC } from "react";

interface Props {
  utilities?: { name: string; status: string }[];
}

const EstatePowerPanel: FC<Props> = ({ utilities }) => {
  const defaultUtilities = utilities || [
    { name: "Electricity", status: "stable" },
    { name: "Water Supply", status: "on" },
    { name: "Gas Supply", status: "off" },
  ];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 mt-2 shadow-md">
      <h3 className="text-white font-semibold mb-2">Estate Utilities</h3>
      <ul className="flex flex-col gap-2 text-gray-200">
        {defaultUtilities.map((u, i) => (
          <li key={i} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
            <span>{u.name}</span>
            <span>{u.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstatePowerPanel;
