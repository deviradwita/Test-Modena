/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  colors: {
    'green': '#14b766',
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
}