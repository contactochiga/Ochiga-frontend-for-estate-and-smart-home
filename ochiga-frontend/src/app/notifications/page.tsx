"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const token = localStorage.getItem("token");
        const data = await apiRequest("/notifications", "GET", null, token || undefined);
        setNotifications(data);
      } catch (err) {
        console.error("Failed to load notifications:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNotifications();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading notifications...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-lg shadow-sm border ${
              n.isRead ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-700"
            }`}
          >
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">{n.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{n.message}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
