"use client";

export default function WalletPage() {
  const transactions = [
    { id: 1, type: "Credit", amount: "+₦20,000", date: "Aug 25, 2025" },
    { id: 2, type: "Debit", amount: "-₦5,000", date: "Aug 22, 2025" },
    { id: 3, type: "Debit", amount: "-₦2,500", date: "Aug 20, 2025" },
  ];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Wallet</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <p className="text-gray-600 dark:text-gray-300">Current Balance</p>
        <h2 className="text-3xl font-bold mt-2">₦50,000</h2>
      </div>

      <h2 className="mt-6 text-xl font-semibold">Recent Transactions</h2>
      <ul className="mt-3 space-y-2">
        {transactions.map((tx) => (
          <li key={tx.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
            <div className="flex justify-between">
              <span>{tx.type}</span>
              <span className={tx.amount.startsWith("+") ? "text-green-600" : "text-red-600"}>
                {tx.amount}
              </span>
            </div>
            <p className="text-xs text-gray-500">{tx.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
