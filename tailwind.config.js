/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary green palette
        sageGreen: '#7FB77E',
        forestGreen: '#3C6255',
        mintGreen: '#B1D7B4',
        // Accent colors
        peach: '#FFD6A5',
        // Text colors
        charcoal: '#1E293B',
        slateGray: '#475569',
        // Background colors
        offWhite: '#F8FAFC',
        pureWhite: '#FFFFFF',
        // Status colors
        softRed: '#FCA5A5',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'Nunito', 'sans-serif'],
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
      borderRadius: {
        button: '0.75rem',
      },
      boxShadow: {
        button:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
