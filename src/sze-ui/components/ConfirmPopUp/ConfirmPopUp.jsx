/**
 * SZE ConfirmPopUp - Egyedi ConfirmPopUp komponens
 * 
 * Ez a komponens egy kisebb, kevésbé intenzív megerősítésre kér.
 * Tipikusan gomb mellett jelenik meg tooltip-szerűen.
 * 
 * @param {boolean} visible - A popup látható-e
 * @param {string} message - A popup üzenete
 * @param {() => void} onConfirm - Callback az OK gomb kattintásakor
 * @param {() => void} onCancel - Callback a Mégse gomb kattintásakor
 * @param {string} confirmLabel - Az OK gomb szövege
 * @param {string} cancelLabel - A Mégse gomb szövege
 * @param {string} icon - Ikon class, pl. "pi pi-question"
 * @param {string} severity - Szín típus: "info" | "success" | "warning" | "danger"
 * @param {string} position - Pozíció: "top" | "bottom" | "left" | "right"
 */
export default function ConfirmPopUp({
  visible = false,
  message = "Megerősítés szükséges?",
  onConfirm,
  onCancel,
  confirmLabel = "Igen",
  cancelLabel = "Nem",
  icon = "pi pi-question",
  severity = "info",
  position = "bottom"
}) {
  // Ha nem látható, ne rendereljünk semmit
  if (!visible) return null;

  // Szín osztályok a severity alapján
  const getSeverityClasses = () => {
    const baseClasses = {
      info: "border-sze-primary-300 bg-sze-primary-50",
      success: "border-green-300 bg-green-50",
      warning: "border-yellow-300 bg-yellow-50",
      danger: "border-red-300 bg-red-300"
    };
    return baseClasses[severity] || baseClasses.info;
  };

  const getIconClasses = () => {
    const baseClasses = {
      info: "text-sze-primary",
      success: "text-green-600",
      warning: "text-yellow-600",
      danger: "text-red-600"
    };
    return baseClasses[severity] || baseClasses.info;
  };

  // Pozíció osztályok
  const getPositionClasses = () => {
    const positions = {
      top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
      bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
      left: "right-full mr-2 top-1/2 -translate-y-1/2",
      right: "left-full ml-2 top-1/2 -translate-y-1/2"
    };
    return positions[position] || positions.bottom;
  };

  // Arrow pozíció
  const getArrowClasses = () => {
    const arrows = {
      top: "bottom-full mb-1 left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent",
      bottom: "top-full mt-1 left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent",
      left: "right-full mr-1 top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent",
      right: "left-full ml-1 top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent"
    };
    return arrows[position] || arrows.bottom;
  };

  // Arrow szín
  const getArrowColor = () => {
    const colors = {
      info: "border-sze-primary-50",
      success: "border-green-50",
      warning: "border-yellow-50",
      danger: "border-red-50"
    };
    return colors[severity] || colors.info;
  };

  return (
    <div className={`absolute ${getPositionClasses()} z-50 animate-fadeIn`}>
      {/* Arrow */}
      <div className={`absolute ${getArrowClasses()} ${getArrowColor()}`}></div>

      {/* Popup box */}
      <div className={`border rounded-lg shadow-lg p-3 w-80 ${getSeverityClasses()}`}>
        {/* Icon és üzenet */}
        <div className="flex items-start gap-2 mb-3">
          {icon && <i className={`${icon} text-xl ${getIconClasses()} flex-shrink-0 mt-0.5`}></i>}
          <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
        </div>

        {/* Gombok */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 rounded text-sm font-medium background-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-3 py-1.5 rounded text-sm font-medium text-white transition-colors ${
              severity === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : severity === "warning"
                ? "bg-yellow-600 hover:bg-yellow-700"
                : severity === "success"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-sze-primary hover:bg-sze-primary-900"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
