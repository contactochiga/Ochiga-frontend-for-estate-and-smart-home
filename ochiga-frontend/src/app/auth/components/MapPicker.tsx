useEffect(() => {
  if (!mapRef.current) return;
  if (!(window as any).google) {
    console.warn("Google maps not loaded");
    return;
  }

  const map = new google.maps.Map(mapRef.current, {
    center: { lat: 9.05785, lng: 7.49508 },
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

  const inputEl = document.getElementById(inputId) as HTMLInputElement | null;
  if (inputEl && (window as any).google?.maps?.places) {
    const ac = new google.maps.places.Autocomplete(inputEl, { types: ["address"] });
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
