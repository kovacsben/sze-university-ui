import { RADIUS, SHADOW, DURATION } from "../../theme/tokens";

/**
 * SZE Card - Egyedi Card komponens
 *
 * Tipográfiai hierarchia (a korábbi változatban a cím, az alcím és a szöveg
 * mérete alig tért el, így minden egybefolyt):
 *   - eyebrow: kis, nagybetűs, ritkított, SZE-világoskék felső címke
 *   - title:   nagy (text-xl), félkövér, sötét SZE-kék
 *   - subtitle: közepes, szürke, a cím alatt
 *   - tartalom: kisebb, laza sorközű, szürkébb szövegszín
 * A fejléc nem külön színes sáv, hanem a kártya része; a tartalomtól csak
 * térköz választja el, a lábléc viszont halvány háttérrel különül el.
 *
 * @param {JSX.Element|string} children - A card tartalma
 * @param {string} eyebrow - Rövid felső címke a cím fölött (pl. kategória)
 * @param {string} title - A card címe
 * @param {string} subtitle - A card alcíme
 * @param {JSX.Element} header - Saját fejléc elem (a title/subtitle helyett)
 * @param {JSX.Element} footer - Saját lábléc elem
 * @param {string} radius - Lekerekítés token kulcs (none/sm/md/lg/xl/2xl/3xl/full), alapértelmezett: 2xl
 * @param {string} shadow - Árnyék token kulcs (sm/base/md/lg/xl/2xl), alapértelmezett: md
 * @param {string} className - További CSS osztályok a card-hoz
 */
export default function Card({
  children,
  eyebrow,
  title,
  subtitle,
  header,
  footer,
  radius,
  shadow,
  className
}) {
  const radiusCls = RADIUS[radius] ?? RADIUS["2xl"];
  const shadowCls = SHADOW[shadow] ?? SHADOW.md;
  const hasHeader = header || title || eyebrow || subtitle;

  return (
    <div
      className={`flex flex-col bg-white ${radiusCls} border border-black/10 ${shadowCls} hover:shadow-lg transition-shadow ${DURATION.normal} overflow-hidden ${className || ""}`}
    >
      {/* HEADER */}
      {hasHeader && (
        <div className="px-6 pt-6">
          {header ? (
            header
          ) : (
            <>
              {eyebrow && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sze-secondary-600">
                  {eyebrow}
                </p>
              )}
              {title && <h3 className="text-xl font-bold leading-tight tracking-tight text-sze-primary">{title}</h3>}
              {subtitle && <p className="mt-1.5 text-sm font-medium text-gray-500">{subtitle}</p>}
            </>
          )}
        </div>
      )}

      {/* BODY - flex-1: egy rácsban az eltérő tartalmú kártyák láblécei egy vonalba kerülnek */}
      <div className={`flex-1 px-6 pb-6 text-sm leading-relaxed text-gray-600 ${hasHeader ? "pt-4" : "pt-6"}`}>
        {children}
      </div>

      {/* FOOTER */}
      {footer && (
        <div className="border-t border-black/5 bg-gray-50/80 px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
}
