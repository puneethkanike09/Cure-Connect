/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : "#5f6fff"
      },
      gridTemplateColumns: {
        'auto':'repeat(auto-fit,minmax(200px,1fr))'
      }
    },
  },
  plugins: [],
}