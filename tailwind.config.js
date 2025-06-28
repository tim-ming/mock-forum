/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: `rgb(var(--accent) / <alpha-value>)`,
        'accent-200': `rgb(var(--accent-200) / <alpha-value>)`,
        primary: `rgb(var(--primary) / <alpha-value>)`,
        'primary-200': `rgb(var(--primary-200) / <alpha-value>)`,
        secondary: `rgb(var(--secondary) / <alpha-value>)`,
        'secondary-200': `rgb(var(--secondary-200) / <alpha-value>)`,
      },
      fontFamily: {
        sans: ['Inter Tight', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
