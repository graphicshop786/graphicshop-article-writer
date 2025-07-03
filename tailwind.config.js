/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#FFD700',
        'brand-black': '#1A1A1A',
      },
    },
  },
  plugins: [],
};