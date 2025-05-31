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
        sans: ['Inter', 'sans-serif'], // Example: Add Inter font
      },
      // You can extend other theme properties here
      colors: {
        // Example: Define custom colors if your components use them
        // 'card': 'hsl(var(--card))',
        // 'card-foreground': 'hsl(var(--card-foreground))',
        // ...
      }
    },
  },
  plugins: [],
}
