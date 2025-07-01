/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./sections/*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        light: "#8ECAE6",
        mid: "#219EBC",
        dark: "#023047",
        accent: "#FFB703",
        darkAccent: "#FB8500",
      },
    },
  },
  plugins: [],
};
