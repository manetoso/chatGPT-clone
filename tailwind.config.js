/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gptlogo: '#10a37f',
        gptdarkgray: '#202123',
        gptgray: '#343541',
        gptlightgray: '#444654'
      },
      animation: {
        typing: 'blink 1s steps(5, start) infinite'
      },
      keyframes: {
        blink: {
          to: { visibility: 'hidden' }
        }
      }
    }
  },
  plugins: []
}
