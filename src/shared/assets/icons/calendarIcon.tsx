import React from "react"

const CalendarIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.3176 3H5.31763C3.10849 3 1.31763 4.79086 1.31763 7V17C1.31763 19.2091 3.10849 21 5.31763 21H17.3176C19.5268 21 21.3176 19.2091 21.3176 17V7C21.3176 4.79086 19.5268 3 17.3176 3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.31763 1V5M15.3176 1V5M1.31763 9H21.3176"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { CalendarIcon }
