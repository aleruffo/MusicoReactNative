/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#F0ECF7',
        background: {
          default: '#0C0A10',
          opacity50: 'rgba(12, 10, 16, 0.5)',
        },
        primary: {
          default: '#6E31D8',
          opacity50: 'rgba(110, 49, 216, 0.5)',
          opacity25: 'rgba(110, 49, 216, 0.25)',
        },
        secondary: {
          default: '#462A7A',
          opacity50: 'rgba(70, 42, 122, 0.5)',
          opacity25: 'rgba(70, 42, 122, 0.25)',
        },
        accent: '#F42D78',
        gradient: 'linear-gradient(90deg, #F42D78 100%, #6E31D8 100%)',
        grayopacity50: 'rgba(240, 236, 247, 0.2)',
      },
    },
    fontFamily: {
      pthin: ['Goldplay-Thin', 'sans-serif'],
      plight: ['Goldplay-Light', 'sans-serif'],
      pregular: ['Goldplay-Regular', 'sans-serif'],
      pmedium: ['Goldplay-Medium', 'sans-serif'],
      psemibold: ['Goldplay-SemiBold', 'sans-serif'],
      pbold: ['Goldplay-Bold', 'sans-serif'],
      pblack: ['Goldplay-Black', 'sans-serif'],
    },
  },
  plugins: [],
};
