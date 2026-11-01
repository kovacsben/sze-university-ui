import { classNames } from "primereact/utils";

/**
 * Timeline Pass-Through (PT) stílusok
 *
 * Szerkezet eseményenként: event > opposite | separator (marker + connector) | content
 *
 * A PrimeReact a sor-elrendezést (event: flex sor, separator: oszlop, a
 * connector kitölti a maradék magasságot) a saját CSS-éből adná; unstyled
 * módban ezek blokk-elemek voltak, ezért az ikon a tartalom FÖLÉ került.
 * Itt: ikon balra, a mellette lévő tartalom (kártya) függőleges közepéhez
 * igazítva; a jelölőket összekötő vonal mögöttük fut.
 *
 * Az `opposite` oszlop (a vonal másik oldala) csak akkor látszik, ha a
 * hívó ad hozzá tartalmat (`opposite` prop) - különben üresen elvenné a
 * hely felét.
 *
 * A tartalom kártyáját a SZE Timeline sablonja rajzolja; a korábbi PT a
 * `content`-re is kártyát tett, így dupla keret lett belőle.
 */
export const timeline = {
  root: ({ props }) => ({
    className: classNames("flex", props.layout === "horizontal" ? "flex-row" : "flex-col"),
  }),

  // A sorok közti térköz az esemény alsó belső margója (és nem a tartalomé):
  // így a separator oszlop pontosan a kártya magasságú, a jelölő pedig a
  // kártya függőleges közepére kerül.
  event: ({ props, context }) => ({
    className: classNames("relative flex", context.index < (props.value?.length ?? 0) - 1 && "pb-6"),
  }),

  opposite: ({ props }) => ({
    className: props.opposite ? "flex-1 px-4 text-right text-sm text-gray-500" : "hidden",
  }),

  // Az összekötő vonal két félből áll, hogy a kártyák magasságától függetlenül
  // folytonos legyen:
  //   - felső fél (before:): a sor tetejétől a jelölő közepéig - az első sornál nincs;
  //   - alsó fél (connector): a jelölő közepétől a sor aljáig, a térközön át
  //     (-bottom-6 = a pb-6) - az utolsó sornál a PrimeReact nem rendereli.
  separator: ({ context }) => ({
    className: classNames(
      "relative flex flex-none flex-col items-center justify-center",
      context.index > 0 &&
        "before:absolute before:left-1/2 before:top-0 before:bottom-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-sze-primary-200 before:content-['']"
    ),
  }),

  // Az alapértelmezett jelölő (ha nincs `marker` sablon); a vonalak fölött.
  marker: { className: "relative z-[1] h-4 w-4 rounded-full border-2 border-sze-primary bg-white" },

  connector: { className: "absolute left-1/2 top-1/2 -bottom-6 w-0.5 -translate-x-1/2 bg-sze-primary-200" },

  content: { className: "flex-1 min-w-0 pl-4" },
};
