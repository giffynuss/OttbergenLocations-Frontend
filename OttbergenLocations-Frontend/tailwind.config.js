/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxuriöses bräunlich-creme Farbschema
        'luxury-dark': '#3d2817',      // Dunkles Schokoladenbraun
        'luxury-brown': '#5c442f',      // Warmes Braun
        'luxury-medium': '#8b6f47',     // Mittleres Goldbraun
        'luxury-tan': '#a68a64',        // Sanftes Tan
        'luxury-cream': '#d4c4b0',      // Cremeton
        'luxury-light': '#e8dfd5',      // Helles Creme
        'luxury-ivory': '#f5f0e8',      // Elfenbein
        'luxury-gold': '#b8946f',       // Goldakzent
        'luxury-accent': '#947454',     // Akzentbraun
      },
      fontFamily: {
        'luxury': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Lato', 'Helvetica Neue', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.05em',
        'luxury-wide': '0.1em',
      },
      boxShadow: {
        'luxury': '0 4px 6px -1px rgba(61, 40, 23, 0.15), 0 2px 4px -1px rgba(61, 40, 23, 0.08)',
        'luxury-md': '0 6px 12px -2px rgba(61, 40, 23, 0.2), 0 3px 6px -1px rgba(61, 40, 23, 0.1)',
        'luxury-lg': '0 10px 20px -3px rgba(61, 40, 23, 0.25), 0 4px 8px -2px rgba(61, 40, 23, 0.12)',
        'luxury-xl': '0 20px 40px -6px rgba(61, 40, 23, 0.3), 0 8px 16px -4px rgba(61, 40, 23, 0.15)',
      },
    },
  },
  plugins: [],
}
