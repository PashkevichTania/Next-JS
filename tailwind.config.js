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
        '100': '100',
      }
    }
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
}
