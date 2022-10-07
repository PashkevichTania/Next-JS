/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      zIndex: {
        90: "90",
        100: "100",
      },
      blur: {
        x100: "100px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
}
