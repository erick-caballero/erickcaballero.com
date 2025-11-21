/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure this covers your file extensions
  ],
  darkMode: 'class', // To enable dark mode based on class
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      colors: {
        // Light Mode
        light: {
          bg: '#ffffff',
          text: '#1a202c',
          primary: '#2563eb', // blue-600
          secondary: '#4f46e5', // indigo-600
          accent: '#06b6d4', // cyan-500
        },
        // Dark Mode
        dark: {
          bg: '#0a0a0a', // near black
          text: '#f3f4f6', // gray-100
          primary: '#3b82f6', // blue-500
          secondary: '#8b5cf6', // violet-500
          accent: '#22d3ee', // cyan-400
        },
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
