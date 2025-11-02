// components/MiniTab.tsx
"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MiniTab({
  id,
  title,
  onClose,
  children,
}: {
  id: string;
  title: string;
  onClose?: () => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 220);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">{title}</div>
        <div className="flex items-center gap-2">
          {onClose && <button onClick={() => { setOpen(false); onClose(); }} className="text-sm text-gray-500">Close</button>}
        </div>
      </div>

      {/* Typewriter reveal for the children (if textual) */}
      <div className="min-h-[48px]">
        {revealed ? <div>{children}</div> : <div className="text-sm text-gray-400">Loading…</div>}
      </div>
    </motion.div>
  );
}
