"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, MessageSquare, Menu } from "lucide-react";
import { apiRequest } from "@/lib/api";

interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}

export default function TopBar() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNotif, setShowNotif] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    async function loadData() {
      try {
        const token = localStorage.getItem("token");

        const [notifData, msgData] = await Promise.all([
          apiRequest("/notifications", "GET", null, token || undefined),
          apiRequest("/messages", "GET", null, token || undefined),
        ]);

        setNotifications(Array.isArray(notifData) ? notifData.slice(0, 5) : []);
        setMessages(Array.isArray(msgData) ? msgData.slice(0, 5) : []);
      } catch (err) {
        console.error("Error loading topbar data:", err);
      }
    }

    loadData();
  }, []);

  return (
    <div className="w-full flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button className="md:hidden">
          <Menu className="text-gray-800 dark:text-gray-200 w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Ochiga Dashboard</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 relative">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotif(!showNotif);
              setShowMsg(false);
            }}
            className="relative"
          >
            <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full px-1.5">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
              <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  Notifications
                </span>
                <Link
                  href="/notifications"
                  className="text-blue-500 text-sm hover:underline"
                  onClick={() => setShowNotif(false)}
                >
                  View all
                </Link>
              </div>

              {notifications.length === 0 ? (
                <p className="p-4 text-gray-500 text-sm">No new notifications</p>
              ) : (
                <ul className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        !n.isRead ? "bg-gray-50 dark:bg-gray-800" : ""
                      }`}
                    >
                      <p className="text-gray-800 dark:text-gray-200 text-sm">
                        {n.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(n.createdAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="relative">
          <button
            onClick={() => {
              setShowMsg(!showMsg);
              setShowNotif(false);
            }}
            className="relative"
          >
            <MessageSquare className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            {messages.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-semibold rounded-full px-1.5">
                {messages.length}
              </span>
            )}
          </button>

          {showMsg && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
              <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  Messages
                </span>
                <Link
                  href="/messages"
                  className="text-blue-500 text-sm hover:underline"
                  onClick={() => setShowMsg(false)}
                >
                  View all
                </Link>
              </div>

              {messages.length === 0 ? (
                <p className="p-4 text-gray-500 text-sm">No recent messages</p>
              ) : (
                <ul className="max-h-80 overflow-y-auto">
                  {messages.map((m) => (
                    <li
                      key={m.id}
                      className="p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <p className="text-gray-800 dark:text-gray-200 text-sm">
                        {m.content}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(m.createdAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="ml-2">
          <img
            src="/assets/avatar.png"
            alt="User"
            className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
}
