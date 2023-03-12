/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "git" : "#20252d",
        "docker" : "#2496ed"
      }
    },
  },
  plugins: [],
}