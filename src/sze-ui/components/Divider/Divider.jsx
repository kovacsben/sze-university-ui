/**
 * SZE Divider - Egyedi Divider komponens
 * 
 * Ez a komponens tartalom szétválasztására szolgál.
 * Támogatja különböző stílusokat, irányokat és tartalmakat.
 * 
 * @param {string} layout - "horizontal" | "vertical" - alapértelmezett: "horizontal"
 * @param {string} type - "solid" | "dashed" | "dotted" - alapértelmezett: "solid"
 * @param {string} align - "left" | "center" | "right" - alapértelmezett: "center" (csak horizontal)
 * @param {JSX.Element|string} children - Tartalom középen
 * @param {string} className - További CSS osztályok
 */
export default function Divider({
  layout = "horizontal",
  type = "solid",
  align = "center",
  children,
  className
}) {
  // Típus style-ok
  const getTypeClasses = () => {
    const types = {
      solid: "border-solid",
      dashed: "border-dashed",
      dotted: "border-dotted"
    };
    return types[type] || types.solid;
  };

  // Horizontal divider
  if (layout === "horizontal") {
    return (
      <div className={`flex items-center my-4 ${className || ""}`}>
        {align !== "left" && (
          <div className={`flex-1 border-t-2 border-sze-primary-200 ${getTypeClasses()}`}></div>
        )}
        
        {children && (
          <div className="px-3 text-sm font-medium text-sze-primary-600">
            {children}
          </div>
        )}
        
        {align !== "right" && (
          <div className={`flex-1 border-t-2 border-sze-primary-200 ${getTypeClasses()}`}></div>
        )}
      </div>
    );
  }

  // Vertical divider
  if (layout === "vertical") {
    return (
      <div className={`inline-block border-l-2 border-sze-primary-200 h-8 mx-2 ${getTypeClasses()} ${className || ""}`}></div>
    );
  }

  return null;
}
