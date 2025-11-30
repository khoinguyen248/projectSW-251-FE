/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4D44B5',
        secondary: '#FB7D5B',
        accent: '#FCC43E',
        'bg-gray': '#F3F4FF',
        'text-dark': '#303972',
        'text-gray': '#A098AE',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

