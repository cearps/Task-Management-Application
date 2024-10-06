/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        256: "64rem",
      },
      maxWidth: {
        "9xl": "9rem",
      },
    },
  },
  plugins: [],
};
