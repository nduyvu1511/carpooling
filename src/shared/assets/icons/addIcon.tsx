import React from "react"

const AddIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 29.3332C23.3638 29.3332 29.3333 23.3636 29.3333 15.9998C29.3333 8.63604 23.3638 2.6665 16 2.6665C8.63619 2.6665 2.66666 8.63604 2.66666 15.9998C2.66666 23.3636 8.63619 29.3332 16 29.3332Z"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <path
        d="M16 10.6665V21.3332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6667 16H21.3333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { AddIcon }
