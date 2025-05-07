/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#2e2e38',
        'yellow': '#ffe600',
        'white': '#ffffff',
      },
    },
  },
  plugins: [],
}

