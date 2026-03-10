/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c9a961',
          dark: '#b8944f',
          light: '#d4b878',
        },
        secondary: '#1a1a2e',
        accent: '#e8d5c4',
        gold: '#d4a574',
        rose: '#d4a5a5',
        cream: '#faf8f5',
        dark: {
          bg: '#121212',
          card: '#2a2a2a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 169, 97, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 169, 97, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
