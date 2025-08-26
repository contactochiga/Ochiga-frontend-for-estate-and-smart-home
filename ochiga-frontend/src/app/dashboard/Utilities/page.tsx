"use client";

export default function UtilitiesPage() {
  const bills = [
    { id: 1, type: "Electricity", amount: "₦10,000", due: "Aug 30" },
    { id: 2, type: "Water", amount: "₦3,500", due: "Sep 5" },
  ];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Utilities & Services</h1>
      <ul className="space-y-3">
        {bills.map((b) => (
          <li key={b.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
            <div className="flex justify-between">
              <span>{b.type}</span>
              <span className="font-bold">{b.amount}</span>
            </div>
            <p className="text-xs text-gray-500">Due: {b.due}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
