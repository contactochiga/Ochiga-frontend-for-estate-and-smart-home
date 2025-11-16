// OyiLoader.tsx
import React from "react";

/**
 * OyiLoader
 * Simple, self-contained React component for a 3s loading animation.
 *
 * Usage:
 *  <OyiLoader size={220} />   // size in px (square)
 *
 * This component:
 *  - fades the rounded red background in
 *  - animates a gradient "liquid" rising inside the wave shape
 *  - after liquid is full, the "Oyi" text slides up and fades in
 *
 * Note: This is a stylized vector recreation designed for animation.
 */

export default function OyiLoader({ size = 220 }: { size?: number }) {
  const s = size;
  const viewBox = "0 0 200 200";

  return (
    <div
      style={{
        width: s,
        height: s,
        display: "inline-block",
        // center contents
        position: "relative",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox={viewBox}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block" }}
      >
        <defs>
          {/* gradient for the filling fluid */}
          <linearGradient id="liquidGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7bdff5" />
            <stop offset="100%" stopColor="#1eaedb" />
          </linearGradient>

          {/* wave path used as a clipPath so the blue rect only shows inside the wave shape */}
          <clipPath id="waveClip">
            {/* Wave path - tuned to sit in top half */}
            <path
              d="M18,80 C45,50 80,55 110,68 C140,80 165,72 182,58 C178,76 160,95 125,98 C95,100 70,105 45,98 C30,92 20,86 18,80 Z"
              transform="translate(0,-6)"
            />
          </clipPath>

          {/* path itself used for the white wave shape stroke/fill */}
          <path
            id="waveShape"
            d="M18,80 C45,50 80,55 110,68 C140,80 165,72 182,58 C178,76 160,95 125,98 C95,100 70,105 45,98 C30,92 20,86 18,80 Z"
            transform="translate(0,-6)"
          />
        </defs>

        {/* Rounded background. It will fade in (see CSS below). */}
        <rect
          x="10"
          y="10"
          rx="28"
          ry="28"
          width="180"
          height="180"
          className="bgRect"
        />

        {/* Place the white wave outline on top */}
        <g transform="translate(0,0)">
          {/* the white shape (stroke/soft fill) */}
          <use href="#waveShape" fill="#ffffff" className="waveBase" />
        </g>

        {/* Liquid: a rect animated upwards that is clipped to the wave shape */}
        <g clipPath="url(#waveClip)">
          {/* The liquid rect is positioned below the wave and will translate up */}
          <rect
            className="liquidRect"
            x="0"
            y="120"
            width="200"
            height="120"
            fill="url(#liquidGrad)"
          />
        </g>

        {/* "Oyi" text - initially translated down & transparent, then slides up & fades */}
        <g className="oyiGroup" transform="translate(0,0)">
          <text
            x="50%"
            y="146"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="Inter, Roboto, Helvetica, Arial, sans-serif"
            fontWeight="700"
            fontSize="44"
            fill="#ffffff"
            className="oyiText"
          >
            Oyi
          </text>
        </g>
      </svg>

      {/* Inline CSS for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* timing: total ~3s */
        .bgRect {
          fill: #ffffff;            /* start white (invisible on white page) then fades to red */
          transition: fill 0.6s linear;
          animation: bgFade 0.6s forwards 0.0s;
        }

        /* After the bg fade we set to final red so the rounded tile stays red */
        @keyframes bgFade {
          0% { fill: #ffffff; }
          100% { fill: #e4232d; } /* final background red */
        }

        /* subtle soft white wave (base) opacity anim so it feels polished */
        .waveBase {
          opacity: 0;
          transform-origin: 50% 20%;
          animation: waveAppear 0.5s ease-in 0.7s forwards;
        }
        @keyframes waveAppear {
          from { opacity: 0; transform: translateY(4px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0px) scale(1); }
        }

        /* Liquid rectangle: animate translateY up so it looks like filling */
        .liquidRect {
          transform: translateY(0px);
          transform-origin: 50% 50%;
          animation: liquidRise 1.8s cubic-bezier(.2,.9,.2,1) 0.2s forwards;
        }
        @keyframes liquidRise {
          0%   { transform: translateY(40px); opacity: 1; }
          60%  { transform: translateY(8px); }   /* fast rise */
          90%  { transform: translateY(0px); }   /* settle */
          100% { transform: translateY(0px); } 
        }

        /* Text group animation: starts after the liquid mostly filled */
        .oyiGroup {
          transform: translateY(8px);
          opacity: 0;
          animation: oyiSlide 0.6s ease-out 2.0s forwards;
        }
        @keyframes oyiSlide {
          0% { transform: translateY(12px); opacity: 0;}
          100% { transform: translateY(0px); opacity: 1; }
        }

        /* ensure text crispness */
        .oyiText {
          filter: drop-shadow(0 0 0 rgba(0,0,0,0));
          letter-spacing: -0.5px;
        }

        /* small responsive tweak if container is tiny */
        @media (max-width: 120px) {
          .oyiText { font-size: 28px; }
        }
      ` }} />
    </div>
  );
}
