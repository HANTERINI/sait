/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Cal Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#ff0000",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#ff0000",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        orange: "hsl(var(--orange))",
        purple: "hsl(var(--purple))",
        blue: "hsl(var(--blue))",
        emerald: "hsl(var(--emerald))",
        crimson: "hsl(var(--crimson))",
        cyan: "hsl(var(--cyan))",
        lime: "hsl(var(--lime))",
        gold: "hsl(var(--gold))",
        magenta: "hsl(var(--magenta))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
