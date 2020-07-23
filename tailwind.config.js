// tailwind.config.js
// const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    content: ["./src/**/*.html"],
  },
  theme: {
    extend: {
      lineHeight: {
        '20': '5rem'
      },
      height: {
        'c-562': '562px',
        'c-1292': '1292px',
        'c-1241': '1241px'
      },
      inset: {
        '0': 0,
        '35': '35%',
        '1/2': '50%',
      }
    },
  },
  variants: {},
  plugins: [],
};