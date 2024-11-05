/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "dancing-script": ["Dancing script", "cursive"],
        "Noto-serif": ["Noto Serif", "serif"],
      },
      screens: {
        xsm: "540px",
      },
    },
  },
  plugins: [],
};
