"use client";

export default function VisitorsPage() {
  const visitors = [
    { id: 1, name: "John Doe", status: "Checked In", time: "10:30 AM" },
    { id: 2, name: "Jane Smith", status: "Expected", time: "2:00 PM" },
  ];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Visitors</h1>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md">+ Add Visitor</button>

      <h2 className="mt-6 text-xl font-semibold">Visitor List</h2>
      <ul className="mt-3 space-y-2">
        {visitors.map((v) => (
          <li key={v.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
            <div className="flex justify-between">
              <span>{v.name}</span>
              <span className="text-sm text-gray-600">{v.status}</span>
            </div>
            <p className="text-xs text-gray-500">Time: {v.time}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
