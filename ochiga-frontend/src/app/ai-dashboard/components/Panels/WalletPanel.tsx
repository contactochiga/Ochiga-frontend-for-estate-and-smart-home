"use client";

export default function WalletPanel() {
  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn">
      <p className="mb-2 text-purple-400 font-semibold">💳 Wallet</p>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span>Balance:</span>
          <span className="font-semibold text-green-400">₦ 0.00</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-full text-white">Add Funds</button>
          <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full">Transactions</button>
        </div>
      </div>
    </div>
  );
}
