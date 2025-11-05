/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        heart: "#c0392b",
        diabetes: "#16a085",
      },
    },
  },
  plugins: [],
};
