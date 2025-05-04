/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
    animation: {
      'fade-in-out': 'fadeInOut 3s ease-in-out infinite',
    },
    keyframes: {
      fadeInOut: {
        '0%, 100%': { opacity: '0' },
        '50%': { opacity: '1' },
      },
    },
  }
};
