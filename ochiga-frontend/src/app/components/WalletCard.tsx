"use client";

import { useState } from "react";
import { CreditCardIcon, BanknotesIcon } from "@heroicons/react/24/outline";

export default function WalletCard() {
  const [walletBalance, setWalletBalance] = useState(12500);

  const fundWallet = () => {
    const amount = 5000;
    setWalletBalance((prev) => prev + amount);
  };

  const payBills = () => {
    if (walletBalance >= 2000) {
      setWalletBalance((prev) => prev - 2000);
    } else {
      alert("Insufficient funds");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
      {/* Balance */}
      <div>
        <p className="text-xs uppercase opacity-80">Wallet Balance</p>
        <h2 className="text-3xl font-bold tracking-wide mt-1">
          ₦{walletBalance.toLocaleString()}
        </h2>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-6 space-x-3">
        <button
          onClick={fundWallet}
          className="flex-1 flex items-center justify-center bg-white/20 rounded-lg py-2 hover:bg-white/30 transition"
        >
          <BanknotesIcon className="h-5 w-5 mr-1" />
          Fund
        </button>
        <button
          onClick={payBills}
          className="flex-1 flex items-center justify-center bg-white/20 rounded-lg py-2 hover:bg-white/30 transition"
        >
          <CreditCardIcon className="h-5 w-5 mr-1" />
          Pay
        </button>
      </div>
    </div>
  );
}
