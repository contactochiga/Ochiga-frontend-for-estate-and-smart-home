"use client";

import { MdOutlineLightbulb, MdTv, MdDoorFront, MdAcUnit, MdVideocam } from "react-icons/md";

interface DeviceCardProps {
  name: string;
  location: string;
  status: "On" | "Off" | "Locked" | "Unlocked";
  icon?: React.ReactNode;
}

export default function DeviceCard({
  name,
  location,
  status,
  icon = <MdOutlineLightbulb />,
}: DeviceCardProps) {
  const isActive = status === "On" || status === "Unlocked";

  return (
    <div
      className={`
        relative rounded-2xl p-5 
        bg-white/10 dark:bg-[#1f1f1f]/80 
        backdrop-blur-lg shadow-lg 
        transition-all duration-300 
        hover:scale-[1.02] hover:shadow-2xl
        border border-transparent 
        hover:border-blue-500/40
        ${isActive ? "ring-2 ring-blue-500/60" : ""}
      `}
    >
      {/* Icon + Status */}
      <div className="flex justify-between items-center mb-4">
        <div
          className={`
            w-12 h-12 flex items-center justify-center rounded-xl text-2xl
            ${isActive 
              ? "bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/40" 
              : "bg-gray-200 dark:bg-gray-800 text-gray-500"}
          `}
        >
          {icon}
        </div>
        <span
          className={`
            px-3 py-1 rounded-full text-xs font-medium tracking-wide
            ${isActive 
              ? "bg-blue-500/20 text-blue-400 border border-blue-400/40" 
              : "bg-gray-300 dark:bg-gray-700 text-gray-400 border border-gray-500/40"}
          `}
        >
          {status}
        </span>
      </div>

      {/* Name + Location */}
      <div>
        <h3 className="text-base font-semibold text-white/90">{name}</h3>
        <p className="text-xs text-gray-400">{location}</p>
      </div>
    </div>
  );
}
