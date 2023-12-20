/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    colors: {
      primary: '#2b2c37',
      secondary: '#20212c',
      white: '#ffffff',
      gary: '#828fa3',
      purple: '#635fc7'
    },
    extend: {},
  },
  plugins: [],
}