"use client";

export default function DevicesPage() {
  const devices = [
    { id: 1, name: "Living Room Light", status: "On" },
    { id: 2, name: "Front Door Lock", status: "Locked" },
    { id: 3, name: "CCTV Camera", status: "Active" },
  ];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Smart Devices</h1>
      <ul className="space-y-3">
        {devices.map((d) => (
          <li
            key={d.id}
            className="p-3 flex justify-between bg-gray-100 dark:bg-gray-700 rounded-md"
          >
            <span>{d.name}</span>
            <span className="font-semibold">{d.status}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
