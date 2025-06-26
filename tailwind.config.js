/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        idl: {
          dark: "#222831", // Dark background
          gray: "#31363F", // Secondary dark
          accent: "#76ABAE", // Accent color
          light: "#EEEEEE", // Light text/background
          imprint: "#46ffd0", //Imprint green
          imprintDark: "#1d1d1b", //Imprint dark
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "color-pulse": {
          "0%, 100%": { color: "#EEEEEE" },
          "50%": { color: "#46ffd0" },
        },
        "background-pulse": {
          "0%, 100%": { backgroundColor: "#1d1d1b" },
          "50%": { backgroundColor: "#46ffd0" },
        },
        "border-rotate": {
          "0%": { "border-image-source": "linear-gradient(0deg, #46ffd0, transparent)" },
          "25%": { "border-image-source": "linear-gradient(90deg, #46ffd0, transparent)" },
          "50%": { "border-image-source": "linear-gradient(180deg, #46ffd0, transparent)" },
          "75%": { "border-image-source": "linear-gradient(270deg, #46ffd0, transparent)" },
          "100%": { "border-image-source": "linear-gradient(360deg, #46ffd0, transparent)" },
        },
        "gentle-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
        "intermittent-shake": {
          "0%, 6%, 100%": { transform: "translateX(0)" },
          "1%": { transform: "translateX(-2px)" },
          "2%": { transform: "translateX(2px)" },
          "3%": { transform: "translateX(-2px)" },
          "4%": { transform: "translateX(2px)" },
          "5%": { transform: "translateX(-1px)" },
        },
      },
      animation: {
        "color-pulse": "color-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "background-pulse": "background-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "border-rotate": "border-rotate 1.5s linear infinite",
        "gentle-shake": "gentle-shake 0.6s ease-in-out infinite",
        "gentle-shake-delayed": "gentle-shake 0.6s ease-in-out 3s infinite",
        "intermittent-shake": "intermittent-shake 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
