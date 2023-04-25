/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#4C63D0',
        background: '#F9F8F3',
        bruinblue: '#194CA7',
      }
    },
  },
  plugins: [],
}

