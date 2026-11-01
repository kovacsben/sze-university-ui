import { classNames } from "primereact/utils";
import { RADIUS } from "../tokens";

/**
 * Skeleton Pass-Through (PT) stílusok
 *
 * A "wave" animációt a PrimeReact egy ::after pszeudo-elemmel rajzolná a
 * saját CSS-éből - unstyled módban ez kimarad, a helyőrző mozdulatlan szürke
 * sáv volt, és nem látszott rajta, hogy "tölt". Itt az ::after egy áttetsző
 * fehér sáv, ami balról jobbra átfut rajta (animate-shimmer, @theme).
 *
 * A méretet (width/height/size) és a borderRadius-t a PrimeReact inline
 * stílusként adja; a kör alakhoz (shape="circle") itt a rounded-full.
 */
export const skeleton = {
  root: ({ props }) => ({
    className: classNames(
      "relative overflow-hidden bg-sze-primary/10",
      props.shape === "circle" ? RADIUS.full : RADIUS.lg,
      props.animation !== "none" &&
        "after:absolute after:inset-0 after:content-[''] " +
          "after:bg-gradient-to-r after:from-transparent after:via-white/70 after:to-transparent " +
          "after:animate-shimmer"
    ),
  }),
};
