const ConvenientIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity="0.2" cx="8.67969" cy="8.8623" r="8" fill="#7D27A5" />
      <path
        d="M5.08371 1.21875L1.17969 6.77431M1.17969 6.77431L3.60106 6.77431M1.17969 6.77431L16.1797 6.77431"
        stroke="#7D27A5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2757 16.7744L16.1797 11.7744M16.1797 11.7744L14.2255 11.7744M16.1797 11.7744L1.17969 11.7744"
        stroke="#373737"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { ConvenientIcon }
