/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#20252d",
        "git": "#f05030",
        "docker": "#2496ed"
      }
    },
  },
  plugins: [],
}