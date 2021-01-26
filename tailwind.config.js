// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      noto: ['Noto Sans KR', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
    textColor: {
      white: '#FFFFFF',
      blue: '#1B4C67',
      red: '#AD5959',
      lightGray: '#F0F0F0',
      cancel: '#E5E5E5',
      text: '#606060',
    },
    boxShadow: {
      note: '0px 10px 15px -3px rgba(0, 0, 0, 0.08)',
      mode: '-10px 0px 20px -7px rgba(0, 0, 0, 0.24)',
    },
    transitionProperty: {
      right: 'right',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
