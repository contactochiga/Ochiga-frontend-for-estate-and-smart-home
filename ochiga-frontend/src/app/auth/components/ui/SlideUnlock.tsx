"use client";
import { useState, useRef } from "react";

interface SlideProps {
  onUnlock: () => void;
}

export default function SlideUnlock({ onUnlock }: SlideProps) {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => {
    setDragging(false);
    const trackWidth = trackRef.current?.offsetWidth || 200;
    if (position > trackWidth * 0.85) onUnlock();
    setPosition(0);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const trackWidth = trackRef.current?.offsetWidth || 200;
    const newPos = Math.min(Math.max(0, e.clientX - (trackRef.current?.getBoundingClientRect().left || 0)), trackWidth);
    setPosition(newPos);
  };

  return (
    <div
      ref={trackRef}
      className="w-full max-w-md h-14 bg-gray-800 rounded-full relative cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="absolute top-0 left-0 h-14 w-14 bg-emerald-400 rounded-full flex items-center justify-center text-black font-bold"
        style={{ transform: `translateX(${position}px)` }}
        onMouseDown={handleMouseDown}
      >
        ➤
      </div>
      <p className="absolute inset-0 flex items-center justify-center text-gray-300 select-none pointer-events-none">
        Slide to Enter
      </p>
    </div>
  );
}
