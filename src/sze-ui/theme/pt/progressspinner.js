/**
 * ProgressSpinner Pass-Through (PT) stílusok
 *
 * Szerkezet: root (role=progressbar) > spinner (<svg viewBox="25 25 50 50">) > circle
 *
 * Unstyled módban a PrimeReact se színt, se animációt nem ad a körnek: a
 * `fill="none"` mellett vonalszín sem volt, így a spinner egyáltalán nem
 * látszott. Itt:
 *   - a gyökér kapja a méretet (a SZE ProgressSpinner `size` propja felülírja),
 *   - az svg forog (animate-spin),
 *   - a kör vonala SZE-kék, és a hossza "lélegzik" (animate-spinner-dash, @theme).
 */
export const progressspinner = {
  root: { className: "relative inline-block h-12 w-12" },
  spinner: { className: "h-full w-full animate-spin [animation-duration:1.4s]" },
  circle: { className: "stroke-sze-primary [stroke-linecap:round] animate-spinner-dash" },
};
