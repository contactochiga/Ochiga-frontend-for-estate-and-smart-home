"use client";

import { useEffect, useRef } from "react";

interface MapPickerProps {
  setLocation: (c: { lat: number; lng: number } | null) => void;
}

export default function MapPicker({ setLocation }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const inputId = "ochiga-address-input-" + Math.random().toString(36).slice(2, 8);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!(window as any).google) {
      console.warn("Google maps not loaded");
      return;
    }

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
    markerRef.current = marker;

    marker.addListener("dragend", () => {
      const pos = marker.getPosition();
      if (pos) setLocation({ lat: pos.lat(), lng: pos.lng() });
    });

    // Autocomplete
    const inputEl = document.getElementById(inputId) as HTMLInputElement | null;
    if (inputEl && (window as any).google?.maps?.places) {
      const autocomplete = new google.maps.places.Autocomplete(inputEl, { types: ["address"] });
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
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
    <div className="w-full h-full flex flex-col">
      <input
        id={inputId}
        placeholder="Search address..."
        className="p-2 bg-gray-800 border border-gray-700 text-white outline-none"
      />
      <div ref={mapRef} className="flex-1 w-full h-full" />
    </div>
  );
}
