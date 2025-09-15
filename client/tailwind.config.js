/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'austria-red': '#E60012',
        'austria-dark': '#1a1a1a',
        'stats-blue': '#0066CC',
        'stats-green': '#00AA44',
        'stats-orange': '#FF8800'
      }
    },
  },
  plugins: [],
}

