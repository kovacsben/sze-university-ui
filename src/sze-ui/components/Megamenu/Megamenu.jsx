import React from "react";
import { classNames } from "primereact/utils";
import { MenuBarButton, MenuItemButton, MenuSeparator } from "../MenuParts";
import { MENU_BAR, MENU_PANEL, MENU_HEADING, runItem, useDismiss } from "../menuUtils";

/**
 * SZE Megamenu - többoszlopos lenyíló menü
 *
 * A menüsor a Menubar-ral azonos sáv, a felső szintű pontok és az oszlopok
 * elemei SZE Button-ök (text variáns), az elválasztó SZE Divider - lásd
 * ../menuUtils.js.
 *
 * Model (a PrimeReact MegaMenu-höz hasonló, egy szinttel egyszerűbb):
 *   [{ label, icon, command?, items?: [            // felső szint
 *       { label, items: [{ label, icon, command }] } // oszlop + elemei
 *   ] }]
 * Az oszlopelemek között `{ separator: true }` is állhat.
 *
 * Megnyitás kattintásra (billentyűzettel is elérhető). Ha már nyitva van egy
 * panel, a többi felső pont fölé víve az egeret a panel átvált - ahogy az
 * asztali menüsorok működnek. Kívülre kattintás vagy Esc bezárja.
 *
 * @param {Array}    model / items - a menü (az `items` a régi név, elsőbbséget élvez)
 * @param {Function} onItemClick   - onItemClick(item) minden kiválasztott pontra
 */
const Megamenu = ({ model = [], items = [], className = "", onItemClick = null }) => {
  const [active, setActive] = React.useState(null);
  const rootRef = React.useRef(null);
  const uid = React.useId();

  const menuItems = items.length > 0 ? items : model;
  const close = () => setActive(null);
  useDismiss(rootRef, active !== null, close);

  const select = (item, e) => {
    runItem(item, e, onItemClick);
    close();
  };

  const activeItem = active !== null ? menuItems[active] : null;

  return (
    <nav ref={rootRef} className={classNames("relative w-full", className)}>
      <ul className={classNames(MENU_BAR, "list-none m-0 flex-wrap")}>
        {menuItems.map((item, i) => {
          const hasPanel = item.items?.length > 0;
          return (
            <li key={item.label ?? i}>
              <MenuBarButton
                item={item}
                hasPanel={hasPanel}
                open={active === i}
                aria-controls={hasPanel && active === i ? `${uid}-panel` : undefined}
                onMouseEnter={() => active !== null && setActive(hasPanel ? i : null)}
                onClick={(e) => (hasPanel ? setActive(active === i ? null : i) : select(item, e))}
              />
            </li>
          );
        })}
      </ul>

      {/* A panel a teljes sáv alatt nyílik, az oszlopok kitöltik a szélességét. */}
      {activeItem && (
        <div
          id={`${uid}-panel`}
          className={classNames(
            MENU_PANEL,
            "absolute left-0 right-0 top-full mt-2 p-3",
            "grid gap-2 grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]"
          )}
        >
          {activeItem.items.map((column, c) => (
            <section key={column.label ?? c} aria-labelledby={column.label ? `${uid}-col-${c}` : undefined}>
              {column.label && (
                <h4 id={`${uid}-col-${c}`} className={MENU_HEADING}>
                  {column.label}
                </h4>
              )}
              <ul className="list-none m-0 p-0 flex flex-col gap-0.5">
                {(column.items || []).map((entry, j) =>
                  entry.separator ? (
                    <MenuSeparator key={`sep-${j}`} />
                  ) : (
                    <li key={entry.label ?? j}>
                      {/* Az oszlopok keskenyek, a hosszú (pl. karnevek) feliratok törhetnek. */}
                      <MenuItemButton
                        item={entry}
                        className="!whitespace-normal !h-auto min-h-10 py-2"
                        onClick={(e) => select(entry, e)}
                      />
                    </li>
                  )
                )}
              </ul>
            </section>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Megamenu;
