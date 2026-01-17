/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-secondary": "rgb(var(--accent-secondary) / <alpha-value>)",
        "accent-glow": "rgb(var(--accent-glow) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-hover": "rgb(var(--surface-hover) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        "glitch-1": "rgb(var(--glitch-1) / <alpha-value>)",
        "glitch-2": "rgb(var(--glitch-2) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Fira Code", "monospace"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        glitch: "glitch 0.5s infinite",
        "glitch-skew": "glitch-skew 1s infinite linear alternate-reverse",
        scanline: "scanline 8s linear infinite",
        flicker: "flicker 3s linear infinite",
        "data-corruption": "data-corruption 0.3s ease-in-out",
        "pixel-render": "pixel-render 1s ease-out forwards",
        "cyber-pulse": "cyber-pulse 2s ease-in-out infinite",
        "text-glitch": "text-glitch 0.5s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glitch: {
          "0%": { clipPath: "inset(40% 0 61% 0)", transform: "translate(-2px, 2px)" },
          "20%": { clipPath: "inset(92% 0 1% 0)", transform: "translate(2px, -2px)" },
          "40%": { clipPath: "inset(43% 0 1% 0)", transform: "translate(-2px, 0)" },
          "60%": { clipPath: "inset(25% 0 58% 0)", transform: "translate(2px, 2px)" },
          "80%": { clipPath: "inset(54% 0 7% 0)", transform: "translate(-2px, -2px)" },
          "100%": { clipPath: "inset(58% 0 43% 0)", transform: "translate(0)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "cyber-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px rgb(var(--accent) / 0.5), 0 0 10px rgb(var(--accent) / 0.3)" },
          "50%": { boxShadow: "0 0 20px rgb(var(--accent) / 0.8), 0 0 40px rgb(var(--accent) / 0.5)" },
        },
      },
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
      boxShadow: {
        glow: "0 0 20px rgb(var(--accent) / 0.5)",
        "glow-lg": "0 0 40px rgb(var(--accent) / 0.5)",
        cyber: "0 0 10px rgb(var(--accent) / 0.3), inset 0 0 10px rgb(var(--accent) / 0.1)",
      },
    },
  },
  plugins: [],
}
