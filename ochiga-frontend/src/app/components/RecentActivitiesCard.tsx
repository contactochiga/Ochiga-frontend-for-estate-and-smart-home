// src/app/manager-dashboard/components/RecentActivitiesCard.tsx
"use client";

export default function RecentActivitiesCard() {
  const activities = [
    { message: "John Doe checked in a visitor", time: "2 mins ago" },
    { message: "Security alert resolved", time: "15 mins ago" },
    { message: "Maintenance request approved", time: "1 hr ago" },
    { message: "Jane Smith added as a resident", time: "3 hrs ago" },
  ];

  return (
    <div className="rounded-2xl p-5 shadow-md bg-white dark:bg-gradient-to-br dark:from-[#4A0E0E] dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
      <ul className="space-y-3">
        {activities.map((item, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-gray-50 dark:bg-black/40 p-3 rounded-lg"
          >
            <span className="text-sm">{item.message}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
