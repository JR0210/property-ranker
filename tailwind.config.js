/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    daisyui: {
      themes: ["cupcake", "dark", "cmyk"],
    },
    extend: {
      backgroundImage: (theme) => ({
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "skeleton-gradient": `linear-gradient(
          to right,
          #a6adba 2%,
          #bbbfc7 18%,
          #a6adba 33%
        )`,
        "light-skeleton-gradient": `linear-gradient(
          to right,
          #1f2937 2%,
          #32455c 18%,
          #1f2937 33%
        )`,
      }),
      keyframes: {
        "left-to-right": {
          "0%": { backgroundPosition: "-650px 0" },
          "100%": { backgroundPosition: "650px 0" },
        },
      },
      animation: {
        "left-to-right": "left-to-right 3s linear infinite forwards",
      },
    },
    variants: {
      extend: {
        backgroundImage: ["dark"],
      },
    },
  },
  plugins: [require("daisyui")],
};
