import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          1: '#1db954',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(209, 213, 219, 0.5) rgba(209, 213, 219, 0.1)',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(209, 213, 219, 0.5)',
            borderRadius: '20px',
            border: '3px solid rgba(209, 213, 219, 0.1)',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(209, 213, 219, 0.8)',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(209, 213, 219, 0.1)',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
export default config;
