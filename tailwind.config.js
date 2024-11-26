/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'cyber': {
            'purple': '#1A1145',
            'dark': '#0A090E',
            'orange': '#E15A34',
            'teal': '#1AA189',
            'text': 'rgba(255, 255, 255, 0.82)',
          },
        },
        boxShadow: {
          'neon': '0 0 15px rgba(225, 90, 52, 0.15), 0 0 30px rgba(26, 161, 137, 0.1)',
        },
        animation: {
          'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
      },
    },
    plugins: [],
  }