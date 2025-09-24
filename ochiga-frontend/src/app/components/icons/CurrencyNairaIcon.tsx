import React from "react";

export default function CurrencyNairaIcon(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={props.className}
    >
      <text
        x="4"
        y="18"
        fontSize="14"
        fontWeight="bold"
        fill="currentColor"
      >
        ₦
      </text>
    </svg>
  );
}
