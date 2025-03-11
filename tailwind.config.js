/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js}", "./*.js"],
  theme: {
    extend: {
      backgroundImage: {
        header: "url('/src/assets/img/bg-header-s-brilho.png')",
      },
    },
  },
  plugins: [],
};
