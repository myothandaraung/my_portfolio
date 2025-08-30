** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // important for React
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#2d2d30',
        'light-gold': '#ffd700',
        'light-gold-darker': '#ffd700',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideInLeft: { '0%': { opacity: 0, transform: 'translateX(-50px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
        slideInUp: { '0%': { opacity: 0, transform: 'translateY(50px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        pulseSlow: { '0%,100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.05)' } },
        pingSlow: { '75%,100%': { transform: 'scale(2)', opacity: 0 } },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease forwards',
        slideInLeft: 'slideInLeft 1s ease forwards',
        slideInUp: 'slideInUp 1s ease forwards',
        pulseSlow: 'pulseSlow 3s ease-in-out infinite',
        pingSlow: 'pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
};