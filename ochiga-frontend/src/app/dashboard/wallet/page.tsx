"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";

export default function ResidentWalletCard() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>(0);

  // TODO: Replace with logged-in user id (from auth context or token)
  const userId = "123";

  // Load wallet balance
  const loadWallet = async () => {
    try {
      setLoading(true);
      const res = await apiRequest(`/wallet/${userId}`, "GET");
      setBalance(res.balance);
    } catch (err) {
      console.error("Error fetching wallet:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fund wallet
  const handleFund = async () => {
    if (amount <= 0) return;
    try {
      await apiRequest(`/wallet/${userId}/fund`, "POST", { amount });
      setAmount(0);
      await loadWallet(); // refresh
    } catch (err) {
      console.error("Error funding wallet:", err);
    }
  };

  // Debit wallet
  const handleDebit = async () => {
    if (amount <= 0) return;
    try {
      await apiRequest(`/wallet/${userId}/debit`, "POST", { amount });
      setAmount(0);
      await loadWallet(); // refresh
    } catch (err) {
      console.error("Error debiting wallet:", err);
    }
  };

  useEffect(() => {
    loadWallet();
  }, []);

  return (
    <div className="p-5 rounded-xl bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        Wallet
      </h2>
      <p className="text-2xl font-semibold text-[#800000] mb-4">
        {loading ? "Loading..." : balance !== null ? `₦${balance}` : "—"}
      </p>

      {/* Input for Amount */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleFund}
          className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold hover:opacity-90"
        >
          Fund
        </button>
        <button
          onClick={handleDebit}
          className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold hover:opacity-90"
        >
          Debit
        </button>
      </div>
    </div>
  );
}
