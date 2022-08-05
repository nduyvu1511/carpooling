import React from "react"

const NoteIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.4167 10.1663V6.83301C15.4167 4.62387 13.6258 2.83301 11.4167 2.83301H6.08337C3.87423 2.83301 2.08337 4.62387 2.08337 6.83301V10.833C2.08337 13.0421 3.87424 14.833 6.08337 14.833H10.75M15.4167 10.1663L10.75 14.833M15.4167 10.1663H14.75C12.5409 10.1663 10.75 11.9572 10.75 14.1663V14.833"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M5.41663 6.33301C5.14048 6.33301 4.91663 6.55687 4.91663 6.83301C4.91663 7.10915 5.14048 7.33301 5.41663 7.33301V6.33301ZM12.0833 7.33301C12.3594 7.33301 12.5833 7.10915 12.5833 6.83301C12.5833 6.55687 12.3594 6.33301 12.0833 6.33301V7.33301ZM5.41663 7.33301H12.0833V6.33301H5.41663V7.33301Z"
        fill="currentColor"
      />
      <path
        d="M5.41663 9.66602C5.14048 9.66602 4.91663 9.88987 4.91663 10.166C4.91663 10.4422 5.14048 10.666 5.41663 10.666V9.66602ZM8.74996 10.666C9.0261 10.666 9.24996 10.4422 9.24996 10.166C9.24996 9.88987 9.0261 9.66602 8.74996 9.66602V10.666ZM5.41663 10.666L8.74996 10.666V9.66602L5.41663 9.66602V10.666Z"
        fill="currentColor"
      />
    </svg>
  )
}

export { NoteIcon }