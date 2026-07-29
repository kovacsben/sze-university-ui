/** @type {import('tailwindcss').Config} */
// A szín/betűtípus/token definíciók egyetlen forrása a src/index.css @theme
// blokkja (Tailwind v4 CSS-first mechanizmus) - itt nincs duplikálva.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],
};