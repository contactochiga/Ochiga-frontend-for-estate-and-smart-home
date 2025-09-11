"use client";

import { useState } from "react";
import {
  MdLightbulbOutline,
  MdTv,
  MdDoorFront,
  MdAcUnit,
  MdVideocam,
} from "react-icons/md";

const rooms = ["All", "Favourites", "Living Room", "Kitchen", "Bedroom", "Office"];

const devices = [
  { name: "Light", location: "Living Room", status: "On", icon: <MdLightbulbOutline className="text-yellow-400 text-2xl" />, favourite: true, type: "light" },
  { name: "CCTV", location: "Outdoor", status: "Off", icon: <MdVideocam className="text-red-500 text-2xl" />, favourite: true, type: "cctv" },
  { name: "TV", location: "Living Room", status: "Off", icon: <MdTv className="text-blue-400 text-2xl" />, favourite: false, type: "tv" },
  { name: "Door Lock", location: "Main Door", status: "Locked", icon: <MdDoorFront className="text-blue-500 text-2xl" />, favourite: false, type: "door" },
  { name: "AC", location: "Bedroom", status: "On", icon: <MdAcUnit className="text-cyan-400 text-2xl" />, favourite: true, type: "ac" },
];

export default function RoomsDevices() {
  const [activeRoom, setActiveRoom] = useState("All");
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [deviceStates, setDeviceStates] = useState<any>({});

  // ... keep the rest of your component code exactly as you shared ...
}
