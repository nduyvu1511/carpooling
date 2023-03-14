import React from "react"

const ArrowTwowayIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
    >
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.4142 19.9188C50.1953 20.6998 50.1953 21.9662 49.4142 22.7472L41.4142 30.7472C40.6332 31.5283 39.3668 31.5283 38.5858 30.7472C37.8047 29.9662 37.8047 28.6998 38.5858 27.9188L43.1716 23.333L16 23.333C14.8954 23.333 14 22.4376 14 21.333C14 20.2284 14.8954 19.333 16 19.333L43.1716 19.333L38.5858 14.7472C37.8047 13.9662 37.8047 12.6998 38.5858 11.9188C39.3668 11.1377 40.6332 11.1377 41.4142 11.9188L49.4142 19.9188Z"
        fill="#5D44FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5858 44.0802C13.8047 43.2992 13.8047 42.0329 14.5858 41.2518L22.5858 33.2518C23.3668 32.4708 24.6332 32.4708 25.4142 33.2518C26.1953 34.0329 26.1953 35.2992 25.4142 36.0802L20.8284 40.666L48 40.666C49.1046 40.666 50 41.5614 50 42.666C50 43.7706 49.1046 44.666 48 44.666L20.8284 44.666L25.4142 49.2518C26.1953 50.0329 26.1953 51.2992 25.4142 52.0802C24.6332 52.8613 23.3668 52.8613 22.5858 52.0802L14.5858 44.0802Z"
        fill="#5D44FF"
      />
    </svg>
  )
}

export { ArrowTwowayIcon }