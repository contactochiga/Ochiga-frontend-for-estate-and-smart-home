"use client";

import { useState } from "react";
import {
  MdLightbulbOutline,
  MdTv,
  MdDoorFront,
  MdAcUnit,
  MdVideocam,
} from "react-icons/md";

const devices = [
  { id: "lights", name: "Lights", icon: MdLightbulbOutline },
  { id: "tv", name: "TV", icon: MdTv },
  { id: "door", name: "Door", icon: MdDoorFront },
  { id: "ac", name: "AC", icon: MdAcUnit },
  { id: "camera", name: "Camera", icon: MdVideocam },
];

export default function DeviceCards() {
  const [states, setStates] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {devices.map(({ id, name, icon: Icon }) => (
        <div
          key={id}
          onClick={() => toggle(id)}
          className={`
            flex flex-col items-center justify-center rounded-xl p-6 cursor-pointer transition
            ${states[id]
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"}
          `}
        >
          <Icon className="text-3xl mb-2" />
          <span className="text-sm font-medium">{name}</span>
        </div>
      ))}
    </div>
  );
}
