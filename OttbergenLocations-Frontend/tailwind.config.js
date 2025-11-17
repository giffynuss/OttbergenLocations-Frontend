/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'booking-dark-brown': '#69443c',
        'booking-medium-brown': '#835e53',
        'booking-gray-brown': '#aca399',
        'booking-beige': '#c7beb4',
        'booking-light-beige': '#dedad4',
        'booking-very-light': '#faf7f7',
        'booking-black': '#000000',
      },
    },
  },
  plugins: [],
}
