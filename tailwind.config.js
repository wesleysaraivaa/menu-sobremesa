/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        header: "url('/src/assets/img/bg-header-s-brilho.png')",
      },
    },
  },
  plugins: [],
};
