import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "yellow-accent": "#FFDA18",
        "light-color": "#EFEFF1",
        "dark-color": "#303133",
      },
    },
  },
  plugins: [],
} satisfies Config;
