import React from "react";
import { classNames } from "primereact/utils";
import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { MenuBarButton, MenuItemButton, MenuSeparator } from "../MenuParts";
import { MENU_BAR, MENU_PANEL, runItem, useDismiss } from "../menuUtils";

/**
 * SZE Menubar - alkalmazásfejléc menüsávval
 *
 * Alapkomponensekből épül (lásd ../menuUtils.js): a logó alapértelmezésben
 * SZE Avatar, a menüpontok és a mobil nyitógomb SZE Button-ök, az elválasztó
 * SZE Divider. A sáv és a lenyíló panelek a Megamenu-vel azonosak.
 *
 * Model: [{ label, icon, command?, items?: [{ label, icon, command } | { separator: true }] }]
 *
 * Asztali nézetben (lg felett) a pontok egy sorban, almenük kattintásra
 * nyílnak; ha már nyitva van egy, a többi fölé víve az egeret átvált.
 * Kisebb kijelzőn hamburgergomb nyitja a függőleges listát, az almenük
 * helyben bomlanak ki.
 *
 * @param {Array}    model / items - a menü (az `items` a régi név, elsőbbséget élvez)
 * @param {string|ReactNode} logo  - kép URL vagy saját elem; alapból Avatar a logoText kezdőbetűjével
 * @param {string}   logoText
 * @param {Function} onItemClick   - onItemClick(item) minden kiválasztott pontra
 */
const Menubar = ({ items = [], model = [], logo = null, logoText = "SZE UI", className = "", onItemClick = null }) => {
  const [active, setActive] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSub, setMobileSub] = React.useState(null);
  const rootRef = React.useRef(null);
  const uid = React.useId();

  const menuItems = items.length > 0 ? items : model;

  const closeAll = () => {
    setActive(null);
    setMobileOpen(false);
    setMobileSub(null);
  };
  useDismiss(rootRef, active !== null || mobileOpen, closeAll);

  const select = (item, e) => {
    runItem(item, e, onItemClick);
    closeAll();
  };

  const renderEntries = (entries) =>
    entries.map((entry, j) =>
      entry.separator ? (
        <MenuSeparator key={`sep-${j}`} />
      ) : (
        <li key={entry.label ?? j}>
          <MenuItemButton item={entry} onClick={(e) => select(entry, e)} />
        </li>
      )
    );

  const logoElement =
    typeof logo === "string" ? (
      <img src={logo} alt="" className="h-8 w-8 object-contain" />
    ) : (
      logo ?? <Avatar label={logoText.charAt(0)} shape="square" size="small" aria-hidden="true" />
    );

  return (
    <nav ref={rootRef} aria-label={logoText} className={classNames("relative w-full", className)}>
      <div className={classNames(MENU_BAR, "justify-between gap-3 pl-3")}>
        <div className="flex items-center gap-3">
          {logoElement}
          <span className="hidden sm:inline font-bold text-lg text-sze-primary">{logoText}</span>
        </div>

        {/* Asztali menü */}
        <ul className="hidden lg:flex list-none m-0 p-0 items-center gap-1">
          {menuItems.map((item, i) => {
            const hasPanel = item.items?.length > 0;
            const open = active === i;
            return (
              <li key={item.label ?? i} className="relative">
                <MenuBarButton
                  item={item}
                  hasPanel={hasPanel}
                  open={open}
                  aria-controls={hasPanel && open ? `${uid}-sub-${i}` : undefined}
                  onMouseEnter={() => active !== null && setActive(hasPanel ? i : null)}
                  onClick={(e) => (hasPanel ? setActive(open ? null : i) : select(item, e))}
                />
                {hasPanel && open && (
                  <ul
                    id={`${uid}-sub-${i}`}
                    className={classNames(MENU_PANEL, "absolute right-0 top-full mt-2 min-w-56 list-none m-0 flex flex-col gap-0.5")}
                  >
                    {renderEntries(item.items)}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobil nyitógomb */}
        <Button
          type="button"
          variant="text"
          radius="full"
          icon={mobileOpen ? "pi pi-times" : "pi pi-bars"}
          aria-label={mobileOpen ? "Menü bezárása" : "Menü megnyitása"}
          aria-expanded={mobileOpen}
          aria-controls={`${uid}-mobile`}
          className="lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
        />
      </div>

      {/* Mobil menü: függőleges lista, helyben kibomló almenükkel */}
      {mobileOpen && (
        <ul id={`${uid}-mobile`} className={classNames(MENU_PANEL, "lg:hidden mt-2 list-none flex flex-col gap-0.5")}>
          {menuItems.map((item, i) => {
            const hasPanel = item.items?.length > 0;
            const open = mobileSub === i;
            return (
              <li key={item.label ?? i}>
                <MenuItemButton
                  item={item}
                  trailingIcon={hasPanel ? classNames("pi pi-chevron-down transition-transform", open && "rotate-180") : null}
                  aria-expanded={hasPanel ? open : undefined}
                  aria-controls={hasPanel && open ? `${uid}-msub-${i}` : undefined}
                  onClick={(e) => (hasPanel ? setMobileSub(open ? null : i) : select(item, e))}
                />
                {hasPanel && open && (
                  <ul id={`${uid}-msub-${i}`} className="list-none m-0 ml-4 pl-2 border-l border-gray-200 flex flex-col gap-0.5">
                    {renderEntries(item.items)}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default Menubar;
