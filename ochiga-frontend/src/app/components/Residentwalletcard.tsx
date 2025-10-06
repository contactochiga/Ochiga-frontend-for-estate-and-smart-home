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
import { apiRequest } from "../../lib/api";

export default function ResidentWalletCard() {
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = "123";

  const paymentMethods = [
    { name: "Pay with Card", icon: CreditCardIcon },
    { name: "Pay with Bank", icon: BuildingLibraryIcon },
    { name: "Pay with USSD", icon: DevicePhoneMobileIcon },
    { name: "Pay with OPay", icon: ArrowUpRightIcon },
  ];

  const accountNumber = "1234567890";
  const bankName = "Ochiga Microfinance Bank";

  const fetchWallet = async () => {
    try {
      setLoading(true);
      const res = await apiRequest(`/wallet/${userId}`, "GET");
      setWalletBalance(res.balance);
    } catch (err) {
      console.error("Error loading wallet:", err);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchWallet();
  }, []);

  const handleFund = async (amount: number) => {
    try {
      await apiRequest(`/wallet/${userId}/fund`, "POST", { amount });
      await fetchWallet();
      setShowModal(false);
    } catch (err) {
      console.error("Error funding wallet:", err);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Wallet Balance Card */}
      <div
        className="rounded-xl p-5 shadow-md flex flex-row justify-between items-center 
                   bg-white dark:bg-gradient-to-r dark:from-[#2c0000] dark:via-[#4a0000] dark:to-[#800000] 
                   border border-gray-200 dark:border-none transition-colors"
      >
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <div>
            <p className="text-[10px] uppercase opacity-80 tracking-wide text-gray-500 dark:text-gray-200">
              Wallet Balance
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              {loading
                ? "Loading..."
                : showBalance
                ? `₦${animatedBalance.toLocaleString()}`
                : "••••••"}
            </h2>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="bg-gray-100 dark:bg-white/20 p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-white/30 
                       transition flex items-center justify-center"
          >
            {showBalance ? (
              <EyeIcon className="h-4 w-4 text-gray-700 dark:text-white" />
            ) : (
              <EyeSlashIcon className="h-4 w-4 text-gray-700 dark:text-white" />
            )}
          </button>
        </div>

        {/* Right Section */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#800000] text-white px-3 py-1.5 rounded-md font-medium text-xs 
                     flex items-center gap-1 whitespace-nowrap shadow-sm hover:bg-[#a00000] transition"
        >
          <BanknotesIcon className="h-4 w-4" />
          Fund
        </button>
      </div>

      {/* Bottom Sheet Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
          <div
            className="backdrop-blur-md bg-white/95 dark:bg-gray-900/95 
                       w-full max-w-md rounded-t-2xl p-5 shadow-xl animate-slideUp"
          >
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
            <div className="p-3 mb-4 rounded-lg border border-[#800000] bg-red-50 dark:bg-[#4a0000]/40">
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
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#800000] text-white 
                             text-xs font-medium shadow hover:bg-[#a00000]"
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

            {/* Quick Fund Buttons */}
            <div className="flex gap-2 mb-4">
              {[1000, 5000, 10000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleFund(amt)}
                  className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                             text-sm font-medium text-gray-700 dark:text-gray-200 
                             hover:bg-red-50 dark:hover:bg-[#4a0000]/40 transition"
                >
                  ₦{amt.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="grid gap-2">
              {paymentMethods.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <button
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-lg border border-gray-200 dark:border-gray-700 
                               hover:bg-red-50 dark:hover:bg-[#4a0000]/40 transition shadow-sm"
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
