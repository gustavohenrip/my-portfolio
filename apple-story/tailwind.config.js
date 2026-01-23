/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          gray: "#1d1d1f",
          "gray-100": "#f5f5f7",
          "gray-200": "#e8e8ed",
          "gray-300": "#d2d2d7", 
          blue: "#0071e3",
          "blue-hover": "#0077ED",
          glass: "rgba(255, 255, 255, 0.1)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Helvetica Neue",
          "sans-serif"
        ],
        serif: ["Instrument Serif", "serif"],
      },
      transitionTimingFunction: {
        'apple-ease': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      backdropBlur: {
        'xs': '2px',
        '3xl': '64px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}