/**
 * SZE ConfirmDialog - Egyedi Confirm Dialog komponens
 * 
 * Ez a komponens megerősítésre kér a felhasználótól egy modális dialógusban.
 * Támogatja a custom üzenetet, címet és callback-eket.
 * 
 * @param {boolean} visible - A dialógus látható-e
 * @param {string} title - A dialógus fejléce
 * @param {string} message - A dialógus üzenete
 * @param {() => void} onConfirm - Callback az OK gomb kattintásakor
 * @param {() => void} onCancel - Callback a Mégse gomb kattintásakor
 * @param {string} confirmLabel - Az OK gomb szövege
 * @param {string} cancelLabel - A Mégse gomb szövege
 * @param {string} icon - Ikon class, pl. "pi pi-exclamation-triangle"
 * @param {string} severity - Szín típus: "info" | "success" | "warning" | "danger"
 */
export default function ConfirmDialog({
  visible = false,
  title = "Megerősítés szükséges",
  message = "Tényleg folytatni szeretnéd?",
  onConfirm,
  onCancel,
  confirmLabel = "Igen",
  cancelLabel = "Nem",
  icon = "pi pi-exclamation-triangle",
  severity = "warning"
}) {
  // Ha nem látható, ne rendereljünk semmit
  if (!visible) return null;

  // Szín osztályok a severity alapján
  const getSeverityClasses = () => {
    const baseClasses = {
      info: "text-sze-primary",
      success: "text-green-600",
      warning: "text-yellow-600",
      danger: "text-red-600"
    };
    return baseClasses[severity] || baseClasses.info;
  };

  const getHeaderClasses = () => {
    const baseClasses = {
      info: "bg-sze-primary-50 border-sze-primary-200",
      success: "bg-green-50 border-green-200",
      warning: "bg-yellow-50 border-yellow-200",
      danger: "bg-red-50 border-red-200"
    };
    return baseClasses[severity] || baseClasses.info;
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onCancel}
      />

      {/* DIALOG */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm overflow-hidden">
          {/* HEADER */}
          <div className={`border-b px-6 py-4 ${getHeaderClasses()}`}>
            <div className="flex items-center gap-3">
              {icon && <i className={`${icon} text-2xl ${getSeverityClasses()}`}></i>}
              <h3 className="font-semibold text-lg text-sze-primary">{title}</h3>
            </div>
          </div>

          {/* BODY */}
          <div className="px-6 py-6">
            <p className="text-gray-700 leading-relaxed">{message}</p>
          </div>

          {/* FOOTER */}
          <div className="border-t px-6 py-4 flex justify-end gap-2 bg-gray-50">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sze-secondary"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg font-medium text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sze-secondary ${
                severity === "danger"
                  ? "bg-red-600 hover:bg-red-700"
                  : severity === "warning"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-sze-primary hover:bg-sze-primary-900"
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
