"use client"
import { useState } from "react"

export default function CommunityPage() {
  const [announcements] = useState([
    { id: 1, title: "Water Supply Maintenance", content: "There will be maintenance on Saturday.", date: "Aug 20, 2025" },
    { id: 2, title: "Security Update", content: "New security cameras installed.", date: "Aug 18, 2025" },
  ])

  const [events] = useState([
    { id: 1, title: "Monthly Meeting", description: "Residents association meeting", date: "Aug 25", time: "6:00 PM" },
    { id: 2, title: "Clean Up Day", description: "Estate environmental sanitation", date: "Aug 30", time: "8:00 AM" },
  ])

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Community</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent Announcements</h3>
          </div>
          <div className="p-6 space-y-4">
            {announcements.map((a) => (
              <div key={a.id} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900">{a.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{a.content}</p>
                <p className="text-xs text-gray-500 mt-2">{a.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
          </div>
          <div className="p-6 space-y-4">
            {events.map((e) => (
              <div key={e.id} className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <span className="text-green-600 text-xl">📅</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{e.title}</h4>
                  <p className="text-sm text-gray-600">{e.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{e.date} at {e.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
