"use client";

import { useState } from "react";

export default function WalletPanel() {
  const [activeTab, setActiveTab] = useState<"add" | "transactions" | null>(null);
  const [balance, setBalance] = useState(2500);
  const [amount, setAmount] = useState("");

  const transactions = [
    { id: 1, type: "Credit", amount: 5000, date: "Nov 8" },
    { id: 2, type: "Debit", amount: 2500, date: "Nov 9" },
  ];

  const handleAddFunds = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;
    setBalance((prev) => prev + amt);
    setAmount("");
    setActiveTab(null);
  };

  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn transition-all duration-300">
      <p className="mb-2 text-purple-400 font-semibold">💳 Wallet</p>

      {/* Wallet Balance */}
      <div className="flex justify-between mb-2">
        <span>Balance:</span>
        <span className="font-semibold text-green-400">
          ₦ {balance.toLocaleString()}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setActiveTab(activeTab === "add" ? null : "add")}
          className={`px-3 py-1 rounded-full transition ${
            activeTab === "add"
              ? "bg-purple-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-200"
          }`}
        >
          Add Funds
        </button>

        <button
          onClick={() =>
            setActiveTab(activeTab === "transactions" ? null : "transactions")
          }
          className={`px-3 py-1 rounded-full transition ${
            activeTab === "transactions"
              ? "bg-purple-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-200"
          }`}
        >
          Transactions
        </button>
      </div>

      {/* Add Funds Form */}
      {activeTab === "add" && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 mt-2 space-y-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full bg-gray-900 border border-gray-700 rounded-md px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            onClick={handleAddFunds}
            className="w-full bg-purple-600 hover:bg-purple-700 rounded-md py-1 text-xs font-medium text-white"
          >
            Fund Wallet
          </button>
        </div>
      )}

      {/* Transaction List */}
      {activeTab === "transactions" && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 mt-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between text-[11px] py-1 border-b border-gray-700 last:border-none"
            >
              <span
                className={`${
                  tx.type === "Credit" ? "text-green-400" : "text-red-400"
                }`}
              >
                {tx.type}
              </span>
              <span>₦ {tx.amount.toLocaleString()}</span>
              <span className="text-gray-400">{tx.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
