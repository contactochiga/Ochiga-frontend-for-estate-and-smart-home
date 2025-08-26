"use client";

import { useState } from "react";
import Link from "next/link";

export default function WalletPage() {
  const [balance] = useState(25000); // dummy balance
  const transactions = [
    { id: 1, date: "2025-08-20", desc: "Service Bill Payment", amount: -5000, status: "Success" },
    { id: 2, date: "2025-08-18", desc: "Wallet Top-up", amount: 10000, status: "Success" },
    { id: 3, date: "2025-08-15", desc: "Community Dues", amount: -2000, status: "Pending" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Wallet
      </h1>

      {/* Balance Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
        <h2 className="text-gray-500 dark:text-gray-400 text-sm">Available Balance</h2>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
          ₦{balance.toLocaleString()}
        </p>

        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Fund Wallet
          </button>

          {/* 🔗 Route to Utilities (Pay Bills) */}
          <Link href="/dashboard/utilities">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Pay Bills
            </button>
          </Link>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Recent Transactions
        </h3>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center py-3">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {tx.desc}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-semibold ${
                    tx.amount < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {tx.amount < 0 ? "-" : "+"}₦{Math.abs(tx.amount).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
