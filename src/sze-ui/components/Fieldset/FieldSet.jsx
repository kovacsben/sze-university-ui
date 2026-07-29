import React from "react";

/**
 * SZE FieldSet - Egyedi FieldSet komponens
 * 
 * Ez a komponens form mezők csoportosítására szolgál.
 * Fejlécet (legend) és tartalmakat (fieldset) tartalmazhat.
 * 
 * @param {string} legend - A fieldset fejléce
 * @param {JSX.Element|string} children - A fieldset tartalma
 * @param {boolean} collapsed - Összecsukható-e (alapértelmezett: false)
 * @param {boolean} toggleable - Váltható-e az összecsukott állapot
 * @param {string} className - További CSS osztályok
 * @param {string} legendClassName - A legend CSS osztályai
 */
export default function FieldSet({
  legend,
  children,
  collapsed = false,
  toggleable = false,
  className,
  legendClassName
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

  return (
    <fieldset
      className={`border border-sze-primary-200 rounded-lg overflow-hidden bg-white ${className || ""}`}
    >
      {/* Legend */}
      {legend && (
        <legend
          onClick={() => toggleable && setIsCollapsed(!isCollapsed)}
          className={`px-4 py-3 bg-gradient-to-r from-sze-primary-50 to-sze-primary-100 border-b border-sze-primary-200 text-sze-primary font-semibold ${
            toggleable ? "cursor-pointer hover:bg-sze-primary-100" : ""
          } transition-colors ${legendClassName || ""}`}
        >
          <div className="flex items-center justify-between">
            <span>{legend}</span>
            {toggleable && (
              <i
                className={`pi text-sm transition-transform ${
                  isCollapsed ? "pi-chevron-right" : "pi-chevron-down"
                }`}
              ></i>
            )}
          </div>
        </legend>
      )}

      {/* Content */}
      {!isCollapsed && <div className="p-4">{children}</div>}
    </fieldset>
  );
}
