import { classNames } from "primereact/utils";
import { RADIUS, DURATION } from "../tokens";

/**
 * Tree Pass-Through (PT) stílusok
 *
 * A PrimeReact a saját CSS-ében adná a sor-elrendezést, a szintenkénti
 * behúzást és a levélelemek nyitógombjának elrejtését, de azt unstyled módban
 * nem injektálja be. Enélkül a fa szinte olvashatatlan: az ikon a címkéhez
 * tapad, a szintek alig 8px-cel tolódnak, és a levélelemeken is megjelenik a
 * nyitó nyíl, mintha lenne mit kibontani rajtuk.
 *
 * Szerkezet: node (<li>) > content (a sor) > toggler + nodeIcon + label,
 * és node > subgroup (<ul>) > a gyerek node-ok.
 */
export const tree = {
  root: {
    className: `bg-white border border-gray-200 ${RADIUS.lg} p-4 text-sm`,
  },

  // A <li> csak konténer - a kiemelés a soron (content) van, különben a
  // hover az egész alfát beszínezné.
  node: { className: "list-none" },

  // Maga a sor: ez adja az ikon és a címke közti térközt is.
  content: ({ context }) => ({
    className: classNames(
      `flex items-center gap-2 p-2 ${RADIUS.md}`,
      `transition-colors ${DURATION.fast}`,
      context.selected ? "bg-sze-primary/10" : "hover:bg-sze-primary-50"
    ),
  }),

  toggler: ({ context }) => ({
    className: classNames(
      `shrink-0 inline-flex items-center justify-center w-6 h-6 ${RADIUS.full}`,
      "text-sze-primary transition-colors",
      context.leaf
        ? // Levélelemen nincs mit kibontani. `invisible` és nem `hidden`:
          // a hely megmarad, így a címkék szintenként egy vonalban állnak.
          "invisible pointer-events-none"
        : "hover:bg-sze-primary/10 cursor-pointer"
    ),
  }),

  nodeIcon: { className: "shrink-0 text-sze-primary" },

  label: { className: "text-gray-700 font-medium" },

  // Szintenkénti behúzás a bal oldali vezetővonallal - ez teszi ránézésre
  // követhetővé, melyik szak melyik karhoz tartozik.
  subgroup: { className: "list-none ml-3 pl-4 border-l border-gray-200" },
};
