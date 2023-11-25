/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      minWidth: {
        11: '2.75rem',
      },
      screens: {
        xs: '480px',
        xxs: '320px',
        xxxs: '1px',
      },
    },
  },
  plugins: [],
};
