/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,css}",   // 👈 added css
    "./src/components/**/*.{js,ts,jsx,tsx,css}", // 👈 added css
    "./src/styles/**/*.{js,ts,jsx,tsx,css}",     // 👈 optional if you use /styles
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
