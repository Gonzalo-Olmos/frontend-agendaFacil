/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF0060',
        'secondary': {
          '100': '#E2E2D5',
          '200': '#888883',
          '300': '#444444',
        },
      },
    },
  },
  plugins: [],
}

