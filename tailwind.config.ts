import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dynamic-base-1": "var(--dynamic-base-1)",
        "dynamic-base-2": "var(--dynamic-base-2)",
        "dynamic-base-3": "var(--dynamic-base-3)",
        "dynamic-base-4": "var(--dynamic-base-4)",
        "dynamic-button-primary-background":
          "var(--dynamic-button-primary-background)",
        "dynamic-text-secondary": "var(--dynamic-text-secondary)",
      },
    },
  },
  plugins: [],
};
export default config;
