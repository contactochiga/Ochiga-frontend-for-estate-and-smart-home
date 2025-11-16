"use client";

import React from "react";

export default function OyiLoader({ size = 220 }: { size?: number }) {
  const s = size;
  const viewBox = "0 0 200 200";

  return (
    <div
      style={{
        width: s,
        height: s,
        display: "inline-block",
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
          <linearGradient id="liquidGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7bdff5" />
            <stop offset="100%" stopColor="#1eaedb" />
          </linearGradient>

          <clipPath id="waveClip">
            <path
              d="M18,80 C45,50 80,55 110,68 C140,80 165,72 182,58 C178,76 160,95 125,98 C95,100 70,105 45,98 C30,92 20,86 18,80 Z"
              transform="translate(0,-6)"
            />
          </clipPath>

          <path
            id="waveShape"
            d="M18,80 C45,50 80,55 110,68 C140,80 165,72 182,58 C178,76 160,95 125,98 C95,100 70,105 45,98 C30,92 20,86 18,80 Z"
            transform="translate(0,-6)"
          />
        </defs>

        <rect
          x="10"
          y="10"
          rx="28"
          ry="28"
          width="180"
          height="180"
          className="bgRect"
        />

        <g transform="translate(0,0)">
          <use href="#waveShape" fill="#ffffff" className="waveBase" />
        </g>

        <g clipPath="url(#waveClip)">
          <rect
            className="liquidRect"
            x="0"
            y="120"
            width="200"
            height="120"
            fill="url(#liquidGrad)"
          />
        </g>

        <g className="oyiGroup" transform="translate(0,0)">
          <text
            x="50%"
            y="146"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            fontSize="44"
            fill="#ffffff"
            className="oyiText"
          >
            Oyi
          </text>
        </g>
      </svg>

      <style dangerouslySetInnerHTML={{ __html: `
        .bgRect {
          fill: #ffffff;
          transition: fill 0.6s linear;
          animation: bgFade 0.6s forwards;
        }
        @keyframes bgFade {
          0% { fill: #ffffff; }
          100% { fill: #e4232d; }
        }

        .waveBase {
          opacity: 0;
          transform-origin: 50% 20%;
          animation: waveAppear 0.5s ease-in 0.7s forwards;
        }
        @keyframes waveAppear {
          from { opacity: 0; transform: translateY(4px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0px) scale(1); }
        }

        .liquidRect {
          transform: translateY(0px);
          animation: liquidRise 1.8s cubic-bezier(.2,.9,.2,1) 0.2s forwards;
        }
        @keyframes liquidRise {
          0%   { transform: translateY(40px); opacity: 1; }
          60%  { transform: translateY(8px); }
          90%  { transform: translateY(0px); }
          100% { transform: translateY(0px); }
        }

        .oyiGroup {
          transform: translateY(12px);
          opacity: 0;
          animation: oyiSlide 0.6s ease-out 2.0s forwards;
        }
        @keyframes oyiSlide {
          0% { transform: translateY(12px); opacity: 0; }
          100% { transform: translateY(0px); opacity: 1; }
        }
      ` }} />
    </div>
  );
}
