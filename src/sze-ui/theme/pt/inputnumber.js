import { RADIUS, RADIUS_R } from "../tokens";

/**
 * A belső <input>-ot a PrimeReact a globális `inputtext` PT-vel rendereli
 * (data-pc-name="inputtext"), az itteni `input` szekciót figyelmen kívül hagyja.
 * Ezért a keret/háttér/jobb oldali lekerekítés semlegesítése az index.css-ben,
 * data-pc attribútum szelektorral történik – itt csak a burkoló és a gombok
 * stílusa él.
 */
export const inputNumberPT = {
  root: ({ props }) => ({
    className:
      `inline-flex items-stretch ${RADIUS[props.radius] ?? RADIUS["3xl"]} ` +
      "border border-black/15 bg-sze-third/20 overflow-hidden " +
      "focus-within:ring-1 focus-within:ring-sze-primary focus-within:ring-offset-1 ring-offset-white",
  }),

  // jobb oldali +/– gombok (showButtons esetén): a pill ívén belül maradjanak
  buttonGroup: ({ props }) => ({
    className:
      "flex flex-col shrink-0 w-10 pr-1 border-l border-black/15 " +
      `${RADIUS_R[props.radius] ?? RADIUS_R["3xl"]} overflow-hidden`,
  }),
  incrementButton: {
    className:
      "flex-1 flex items-center justify-center text-sze-primary hover:bg-sze-primary/10",
  },
  decrementButton: {
    className:
      "flex-1 flex items-center justify-center text-sze-primary hover:bg-sze-primary/10 border-t border-black/10",
  },
};
