/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",  // ✅ catches dashboard, community, etc.
    "./src/components/**/*.{js,ts,jsx,tsx}", // ✅ in case you add a components folder outside /app
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
