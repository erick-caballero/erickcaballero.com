export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      colors: {
        // Dark Mode (Default)
        dark: {
          bg: '#0a0a0a', // Neutral 950 (Deep Black)
          surface: '#171717', // Neutral 900
          primary: '#3b82f6', // Blue 500
          secondary: '#06b6d4', // Cyan 500
          accent: '#6366f1', // Indigo 500 (Subtle accent)
          text: '#fafafa', // Neutral 50
          muted: '#a3a3a3', // Neutral 400
        },
        // Light Mode
        light: {
          bg: '#ffffff',
          surface: '#f5f5f5', // Neutral 100
          primary: '#2563eb', // Blue 600
          secondary: '#0891b2', // Cyan 600
          accent: '#4f46e5', // Indigo 600
          text: '#171717', // Neutral 900
          muted: '#737373', // Neutral 500
        },
      },
      animation: {
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        spotlight: {
          '0%': { opacity: 0, transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: 1, transform: 'translate(-50%,-40%) scale(1)' },
        },
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
          '50%': { opacity: .5, boxShadow: '0 0 10px rgba(99, 102, 241, 0.2)' },
        }
      },
    },
  },
  plugins: [],
}
