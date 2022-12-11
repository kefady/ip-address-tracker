/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bgpattern": "url('images/pattern-bg.png')"
      },
      spacing: {
        '72': '18rem'
      }
    },
  },
  plugins: [],
}
