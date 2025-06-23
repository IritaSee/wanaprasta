/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Lora", "serif"],
      },
      colors: {
        'brand-green': 'oklch(44.31% 0.101 160.06)',
        'brand-green-dark': 'oklch(33.15% 0.082 159.98)',
        'brand-brown': 'oklch(45.03% 0.053 60.11)',
        'brand-mist': 'oklch(95.53% 0.009 240.11)',
        'brand-beige': 'oklch(90.13% 0.03 75.11)',
        'brand-sky': 'oklch(79.52% 0.044 220.1)',
        'brand-cream': 'oklch(98.7% 0.017 10.2)',
      },
      backgroundImage: {
        'forest-bg': "url('/forest.jpg')", // Use your actual image path
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
