const CarpoolingIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity="0.2" cx="8.67969" cy="8.67969" r="8" fill="#278EA5" />
      <path
        d="M5.08371 1.03613L1.17969 6.59169M1.17969 6.59169L3.60106 6.59169M1.17969 6.59169L16.1797 6.59169"
        stroke="#278EA5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2757 16.5918L16.1797 11.5918M16.1797 11.5918L14.2255 11.5918M16.1797 11.5918L1.17969 11.5918"
        stroke="#373737"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { CarpoolingIcon }
