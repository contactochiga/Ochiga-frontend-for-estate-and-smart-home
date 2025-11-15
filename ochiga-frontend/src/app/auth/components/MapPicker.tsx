"use client";

import { useEffect, useRef } from "react";

interface MapPickerProps {
  setLocation: (coords: { lat: number; lng: number } | null) => void;
}

export default function MapPicker({ setLocation }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!mapRef.current || !(window as any).google?.maps) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 9.05785, lng: 7.49508 }, // Abuja default
      zoom: 12,
      streetViewControl: false,
      mapTypeControl: false,
    });

    const marker = new google.maps.Marker({
      map,
      draggable: true,
      position: map.getCenter(),
    });

    marker.addListener("dragend", () => {
      const pos = marker.getPosition();
      if (pos) setLocation({ lat: pos.lat(), lng: pos.lng() });
    });

    markerRef.current = marker;

    // Autocomplete
    if (inputRef.current) {
      const ac = new google.maps.places.Autocomplete(inputRef.current, { types: ["address"] });
      ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        if (!place.geometry) return;
        const loc = place.geometry.location!;
        map.panTo(loc);
        map.setZoom(15);
        marker.setPosition(loc);
        setLocation({ lat: loc.lat(), lng: loc.lng() });
      });
    }
  }, [setLocation]);

  return (
    <div className="flex flex-col w-full h-full">
      <input
        ref={inputRef}
        placeholder="Search address..."
        className="p-2 bg-gray-800 border border-gray-700 text-white outline-none"
      />
      <div ref={mapRef} className="flex-1 w-full h-full rounded overflow-hidden" />
    </div>
  );
}
