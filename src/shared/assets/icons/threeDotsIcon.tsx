import React from "react"

export const ThreeDotsIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="5"
      height="21"
      viewBox="0 0 5 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 10.75C4.5 11.8546 3.60457 12.75 2.5 12.75C1.39543 12.75 0.5 11.8546 0.5 10.75C0.5 9.64543 1.39543 8.75 2.5 8.75C3.60457 8.75 4.5 9.64543 4.5 10.75Z"
        fill="currentColor"
      />
      <path
        d="M4.5 2.75C4.5 3.85457 3.60457 4.75 2.5 4.75C1.39543 4.75 0.5 3.85457 0.5 2.75C0.5 1.64543 1.39543 0.75 2.5 0.75C3.60457 0.75 4.5 1.64543 4.5 2.75Z"
        fill="currentColor"
      />
      <path
        d="M4.5 18.75C4.5 19.8546 3.60457 20.75 2.5 20.75C1.39543 20.75 0.5 19.8546 0.5 18.75C0.5 17.6454 1.39543 16.75 2.5 16.75C3.60457 16.75 4.5 17.6454 4.5 18.75Z"
        fill="currentColor"
      />
    </svg>
  )
}
