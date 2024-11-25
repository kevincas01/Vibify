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
        grayBg:"var(--gray-background)",
        main: "rgb(29, 185, 84)", // Main color
      },

      transitionProperty: {
        'background': 'background-color',
      }
    },
  },
  plugins: [],
} satisfies Config;
