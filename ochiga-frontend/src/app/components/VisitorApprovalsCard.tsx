"use client";

export default function VisitorApprovalsCard() {
  const visitors = [
    { name: "Mark Benson", purpose: "Delivery", status: "Pending" },
    { name: "Lucy Adams", purpose: "Guest", status: "Pending" },
  ];

  return (
    <div className="rounded-2xl p-5 shadow-md bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-white transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4">Visitor Approvals</h2>
      <ul className="space-y-3">
        {visitors.map((visitor, i) => (
          <li
            key={i}
            className="bg-gray-50 dark:bg-black/40 hover:bg-gray-100 dark:hover:bg-white/10 p-3 rounded-lg flex justify-between items-center transition-colors duration-300 cursor-pointer"
          >
            <div>
              <p className="font-semibold">{visitor.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {visitor.purpose}
              </p>
            </div>
            <span className="text-xs font-bold text-yellow-600">
              {visitor.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
