/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx}", // 👈 add this
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
