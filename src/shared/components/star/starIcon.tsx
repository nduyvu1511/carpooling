import React from "react"

interface StarIconProps {
  size?: number
  strokeColor?: string
  storkeWidth?: number
  className?: string
  style?: React.CSSProperties
}

export function StarIcon({
  size = 25,
  strokeColor = "none",
  storkeWidth = 0,
  className = "star-svg",
  style = { display: "inline" },
}: StarIconProps) {
  return (
    <svg
      style={{ ...style }}
      className={`mr-[4px] last:mr-0 ${className}`}
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.8528 0.908649C5.3222 -0.0802256 6.67845 -0.0802274 7.14785 0.908647L7.9591 2.61768C8.14549 3.01036 8.50581 3.28254 8.92261 3.34551L10.7366 3.61956C11.7862 3.77814 12.2053 5.11923 11.4458 5.88896L10.1332 7.21925C9.83159 7.52491 9.69397 7.9653 9.76516 8.3969L10.075 10.2753C10.2543 11.3622 9.1571 12.191 8.2183 11.6779L6.59581 10.791C6.22301 10.5872 5.77764 10.5872 5.40484 10.791L3.78235 11.6779C2.84355 12.191 1.74632 11.3622 1.92562 10.2753L2.23549 8.3969C2.30668 7.9653 2.16906 7.52491 1.86746 7.21925L0.554836 5.88896C-0.204669 5.11923 0.214434 3.77814 1.26404 3.61956L3.07804 3.34551C3.49484 3.28254 3.85516 3.01036 4.04155 2.61768L4.8528 0.908649Z"
        fill="currentColor"
        strokeWidth={storkeWidth}
        stroke={strokeColor}
        strokeMiterlimit="10"
      />
    </svg>
  )
}
