"use client";

import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../../../../lib/GoogleMapLoader";

interface MapPickerProps {
  setLocation: (c: { lat: number; lng: number } | null) => void;
}

export default function MapPicker({ setLocation }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [inputId] = useState("ochiga-address-input-" + Math.random().toString(36).slice(2, 8));

  useEffect(() => {
    if (!mapRef.current) return;

    let isMounted = true;

    // Only load Google Maps once
    loadGoogleMaps(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!)
      .then((googleMaps) => {
        if (!isMounted) return;

        const map = new googleMaps.Map(mapRef.current!, {
          center: { lat: 9.05785, lng: 7.49508 }, // Abuja default
          zoom: 12,
          streetViewControl: false,
          mapTypeControl: false,
        });

        const marker = new googleMaps.Marker({
          map,
          draggable: true,
          position: map.getCenter(),
        });
        markerRef.current = marker;

        // Drag event
        marker.addListener("dragend", () => {
          const pos = marker.getPosition();
          if (pos) setLocation({ lat: pos.lat(), lng: pos.lng() });
        });

        // Autocomplete
        const inputEl = document.getElementById(inputId) as HTMLInputElement | null;
        if (inputEl && googleMaps.places) {
          const ac = new googleMaps.places.Autocomplete(inputEl, { types: ["address"] });
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

        setLoaded(true);
      })
      .catch((err) => console.error("Google Maps failed to load", err));

    return () => {
      isMounted = false;
    };
  }, [setLocation, inputId]);

  return (
    <div className="w-full h-full flex flex-col">
      <input
        id={inputId}
        placeholder="Search address..."
        className="p-2 bg-gray-800 border border-gray-700 text-white outline-none"
      />
      <div
        ref={mapRef}
        className={`flex-1 w-full h-full transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
