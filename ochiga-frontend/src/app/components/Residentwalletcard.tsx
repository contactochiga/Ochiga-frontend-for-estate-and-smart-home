"use client";

import { useState, useEffect } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  BanknotesIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  DevicePhoneMobileIcon,
  ArrowUpRightIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function ResidentWalletCard() {
  const [walletBalance] = useState(500000);
  const [animatedBalance, setAnimatedBalance] = useState(0);
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

  // Animate balance on load
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const step = walletBalance / (duration / 16);

    const interval = setInterval(() => {
      start += step;
      if (start >= walletBalance) {
        setAnimatedBalance(walletBalance);
        clearInterval(interval);
      } else {
        setAnimatedBalance(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [walletBalance]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Wallet Balance Card */}
      <div
        className="rounded-xl p-5 text-white shadow-md 
                   bg-gradient-to-r from-[#800000] to-[#a00000] 
                   flex flex-row justify-between items-center"
      >
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <div>
            <p className="text-[10px] uppercase opacity-80 tracking-wide">
              Wallet Balance
            </p>
            <h2 className="text-lg sm:text-xl font-bold">
              {showBalance
                ? `₦${animatedBalance.toLocaleString()}`
                : "••••••"}
            </h2>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="bg-white/20 p-1.5 rounded-md hover:bg-white/30 transition flex items-center justify-center"
          >
            {showBalance ? (
              <EyeIcon className="h-4 w-4" />
            ) : (
              <EyeSlashIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Right Section: Fund Wallet */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-[#800000] px-3 py-1.5 rounded-md 
                     font-medium text-xs flex items-center gap-1 
                     whitespace-nowrap shadow-sm hover:bg-gray-100 transition"
        >
          <BanknotesIcon className="h-4 w-4" />
          Fund
        </button>
      </div>

      {/* Bottom Sheet Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
          <div className="backdrop-blur-md bg-white/90 dark:bg-gray-900/90 
                          w-full max-w-md rounded-t-2xl p-5 shadow-xl animate-slideUp">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
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
            <div className="p-3 mb-4 rounded-lg border border-[#800000] bg-red-50 dark:bg-red-900/20">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Bank Transfer
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                Send to the account below for instant credit.
              </p>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <p className="text-xs font-medium text-gray-800 dark:text-gray-100">
                    {bankName}
                  </p>
                  <p className="text-base font-bold text-[#800000]">
                    {accountNumber}
                  </p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#800000] text-white text-xs font-medium shadow hover:bg-[#a00000]"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Fund Shortcuts */}
            <div className="flex gap-2 mb-4">
              {[1000, 5000, 10000].map((amt) => (
                <button
                  key={amt}
                  className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                             text-sm font-medium text-gray-700 dark:text-gray-200 
                             hover:bg-red-50 dark:hover:bg-gray-800 transition"
                >
                  ₦{amt.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Other Methods */}
            <div className="grid gap-2">
              {paymentMethods.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <button
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-lg border border-gray-200 dark:border-gray-700 
                               hover:bg-red-50 dark:hover:bg-gray-800 transition shadow-sm"
                  >
                    <Icon className="h-5 w-5 text-[#800000]" />
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
