"use client";

import { useState } from "react";

interface MapPickerProps {
  onLocationSelect?: (location: { address: string; lat: number; lng: number }) => void;
}

export default function MapPicker({ onLocationSelect }: MapPickerProps) {
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number | string>("");
  const [lng, setLng] = useState<number | string>("");

  const handleSave = () => {
    const location = {
      address,
      lat: Number(lat),
      lng: Number(lng),
    };

    if (onLocationSelect) {
      onLocationSelect(location);
    }

    console.log("Saved location:", location);
  };

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* ADDRESS INPUT */}
      <div className="flex flex-col">
        <label className="text-sm font-medium">Address</label>
        <input
          type="text"
          placeholder="Enter address manually"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
      </div>

      {/* LATITUDE */}
      <div className="flex flex-col">
        <label className="text-sm font-medium">Latitude</label>
        <input
          type="number"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
      </div>

      {/* LONGITUDE */}
      <div className="flex flex-col">
        <label className="text-sm font-medium">Longitude</label>
        <input
          type="number"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
      </div>

      {/* STATIC MAP BOX (NO GOOGLE MAP, JUST DESIGN) */}
      <div className="w-full h-56 bg-gray-200 rounded-md flex items-center justify-center">
        <p className="text-gray-500">
          Map preview (disabled for now)
        </p>
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        className="bg-black text-white py-2 rounded-md mt-2"
      >
        Save Location
      </button>

    </div>
  );
}
