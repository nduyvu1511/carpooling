/**
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "sidebar-grid": "236px 1fr",
        "grid-330": "330px 1fr",
        "booking-grid": "1fr 500px",
        "wallet-grid": "440px 1fr",
        "booking-grid-sm": "1fr 400px",
      },
      boxShadow: {
        "shadow-1": "0px 1px 2px rgba(0, 0, 0, 0.05)",
      },
    },
    colors: {
      primary: "#2E41B6",
      "primary-opacity": "#DAE2FD",
      "bg-primary": "rgb(46, 76, 183, 0.2)",
      "white-color": "#FFFFFF",
      "text-color": "#4E4E6A",
      "gray-color-1": "#F0F0F0",
      "gray-color-2": "#BFBFBF",
      "gray-color-3": "#595959",
      "gray-color-4": "#373737",
      "gray-color-5": "#858585",
      "gray-color-7": "#767676",
      "gray-90": "#595959",
      "border-color-1": "#C8C8C8",
      "border-color-2": "#D7D7D7",
      "border-color-3": "rgba(0, 32, 51, 0.26)",
      "border-color": "#F0F0F0",
      warning: "#ED9526",
      "warning-opacity": "#FFE9CD",
      "bg-warning": "rgba(237, 149, 38, 0.3)",
      "bg-1": "#F6F9FF",
      "black-70": "rgba(0, 0, 0, 0.7)",
      "black-60": "rgba(0, 0, 0, 0.6)",
      "black-40": "rgba(0, 0, 0, 0.4)",
      "black-10": "rgba(0, 0, 0, 0.1)",
      "gold-2": "#FFDAB8",
      info: "#007BFF",
      bg: "#f0f0f0",
      error: "#FF3B30",
      "bg-error": "rgba(255, 59, 48, 0.2)",
      warning: "#FF9500",
      active: "#1F6CB0",
      success: "#10B981",
      black: "#000000",
      "bg-blue": "#EEEBFF",
      "blue-1": "#4E4E6A",
      "blue-2": "#6B7EDF",
      "blue-3": "#2E4CB7",
      "blue-4": "#70A3C4",
      "blue-5": "#E7E8F5",
      "blue-7": "#2F19BB",
      "blue-8": "#0C0055",
      disabled: "#BFBFBF",
      cyan: "#278EA5",
      "orange-50": "#EE542F",
      "orange-50-bg": "rgba(238, 84, 47, 0.3)",
      "bg-success": "#DCFDD9",
      "bg-warning": "#EFD88F",
      "bg-error": "#FFDBDB",
      "bg-primary": "#F1F5FF",
    },
    fontSize: {
      12: 12,
      10: 10,
      13: 13,
      14: 14,
      15: 15,
      16: 16,
      17: 17,
      18: 18,
      20: 20,
      22: 22,
      24: 24,
      26: 26,
      28: 28,
      button: 16,
      h1: 60,
      h2: 40,
      h3: 28,
    },
    lineHeight: {
      20: "20px",
      24: "24px",
      26: "26px",
      28: "28px",
    },
    spacing: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      8: 8,
      24: 24,
      48: 48,
      32: 32,
      12: 12,
      8: 8,
      10: 10,
      "modal-width": 610,
      "content-container-width": 640,
      "sidebar-width": 236,
    },

    screens: {
      xs: "375px",
      420: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      900: "900px",
      424: "425px",
    },
    maxWidth: {
      "modal-width": 610,
      "content-container-width": 640,
    },
  },
  corePlugins: {
    aspectRatio: false,
    // …
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar-hide"),
    ({ matchUtilities, theme /* … */ }) => {
      // …
      matchUtilities(
        // https://gist.github.com/olets/9b833a33d01384eed1e9f1e106003a3b
        {
          aspect: (value) => ({
            "@supports (aspect-ratio: 1 / 1)": {
              aspectRatio: value,
            },
            "@supports not (aspect-ratio: 1 / 1)": {
              // https://github.com/takamoso/postcss-aspect-ratio-polyfill

              "&::before": {
                content: '""',
                float: "left",
                paddingTop: `calc(100% / (${value}))`,
              },
              "&::after": {
                clear: "left",
                content: '""',
                display: " lock",
              },
            },
          }),
        },
        { values: theme("aspectRatio") }
      )
    },
  ],
}
