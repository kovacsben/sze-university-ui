import { RADIUS } from "../../theme/tokens";

/**
 * SZE Chip - Egyedi Chip komponens
 *
 * Ez a komponens kis taggek, kategóriák vagy státuszok megjelenítésére szolgál.
 * Eltávolítható (closable) verzióban is elérhető.
 *
 * @param {string} label - A chip szövege
 * @param {string} icon - Ikon class, pl. "pi pi-user"
 * @param {JSX.Element} avatar - Avatar elem a chip-ben
 * @param {boolean} closable - Ha true, eltávolítható lesz a chip
 * @param {() => void} onClose - Callback az eltávolításkor
 * @param {string} severity - Szín típus: "primary" | "secondary" | "success" | "warning" | "danger"
 * @param {string} radius - Lekerekítés token kulcs (none/sm/md/lg/xl/2xl/3xl/full), alapértelmezett: full
 * @param {string} className - További CSS osztályok
 */
export default function Chip({
  label,
  icon,
  avatar,
  closable = false,
  onClose,
  severity = "primary",
  radius,
  className
}) {
  const radiusCls = RADIUS[radius] ?? RADIUS.full;
  // Szín osztályok a severity alapján
  const getSeverityClasses = () => {
    const baseClasses = {
      primary: "bg-sze-primary-100 text-sze-primary border-sze-primary-200",
      secondary: "bg-sze-secondary-100 text-sze-secondary border-sze-secondary-200",
      success: "bg-green-100 text-green-700 border-green-200",
      warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
      danger: "bg-red-100 text-red-700 border-red-200"
    };
    return baseClasses[severity] || baseClasses.primary;
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${radiusCls} border font-medium text-sm ${getSeverityClasses()} ${className || ""}`}>
      {/* Avatar vagy Ikon */}
      {avatar && <span className="flex-shrink-0">{avatar}</span>}
      {icon && !avatar && <i className={`${icon} text-xs`}></i>}

      {/* Szöveg */}
      <span className="leading-none">{label}</span>

      {/* Close gomb */}
      {closable && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-1 w-4 h-4 rounded-full hover:bg-black/10 transition-colors flex items-center justify-center"
          aria-label="Eltávolítás"
        >
          <i className="pi pi-times text-xs"></i>
        </button>
      )}
    </div>
  );
}
