import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        grayBg: "var(--gray-background)",
        main: "var(--main-color)", // Main color
        lightGray: "var(--light-gray)",
      },
      animation: {
        dance: "dance 0.5s infinite alternate ease-in-out",
      },
      keyframes: {
        dance: {
          "0%": { height: "10px" },
          "25%": { height: "70%" },
          "50%": { height: "100%" },
          "75%": { height: "70%" },
          "100%": { height: "10px" },
        },
      },

      transitionProperty: {
        background: "background-color",
      },
    },
  },
  plugins: [],
} satisfies Config;
