"use client";

import { useEffect, useState } from "react";
import { LoadScript, GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";

interface MapPickerProps {
  setLocation: (c: { lat: number; lng: number } | null) => void;
}

export default function MapPicker({ setLocation }: MapPickerProps) {
  const [mapCenter, setMapCenter] = useState({ lat: 9.05785, lng: 7.49508 }); // Abuja default
  const [markerPos, setMarkerPos] = useState(mapCenter);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const libraries: ("places")[] = ["places"];

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;
      const loc = place.geometry.location;
      const coords = { lat: loc.lat(), lng: loc.lng() };
      setMapCenter(coords);
      setMarkerPos(coords);
      setLocation(coords);
    }
  };

  const onLoadAutocomplete = (ac: google.maps.places.Autocomplete) => {
    setAutocomplete(ac);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}
      libraries={libraries}
    >
      <div className="flex flex-col w-full h-full">
        <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={handlePlaceChanged}>
          <input
            type="text"
            placeholder="Search address..."
            className="p-2 bg-gray-800 border border-gray-700 text-white outline-none"
          />
        </Autocomplete>

        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={mapCenter}
          zoom={12}
          options={{ streetViewControl: false, mapTypeControl: false }}
        >
          <Marker
            position={markerPos}
            draggable
            onDragEnd={(e) => {
              const coords = { lat: e.latLng!.lat(), lng: e.latLng!.lng() };
              setMarkerPos(coords);
              setLocation(coords);
            }}
          />
        </GoogleMap>
      </div>
    </LoadScript>
  );
}
