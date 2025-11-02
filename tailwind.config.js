/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7FB77E',
        'primary-dark': '#3C6255',
        'primary-light': '#B1D7B4',
        accent: '#FFD6A5',
        'text-primary': '#1E293B',
        'text-secondary': '#475569',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        error: '#FCA5A5',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'heart-float': 'float 6s ease-in-out infinite',
        glow: 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
