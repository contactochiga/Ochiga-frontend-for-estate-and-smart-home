"use client";

import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "@/lib/GoogleMapLoader";

interface MapPickerProps {
  setLocation: (coords: { lat: number; lng: number } | null) => void;
}

export default function MapPicker({ setLocation }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initMap() {
      await loadGoogleMaps(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "");

      if (!mapRef.current || !window.google?.maps) return;

      const defaultCenter = { lat: 6.4402, lng: 3.4179 };

      const map = new google.maps.Map(mapRef.current, {
        zoom: 15,
        center: defaultCenter,
      });

      const marker = new google.maps.Marker({
        position: defaultCenter,
        map,
        draggable: true,
      });

      marker.addListener("dragend", () => {
        const pos = marker.getPosition();
        if (pos) {
          setLocation({ lat: pos.lat(), lng: pos.lng() });
        }
      });
    }

    initMap();
  }, []);

  return <div ref={mapRef} className="h-[300px] w-full rounded-lg" />;
}
