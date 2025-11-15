"use client";

import { useEffect, useRef } from "react";

interface MapPickerProps {
  setLocation: (coords: { lat: number; lng: number } | null) => void;
}

export default function MapPicker({ setLocation }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  // Wait for Google Maps global object
  const waitForGoogleMaps = () =>
    new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if ((window as any).google?.maps) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });

  useEffect(() => {
    let listener: google.maps.MapsEventListener | null = null;

    const initMap = async () => {
      await waitForGoogleMaps();

      if (!mapRef.current) return;

      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: 6.465422, lng: 3.406448 }, // Lagos default
        zoom: 14,
        disableDefaultUI: true,
      });

      listener = mapInstance.current.addListener("click", (e: any) => {
        setLocation({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      });
    };

    initMap();

    return () => {
      if (listener) listener.remove();
    };
  }, [setLocation]);

  return (
    <div
      ref={mapRef}
      className="w-full h-64 rounded-lg border border-gray-700"
    />
  );
}
