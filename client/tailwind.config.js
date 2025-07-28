export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        mexican: {
          green: '#006847',
          red: '#ce1126',
          cream: '#f5f5dc',
        },
        accent: {
          orange: '#ff6b35',
          yellow: '#f7931e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'system-ui', 'sans-serif'],
        handwritten: ['"Caveat Brush"', 'cursive'],
      },
    },
  },
  plugins: [],
}; 