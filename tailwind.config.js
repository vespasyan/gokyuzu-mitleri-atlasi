/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#1a1a1a',
          100: '#111111',
          200: '#0d0d0d',
          300: '#080808',
          400: '#050505',
          500: '#000000',
        },
        star: {
          50: '#fef9e7',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f59e0b',
          500: '#eab308',
        },
        cosmic: {
          50: '#1e1b4b',
          100: '#312e81',
          200: '#3730a3',
          300: '#4338ca',
          400: '#4f46e5',
          500: '#6366f1',
        }
      },
      fontFamily: {
        'cosmic': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite alternate',
      },
      keyframes: {
        twinkle: {
          '0%': { opacity: 0.3 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}