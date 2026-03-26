/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff6e8',
          100: '#fee7bf',
          200: '#fdd391',
          300: '#fcb85d',
          400: '#fb9d31',
          500: '#f58a0b',
          600: '#d66d06',
          700: '#ad5208',
          800: '#8c4110',
          900: '#733710',
        },
      },
      boxShadow: {
        soft: '0 20px 60px -24px rgba(15, 23, 42, 0.25)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(245, 138, 11, 0.18), transparent 26%), radial-gradient(circle at bottom right, rgba(15, 23, 42, 0.12), transparent 24%)',
      },
    },
  },
  plugins: [],
};
