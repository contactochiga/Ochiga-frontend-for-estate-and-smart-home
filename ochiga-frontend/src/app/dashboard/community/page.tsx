"use client";

export default function CommunityPage() {
  const posts = [
    { id: 1, title: "Pool Maintenance Tomorrow", date: "Aug 25" },
    { id: 2, title: "Monthly General Meeting", date: "Aug 28" },
  ];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Community</h1>
      <ul className="space-y-3">
        {posts.map((p) => (
          <li key={p.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-xs text-gray-500">Posted: {p.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
