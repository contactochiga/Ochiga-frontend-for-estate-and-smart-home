"use client";

import { useEffect, useRef } from "react";

interface MapPickerProps {
  setLocation: (coords: { lat: number; lng: number }) => void;
}

export default function MapPicker({ setLocation }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.google) return;

    const map = new google.maps.Map(mapRef.current!, {
      center: { lat: 9.0765, lng: 7.3986 }, // Abuja default
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
    });

    const marker = new google.maps.Marker({
      position: map.getCenter(),
      map,
      draggable: true,
    });

    marker.addListener("dragend", () => {
      const pos = marker.getPosition();
      if (pos) {
        setLocation({ lat: pos.lat(), lng: pos.lng() });
      }
    });

    map.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        marker.setPosition(e.latLng);
        setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      }
    });
  }, [setLocation]);

  return <div ref={mapRef} className="w-full h-full" />;
}
