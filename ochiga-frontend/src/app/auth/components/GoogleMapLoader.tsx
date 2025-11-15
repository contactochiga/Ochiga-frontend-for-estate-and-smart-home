"use client";

import { useEffect, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

export default function GoogleMapLoader({ children }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if ((window as any).google) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Do NOT remove script, keep it globally
    };
  }, []);

  if (!loaded) {
    return <div className="flex items-center justify-center h-56">Loading map...</div>;
  }

  return <>{children}</>;
}
