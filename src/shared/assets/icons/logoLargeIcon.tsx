const LogoLargeIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="600"
      height="600"
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.2" filter="url(#filter0_i_32199_91712)">
        <path
          d="M582.751 44.8914H552.843L560.19 15.6321C561.665 9.73334 557.254 4 551.218 4H159.871C149.178 4 139.892 11.3872 137.379 21.8753L8.65519 561.195C5.14553 575.873 16.1798 590 31.147 590H422.153C426.386 590 430.087 587.106 431.125 582.957L439.633 549.109H474.238C478.471 549.109 482.159 546.214 483.21 542.066L488.809 519.794C490.298 513.895 485.873 508.162 479.837 508.162H449.93L439.647 549.109H53.2156L173.568 44.8776H552.843L542.547 85.838L205.756 85.1351L162.657 267.334L383.246 268.037L372.95 308.997H154.381L105.615 508.148H449.903L457.25 478.889C458.738 472.99 454.314 467.257 448.277 467.257H169.184C163.176 467.257 158.765 461.565 160.199 455.68L184.357 356.986C185.381 352.824 189.082 349.889 193.342 349.889H397.271C401.505 349.889 405.192 346.994 406.243 342.846L432.368 238.902C433.843 233.017 429.445 227.283 423.423 227.27L225.626 226.649C219.658 226.636 215.274 220.999 216.654 215.141L236.018 133.29C237.015 129.086 240.743 126.109 245.031 126.123L525.067 126.702C529.314 126.716 533.015 123.808 534.052 119.659L542.547 85.838H577.138C581.371 85.838 585.059 82.9437 586.11 78.7953L591.709 56.5097C593.198 50.6248 588.787 44.8914 582.751 44.8914Z"
          fill="#826EFF"
          fillOpacity="0.5"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_32199_91712"
          x="0"
          y="0"
          width="600"
          height="608"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_32199_91712" />
        </filter>
      </defs>
    </svg>
  )
}

export { LogoLargeIcon }
