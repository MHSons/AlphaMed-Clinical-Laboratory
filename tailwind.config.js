/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",   // Blue (lab theme)
        secondary: "#059669", // Green accent
      },
    },
  },
  plugins: [],
};
