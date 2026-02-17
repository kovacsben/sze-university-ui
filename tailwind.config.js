/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "sze-primary": "#242943",
        "sze-primary-900": "#374271",
        "sze-primary-800": "#404D8D",
        "sze-primary-700": "#495CAC",
        "sze-primary-600": "#546DBC",
        "sze-primary-500": "#6786CA",
        "sze-primary-400": "#84A3D6",
        "sze-primary-300": "#ACC2E4",
        "sze-primary-200": "#CEDBEF",
        "sze-primary-100": "#E3EAF6",
        "sze-primary-50": "#F3F5FB",
        "sze-secondary": "#50ADC9",
        "sze-secondary-900": "#254254",
        "sze-secondary-800": "#274E63",
        "sze-secondary-700": "#275E77",
        "sze-secondary-600": "#297391",
        "sze-secondary-500": "#2E8EAC",
        "sze-secondary-300": "#83CADD",
        "sze-secondary-200": "#B6E1EB",
        "sze-secondary-100": "#D8F0F5",
        "sze-secondary-50": "#F0FAFB",
      },
      fontFamily: {
        "sze-heading": "Montserrat",
        "sze-body": "Montserrat",
      },
    },
  },
  plugins: [],
};