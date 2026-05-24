import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fff4ef",
          100: "#ffe5d9",
          500: "#ff5a1f",
          600: "#ea4a14",
          700: "#1a1a1a", // dark CTA
        },
        ink: "#1f2937",
        muted: "#6b7280",
        line: "#ececec",
        page: "#f5f5f5",
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;