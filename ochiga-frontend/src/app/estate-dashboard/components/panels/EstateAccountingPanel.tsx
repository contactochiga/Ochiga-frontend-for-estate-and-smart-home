"use client";

import { FC } from "react";

interface Props {
  accounts?: { resident: string; status: string; balance: string }[];
}

const EstateAccountingPanel: FC<Props> = ({ accounts }) => {
  const defaultAccounts = accounts || [
    { resident: "Alice", status: "paid", balance: "$0" },
    { resident: "Bob", status: "pending", balance: "$150" },
  ];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 mt-2 shadow-md">
      <h3 className="text-white font-semibold mb-2">Estate Accounting</h3>
      <div className="flex flex-col gap-2 text-gray-200">
        {defaultAccounts.map((acc, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
          >
            <span>{acc.resident}</span>
            <span>{acc.status}</span>
            <span>{acc.balance}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstateAccountingPanel;
