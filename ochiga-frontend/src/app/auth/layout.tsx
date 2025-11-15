"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

/**
 * AuthLayoutWrapper
 * - Fixed full-screen layout
 * - Dark background consistent with Ochiga brand
 * - Handles scrolling and prevents zoom issues
 * - Loads Google Maps script once for all children
 */
export default function AuthLayoutWrapper({ children }: LayoutProps) {
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Optional: track scroll for dynamic components (e.g., fade in/out)
  const handleScroll = () => {
    if (!layoutRef.current) return;
    setScrollY(layoutRef.current.scrollTop);
  };

  // Load Google Maps script once
  useEffect(() => {
    if (!(window as any).google?.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onerror = () => console.error("Failed to load Google Maps script");
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const container = layoutRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={layoutRef}
      className="relative h-screen w-screen overflow-y-auto overflow-x-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white scroll-smooth"
    >
      {/* Optional fixed header can go here */}
      {children}

      {/* Optional floating elements based on scrollY */}
      {/* Example: show helper button when scrolled down */}
      {/* {scrollY > 100 && <YourHelperButton />} */}
    </div>
  );
}
