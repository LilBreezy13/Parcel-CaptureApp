/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 50:"#f4f7ff",100:"#e6edff",500:"#2b5cff",600:"#1f46cc",900:"#0a1a4a" }
      }
    }
  },
  plugins: []
}
