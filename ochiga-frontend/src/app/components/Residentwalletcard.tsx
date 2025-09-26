"use client";

import { useState } from "react";
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

export default function WalletCard() {
  const [walletBalance] = useState(500000);
  const [showBalance, setShowBalance] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const paymentMethods = [
    { name: "Pay with Card", icon: CreditCardIcon },
    { name: "Pay with Bank", icon: BuildingLibraryIcon },
    { name: "Pay with USSD", icon: DevicePhoneMobileIcon },
    { name: "Pay with OPay", icon: ArrowUpRightIcon },
  ];

  const accountNumber = "1234567890";
  const bankName = "Ochiga Microfinance Bank";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl p-6 shadow-md bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      {/* Wallet Balance Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs uppercase text-gray-600 dark:text-gray-400">Wallet Balance</p>
            <h2 className="text-2xl font-bold tracking-wide">
              {showBalance ? `₦${walletBalance.toLocaleString()}` : "••••••"}
            </h2>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {showBalance ? (
              <EyeIcon className="h-5 w-5 text-[#800000]" />
            ) : (
              <EyeSlashIcon className="h-5 w-5 text-[#800000]" />
            )}
          </button>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#800000] px-3 py-2 rounded-lg font-semibold text-sm flex items-center gap-1 text-white shadow hover:bg-[#990000] transition"
        >
          <BanknotesIcon className="h-5 w-5" />
          Fund Wallet
        </button>
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
            <div className="p-4 mb-4 rounded-xl border border-[#800000] bg-red-50 dark:bg-[#800000]/20">
              <p className="text-sm font-semibold">Bank Transfer</p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                Send to the account below and your wallet will be credited instantly.
              </p>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-sm font-medium">{bankName}</p>
                  <p className="text-lg font-bold tracking-wide text-[#800000]">
                    {accountNumber}
                  </p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[#800000] text-white text-sm font-medium shadow hover:bg-[#990000]"
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
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-gray-800 transition shadow-sm"
                  >
                    <Icon className="h-6 w-6 text-[#800000]" />
                    <span className="text-sm font-medium">{method.name}</span>
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
