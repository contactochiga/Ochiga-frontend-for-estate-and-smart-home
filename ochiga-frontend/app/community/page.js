"use client"
import { communityAnnouncements, communityEvents } from "@/data/mockData"

export default function CommunityPage() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Community</h2>

      {/* Announcements */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold text-lg mb-2">Recent Announcements</h3>
        {communityAnnouncements.map((a) => (
          <div key={a.id} className="border-l-4 border-blue-500 pl-3 mb-3">
            <h4 className="font-medium">{a.title}</h4>
            <p className="text-sm text-gray-600">{a.content}</p>
            <p className="text-xs text-gray-400">{a.date}</p>
          </div>
        ))}
      </div>

      {/* Events */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold text-lg mb-2">Upcoming Events</h3>
        {communityEvents.map((e) => (
          <div key={e.id} className="mb-3">
            <h4 className="font-medium">{e.title}</h4>
            <p className="text-sm text-gray-600">{e.description}</p>
            <p className="text-xs text-gray-400">{e.date} at {e.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
