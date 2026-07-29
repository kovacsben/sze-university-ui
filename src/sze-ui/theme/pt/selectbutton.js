import { classNames } from "primereact/utils";
import { RADIUS } from "../tokens";

export const selectButtonPT = {
  // Külső konténer: a gombok saját háttérszíne rajzolja ki a formát, a
  // konténernek csak a lekerekítést/vágást kell biztosítania.
  root: { className: `inline-flex items-stretch ${RADIUS.lg} overflow-hidden` },
  button: ({ context }) => ({
    className: classNames(
      // Alap stílus: fix magasság, középigazítás, animált szín-átmenet
      "px-6 h-10 flex items-center text-base font-semibold text-white transition-colors duration-300 ease-in-out",
      // Kiválasztott: sze-primary háttér — ide "úszik át" a kitöltés kattintáskor
      // Nem kiválasztott: sze-third (világosszürke) háttér
      context.selected ? "bg-sze-primary" : "bg-sze-third text-sze-primary hover:bg-sze-primary/50",
      // Első és utolsó gomb lekerekítése
      "first:rounded-l-lg last:rounded-r-lg"
    ),
  }),
};

export const selectButtonPTDark = {
  ...selectButtonPT,
  button: ({ context }) => ({
    className: classNames(
      "px-6 h-10 flex items-center text-base font-semibold transition-colors duration-300 ease-in-out",
      context.selected ? "bg-sze-primary text-white" : "bg-sze-third/40 text-sze-primary hover:bg-sze-third/60",
      "first:rounded-l-lg last:rounded-r-lg"
    ),
  }),
};
