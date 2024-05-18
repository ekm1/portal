import themes from './themes'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  daisyui: {
    themes
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography'), require('daisyui')]
}