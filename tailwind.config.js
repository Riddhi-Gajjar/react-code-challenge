/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        padding: "25px",
      },
      screens: {
        sm: "320px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        xxl: "2560px",
      },
      fontFamily: {
        NunitoSans: ["NunitoSans", "sans"],
      },
    },
  },
  plugins: [],
};
