"use client";

import { useEffect, useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  BanknotesIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  DevicePhoneMobileIcon,
  ArrowUpRightIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { apiRequest } from "@/lib/api";

export default function WalletPage() {
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // TODO: Replace with real userId from auth context/session
  const userId = "123";
  const accountNumber = "1234567890";
  const bankName = "Ochiga Microfinance Bank";

  const paymentMethods = [
    { name: "Pay with Card", icon: CreditCardIcon },
    { name: "Pay with Bank", icon: BuildingLibraryIcon },
    { name: "Pay with USSD", icon: DevicePhoneMobileIcon },
    { name: "Pay with OPay", icon: ArrowUpRightIcon },
  ];

  // Fetch wallet + transactions
  const loadWallet = async () => {
    try {
      setLoading(true);
      const res = await apiRequest(`/wallet/${userId}`, "GET");
      setWalletBalance(res.balance);

      const txRes = await apiRequest(`/wallet/${userId}/transactions`, "GET");
      setTransactions(txRes || []);
    } catch (err) {
      console.error("Error fetching wallet:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWallet();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-lg font-bold text-gray-900 dark:text-white">Wallet</h1>

      {/* Wallet Balance Card */}
      <div className="rounded-2xl p-6 text-gray-900 dark:text-white shadow-xl bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="flex justify-between items-center">
          <p className="text-xs uppercase opacity-70">Wallet Balance</p>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="bg-gray-200 dark:bg-gray-800 p-2 rounded-lg hover:opacity-80 transition"
          >
            {showBalance ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeSlashIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Balance */}
        <h2 className="text-3xl font-bold tracking-wide mt-3 mb-4">
          {loading
            ? "Loading..."
            : showBalance
            ? `₦${walletBalance?.toLocaleString() || 0}`
            : "••••••"}
        </h2>

        {/* Fund Wallet button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl 
            bg-[#800000] text-white font-medium shadow-md hover:opacity-90 transition"
        >
          <BanknotesIcon className="h-6 w-6" />
          Fund Wallet
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Transaction History
        </h3>
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center p-3 rounded-xl 
                  bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {tx.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {tx.date}
                  </p>
                </div>
                <span
                  className={`font-semibold ${
                    tx.type === "credit"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {tx.type === "credit" ? "+" : "-"}₦
                  {tx.amount.toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No transactions yet.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-t-2xl p-6 shadow-2xl animate-slideUp">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Choose Payment Method
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            {/* Bank Transfer */}
            <div className="p-4 mb-4 rounded-xl border border-[#800000] bg-[#800000]/10 dark:bg-[#800000]/20">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Bank Transfer
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                Send to the account below and your wallet will be credited
                instantly.
              </p>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {bankName}
                  </p>
                  <p className="text-lg font-bold tracking-wide text-[#800000]">
                    {accountNumber}
                  </p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg 
                    bg-[#800000] text-white text-sm font-medium shadow hover:opacity-90"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Other Methods */}
            <div className="grid gap-3">
              {paymentMethods.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <button
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl border 
                      border-gray-200 dark:border-gray-700 hover:bg-gray-100 
                      dark:hover:bg-gray-800 transition"
                  >
                    <Icon className="h-6 w-6 text-[#800000]" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {method.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
