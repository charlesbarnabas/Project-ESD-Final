/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "spiro-disco-ball": "#08C0FF",
        "chinese-black": "#121212",
        "philippine-silver": "#B3B3B3",
        "anti-flash-white": "#F1F2F6",
        "roman-silver": "#808191",
        "cultured": "#F5F5F5",
        "orange-soda": "#F85640",
        "gainsboro": "#DEDEDE"
      },
      fontFamily: {
        montserrat: "Montserrat, sans-serif",
      },
    },
  },
  plugins: [],
};
