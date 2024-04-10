/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      }),
      colors: {
        'signature-color': '#1ed760', // Example custom color
      },
    },
  },
  plugins: [],
}

