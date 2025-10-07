"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

interface Message {
  id: string;
  senderName: string;
  content: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const token = localStorage.getItem("token");
        const data = await apiRequest("/messages", "GET", null, token || undefined);
        setMessages(data);
      } catch (err) {
        console.error("Failed to load messages:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading messages...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        messages.map((m) => (
          <div
            key={m.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">{m.senderName}</h2>
            <p className="text-gray-600 dark:text-gray-300">{m.content}</p>
            <p className="text-xs text-gray-400 mt-1">{new Date(m.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
