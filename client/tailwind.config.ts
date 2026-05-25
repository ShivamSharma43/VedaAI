import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-bricolage)", "sans-serif"],
        bricolage: ["var(--font-bricolage)", "sans-serif"],
      },
      colors: {
        brand: {
          orange: "#E8440A",
          dark: "#1A1A1A",
          muted: "#6B6B6B",
          subtle: "#9A9A9A",
          bg: "#F5F5F5",
        },
      },
      borderRadius: {
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};

export default config;
