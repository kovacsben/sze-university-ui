import { classNames } from "primereact/utils";
export const selectButtonPT = {
  // Külső konténer: téglalap, világoskék keret, overflow hidden
  root: { className: "inline-flex items-stretch rounded-lg overflow-hidden border-2 border-sze-primary" },
  button: ({ context }) => ({ 
    className: classNames(
      // Alap stílus: fix magasság, középigazítás, átmenet
      "px-6 h-10 text-base font-semibold transition-all",
      // Kiválasztott: világoskék háttér, fehér szöveg, világoskék keret
      context.selected
        ? "bg-sze-primary text-white border-sze-primary z-10"
        // Nem kiválasztott: fehér háttér, szürke szöveg, nincs háttér
        : "bg-white text-sze-primary border-transparent",
      // Első és utolsó gomb lekerekítése
      "first:rounded-l-lg last:rounded-r-lg",
      // Gombok között nincs margó, nincs átfedés
      "border-r last:border-r-0"
    ),
  }),
};
export const selectButtonPTDark = {
  ...selectButtonPT,
  root: { className: "inline-flex items-stretch rounded-lg overflow-hidden border-2 border-sze-primary/80" },
  button: ({ context }) => ({
    className: classNames(
      "px-6 h-10 text-base font-semibold transition-all",
      context.selected
        ? "bg-sze-primary text-white border-sze-primary/80 z-10"
        : "bg-black text-sze-primary border-transparent",
      "first:rounded-l-lg last:rounded-r-lg",
      "border-r last:border-r-0"
    ),
  }),
};