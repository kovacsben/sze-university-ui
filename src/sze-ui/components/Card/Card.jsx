import { RADIUS, SHADOW, DURATION } from "../../theme/tokens";

/**
 * SZE Card - Egyedi Card komponens
 *
 * Ez a komponens tartalom megjelenítésére szolgál SZE-specifikus stílusokkal.
 * Támogatja a header, footer, és custom className-eket.
 *
 * @param {JSX.Element|string} children - A card tartalma
 * @param {string} title - A card fejléce
 * @param {string} subtitle - A card alcíme
 * @param {JSX.Element} header - Custom header elem
 * @param {JSX.Element} footer - Custom footer elem
 * @param {string} radius - Lekerekítés token kulcs (none/sm/md/lg/xl/2xl/3xl/full), alapértelmezett: 2xl
 * @param {string} shadow - Árnyék token kulcs (sm/base/md/lg/xl/2xl), alapértelmezett: md
 * @param {string} className - További CSS osztályok a card-hoz
 */
export default function Card({
  children,
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

  return (
    <div className={`bg-white ${radiusCls} border border-sze-primary-100 ${shadowCls} hover:shadow-lg transition-shadow ${DURATION.normal} overflow-hidden ${className || ""}`}>
      {/* HEADER */}
      {(header || title) && (
        <div className="border-b border-sze-primary-100 px-6 py-4 bg-gradient-to-r from-sze-primary-50 to-sze-primary-100">
          {header ? (
            header
          ) : (
            <>
              {title && <h3 className="font-semibold text-lg text-sze-primary mb-1">{title}</h3>}
              {subtitle && <p className="text-sm text-sze-primary-600">{subtitle}</p>}
            </>
          )}
        </div>
      )}

      {/* BODY */}
      <div className="px-6 py-4">
        {children}
      </div>

      {/* FOOTER */}
      {footer && (
        <div className="border-t border-sze-primary-100 px-6 py-4 bg-sze-primary-50">
          {footer}
        </div>
      )}
    </div>
  );
}
