/**
 * SZE Breadcrumb - Egyedi Breadcrumb komponens
 * 
 * Ez egy szoktatott Breadcrumb komponens az SZE-specifikus stílusokkal és Tailwind stílusokkal.
 * Hierarchikus navigációs útvonalat jelenít meg.
 * 
 * @param {Array} items - Az útvonal elemeket tartalmazó tömb. Minden elem:
 *   - label: string (az elem szövege)
 *   - command?: () => void (kattintás callback)
 *   - icon?: string (ikon class, pl. "pi pi-home")
 * @param {string} className - További CSS osztályok a breadcrumb-hez
 */
export default function Breadcrumb({ items = [], className }) {
  return (
    <nav className={`flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-sze-primary-100 shadow-sm ${className || ""}`}>
      <ul className="flex items-center gap-2 w-full">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-sze-primary-300 mx-1">/</span>}
            <button
              onClick={item.command}
              disabled={!item.command}
              className="flex items-center gap-2 text-sze-primary font-medium text-sm hover:text-sze-secondary transition-colors duration-200 disabled:text-gray-500 disabled:cursor-default disabled:hover:text-gray-500 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sze-secondary"
            >
              {item.icon && <i className={item.icon}></i>}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
