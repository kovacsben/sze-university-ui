import { RADIUS, SHADOW } from "../tokens";

/**
 * ScrollPanel Pass-Through (PT) stílusok
 *
 * Szerkezet: root > wrapper > content (a görgetett terület), barx, bary
 *
 * A PrimeReact a natív görgetősávot elrejti, és helyette saját sávot rajzol
 * (barx / bary), amit JS-ből méretez és pozícionál. Ehhez a saját CSS-ében
 * lévő elrendezés kell, amit unstyled módban nem injektál - itt pótoljuk:
 *   - a content 18px-cel nagyobb a wrappernél, és ugyanennyi belső margója
 *     van, így a natív sáv a wrapper levágott sávjába csúszik (nem látszik);
 *   - a saját sáv `relative`, a PrimeReact negatív right/bottom eltolással
 *     húzza a helyére; csak a panel fölé víve jelenik meg.
 * Ha nincs mit görgetni, a PrimeReact a `p-scrollpanel-hidden` osztályt
 * teszi a sávra - ennek a szabálya az index.css-ben van.
 *
 * A korábbi PT a `barX`/`barY` kulcsokat használta, de a PrimeReact
 * kisbetűvel (`barx`/`bary`) keresi őket, így a sávok formázatlanok voltak.
 */
const BAR = "relative z-[2] cursor-pointer rounded-full bg-sze-primary/30 hover:bg-sze-primary/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-active:opacity-100";

export const scrollpanel = {
  root: {
    className: `group relative overflow-hidden bg-white border border-black/10 ${RADIUS.xl} ${SHADOW.sm}`,
  },
  wrapper: {
    className: "relative z-[1] float-left h-full w-full overflow-hidden",
  },
  content: {
    className: "relative box-border h-[calc(100%+18px)] w-[calc(100%+18px)] overflow-auto pr-[18px] pb-[18px]",
  },
  bary: { className: `${BAR} top-0 w-1.5` },
  barx: { className: `${BAR} bottom-0 h-1.5` },
};
