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

export default function WalletCardModern() {
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

  // Fake account details (replace with dynamic backend later)
  const accountNumber = "1234567890";
  const bankName = "Ochiga Microfinance Bank";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-screen -mx-4 sm:-mx-6 md:-mx-8">
      {/* Wallet Balance Card */}
      <div
        className="rounded-2xl p-6 text-white shadow-xl 
                   bg-gradient-to-r from-indigo-600 to-purple-600 
                   dark:from-indigo-700 dark:to-purple-800 
                   flex flex-row justify-between items-center"
      >
        {/* Left Section: Balance + Eye */}
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs uppercase opacity-80">Wallet Balance</p>
            <h2 className="text-2xl font-bold tracking-wide">
              {showBalance ? `₦${walletBalance.toLocaleString()}` : "••••••"}
            </h2>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition flex items-center justify-center"
          >
            {showBalance ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeSlashIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Right Section: Fund Wallet */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-indigo-600 dark:text-indigo-700 
                     px-3 py-2 rounded-lg font-semibold text-sm flex items-center gap-1 
                     whitespace-nowrap shadow hover:bg-gray-100 transition"
        >
          <BanknotesIcon className="h-5 w-5" />
          Fund Wallet
        </button>
      </div>

      {/* Bottom Sheet Modal */}
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

            {/* Bank Transfer Special Section */}
            <div className="p-4 mb-4 rounded-xl border border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Bank Transfer
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                Send to the account below and your wallet will be credited instantly.
              </p>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {bankName}
                  </p>
                  <p className="text-lg font-bold tracking-wide text-indigo-600 dark:text-indigo-400">
                    {accountNumber}
                  </p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700"
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
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 
                               hover:bg-indigo-50 dark:hover:bg-gray-800 transition shadow-sm"
                  >
                    <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
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
