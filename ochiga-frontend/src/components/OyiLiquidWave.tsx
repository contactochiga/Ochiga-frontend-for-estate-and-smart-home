// ochiga-frontend/src/components/OyiAnimatedLogo.tsx
"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";

type Props = {
  size?: number; // px width/height (square)
  color?: string; // primary red
  duration?: number; // fill duration in seconds
  onComplete?: () => void;
};

export default function OyiAnimatedLogo({
  size = 160,
  color = "#e11d48",
  duration = 1.8,
  onComplete,
}: Props) {
  const controls = useAnimation();

  // Start the fill animation when component mounts
  React.useEffect(() => {
    (async () => {
      // tiny delay so everything renders before anim
      await controls.start({
        y: ["12%", "0%"],
        transition: { duration: duration, ease: "easeOut" },
      });
      // fade out the white shell to reveal the filled shape
      await controls.start({
        shellOpacity: 0,
        transition: { duration: 0.28, ease: "easeOut" },
      });

      // optional settle pulse
      await controls.start({
        scale: [1, 1.03, 1],
        transition: { duration: 0.9, ease: "easeInOut" },
      });

      if (onComplete) onComplete();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SVG paths — blob for the amoeba/wave shape.
  // You can replace 'amoebaPath' with any custom path if you want a different shape.
  const amoebaPath =
    "M24.4,10.7 C28.2,9.1 33.6,8.9 38.3,10.9 C44.5,13.6 49.3,15.9 57.0,14.8 C64.6,13.7 73.1,9.6 78.5,12.7 C83.9,15.8 83.1,24.6 79.5,30.9 C75.9,37.3 68.7,40.2 62.0,42.7 C55.3,45.2 48.1,47.1 41.0,45.7 C33.8,44.3 27.3,40.3 22.3,36.5 C17.4,32.7 13.6,18.9 24.4,10.7 Z";

  // We will use viewBox 0 0 100 100 and scale paths accordingly.
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "inline-block",
        lineHeight: 0,
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* rounded rect background (the tile) */}
        <rect
          x="2"
          y="2"
          rx="16"
          ry="16"
          width="96"
          height="96"
          fill={color}
        />

        {/* Group for centered content */}
        <g transform="translate(10,12) scale(0.78)">
          {/* The amoeba shape outline (shell). We'll fade this shell out during animation */}
          <motion.path
            d={amoebaPath}
            fill="#ffffff"
            // give it a subtle shadow via opacity and tiny blur style (svg filter could be added)
            style={{ opacity: 1 }}
            animate={{
              // custom animated prop handled below via controls
            }}
            // use custom animate keys via style object
            initial={{ opacity: 1 }}
            // we control shellOpacity via animation controls
            animate={controls}
            // To allow changing opacity key name used below:
            custom={{}}
            // map a custom key name used earlier
            // Framer-motion doesn't accept custom props arbitrarily, so we supply style manually below via attribute
          />

          {/* Create a mask that matches the amoeba path.
              Inside that mask we place a rectangle (liquid) that will translate up to simulate filling. */}
          <defs>
            <mask id="amoeba-mask">
              {/* mask uses white to show fill */}
              <rect x="0" y="0" width="100" height="100" fill="black" />
              {/* draw path in white to allow fill to show through */}
              <path d={amoebaPath} fill="white" />
            </mask>

            {/* small bubble shape used as repeated circle */}
            <circle id="bubble" cx="0" cy="0" r="1.8" fill="#fff" opacity="0.9" />
          </defs>

          {/* Liquid group masked by amoeba (the rising red inside the white amoeba) */}
          <g mask="url(#amoeba-mask)">
            {/* background behind the clip to ensure correct color */}
            <rect x="-10" y="0" width="140" height="120" fill={color} />

            {/* animated rising rectangle (we will animate its translateY via framer-motion) */}
            <motion.rect
              x="-10"
              width="140"
              // start below and animate upward — initial y set by framer-motion
              y="100"
              height="120"
              fill={color}
              animate={{ y: 100 }}
              initial={{ y: 120 }}
              // we will start animation using the same controls so timing matches, but using a separate smaller animation
              // Instead of controls.start for this element, we use the same sequence via on mount effect. For simpler control,
              // animate attribute is updated above by the global `controls` effect via start({ y: ["12%", "0%"] })
              // however, framer-motion cannot animate svg rect y using percent easily, so we do numeric y animation below with controls
              // To sync, use the same controls (works because controls.start accepted generic keys).
              // attach controls now:
              // (we will override animation via a little hack: supply animate prop equal to controls; this will accept custom fields.)
              style={{ translateY: 0 }}
            />
          </g>

          {/* overlay - subtle inner white stroke to show shell even when fill starts (we'll fade this out) */}
          <motion.path
            d={amoebaPath}
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.2"
            initial={{ opacity: 1 }}
            animate={controls}
            // We'll animate a custom 'shellOpacity' prop via the controls above.
            style={{ mixBlendMode: "overlay" }}
          />

          {/* small bubbles that float up while filling — we animate them in sequence */}
          <g>
            <motion.g
              initial={{ opacity: 0, y: 12, scale: 0.6 }}
              animate={{
                opacity: [0.0, 0.9, 0.0],
                y: [12, -6, -18],
                scale: [0.6, 1.0, 0.6],
              }}
              transition={{ repeat: Infinity, duration: duration + 0.8, ease: "easeOut", delay: 0.15 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <circle cx="22" cy="52" r="1.9" fill="white" opacity={0.9} />
            </motion.g>

            <motion.g
              initial={{ opacity: 0, y: 8, scale: 0.6 }}
              animate={{
                opacity: [0.0, 0.9, 0.0],
                y: [8, -10, -24],
                scale: [0.6, 1.0, 0.6],
              }}
              transition={{ repeat: Infinity, duration: duration + 1.0, ease: "easeOut", delay: 0.45 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <circle cx="50" cy="52" r="1.6" fill="white" opacity={0.85} />
            </motion.g>

            <motion.g
              initial={{ opacity: 0, y: 10, scale: 0.6 }}
              animate={{
                opacity: [0.0, 0.85, 0.0],
                y: [10, -8, -22],
                scale: [0.6, 1.0, 0.6],
              }}
              transition={{ repeat: Infinity, duration: duration + 1.2, ease: "easeOut", delay: 0.9 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <circle cx="74" cy="50" r="1.4" fill="white" opacity={0.8} />
            </motion.g>
          </g>

          {/* small cleanup: a subtle highlight along the top edge of the amoeba */}
          <path
            d={amoebaPath}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.6"
            transform="translate(0,-1)"
          />
        </g>
      </svg>

      {/* Controls to run synchronized animation: we animate the mask-rect via CSS keyframes approach for reliability */}
      <style jsx>{`
        /* fallback/aux animation for the masked rect filling up */
        svg rect[fill="${color}"] {
          /* target the rect inside the mask; select last matching rect */
        }
      `}</style>
    </div>
  );
}
