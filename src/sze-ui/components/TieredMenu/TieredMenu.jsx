import React from "react";
import { classNames } from "primereact/utils";
import { MenuItemButton, MenuSeparator } from "../MenuParts";
import { MENU_PANEL, runItem, useDismiss } from "../menuUtils";

/**
 * SZE TieredMenu - többszintű, oldalra nyíló menü
 *
 * Minden szint egy panel (a Dropdown panelével azonos felület), a pontok
 * SZE Button-ök (text variáns), az elválasztó SZE Divider - lásd
 * ../menuUtils.js. Tetszőleges mélységű `items` fát kezel.
 *
 * Almenü nyitása: egérrel fölé víve, kattintással vagy a → billentyűvel
 * (ilyenkor a fókusz az almenü első pontjára ugrik). ← vagy Esc egy szintet
 * zár, és visszaadja a fókuszt a szülő pontnak; kívülre kattintás mindent bezár.
 *
 * Model: [{ label, icon, command?, disabled?, items?: [...] } | { separator: true }]
 *
 * @param {Function} onItemClick - onItemClick(item) minden kiválasztott levélpontra
 */

/** Egy szint. A gyökérszint nyitott indexét a TieredMenu tartja, a mélyebbekét saját maguk. */
function TieredList({ items, onSelect, onCloseLevel, openIndex, onOpenChange, autoFocus, id }) {
  const [ownOpen, setOwnOpen] = React.useState(null);
  const open = onOpenChange ? openIndex : ownOpen;
  const setOpen = onOpenChange ?? setOwnOpen;

  // Billentyűzettel nyitott almenünél az első pontra kerül a fókusz.
  const [focusChild, setFocusChild] = React.useState(false);
  const listRef = React.useRef(null);
  const buttons = React.useRef([]);

  React.useEffect(() => {
    if (autoFocus) listRef.current?.querySelector("button:not([disabled])")?.focus();
  }, [autoFocus]);

  return (
    <ul
      ref={listRef}
      id={id}
      className={classNames(MENU_PANEL, "w-56 list-none m-0 flex flex-col gap-0.5")}
      onKeyDown={(e) => {
        if (onCloseLevel && (e.key === "ArrowLeft" || e.key === "Escape")) {
          e.preventDefault();
          e.stopPropagation();
          onCloseLevel();
        }
      }}
    >
      {items.map((item, i) => {
        if (item.separator) return <MenuSeparator key={`sep-${i}`} />;

        const hasChildren = item.items?.length > 0;
        const isOpen = open === i;
        const childId = `${id}-${i}`;

        return (
          <li
            key={item.label ?? i}
            className="relative"
            onMouseEnter={() => {
              setFocusChild(false);
              setOpen(hasChildren ? i : null);
            }}
          >
            <MenuItemButton
              ref={(el) => (buttons.current[i] = el)}
              item={item}
              trailingIcon={hasChildren ? "pi pi-chevron-right" : null}
              aria-haspopup={hasChildren ? "true" : undefined}
              aria-expanded={hasChildren ? isOpen : undefined}
              aria-controls={hasChildren && isOpen ? childId : undefined}
              onClick={(e) => {
                if (!hasChildren) return onSelect(item, e);
                // e.detail === 0: billentyűzetről (Enter/Space) érkezett kattintás
                setFocusChild(e.detail === 0);
                setOpen(i);
              }}
              onKeyDown={(e) => {
                if (hasChildren && e.key === "ArrowRight") {
                  e.preventDefault();
                  setFocusChild(true);
                  setOpen(i);
                }
              }}
            />

            {hasChildren && isOpen && (
              // -mt-1.5: a panel belső térközét kiegyenlítve az almenü első pontja
              // a szülő ponttal egy vonalba kerül; pl-1: hézag, ami nem szakítja meg a hovert.
              <div className="absolute left-full top-0 -mt-1.5 pl-1 z-10">
                <TieredList
                  id={childId}
                  items={item.items}
                  onSelect={onSelect}
                  autoFocus={focusChild}
                  onCloseLevel={() => {
                    setOpen(null);
                    buttons.current[i]?.focus();
                  }}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const TieredMenu = ({ items = [], model = [], className = "", style = {}, onItemClick = null }) => {
  const [rootOpen, setRootOpen] = React.useState(null);
  const rootRef = React.useRef(null);
  const uid = React.useId();

  const menuItems = items.length > 0 ? items : model;
  const closeAll = () => setRootOpen(null);
  useDismiss(rootRef, rootOpen !== null, closeAll);

  const select = (item, e) => {
    runItem(item, e, onItemClick);
    closeAll();
  };

  return (
    <nav ref={rootRef} className={classNames("relative inline-block", className)} style={style}>
      <TieredList id={uid} items={menuItems} onSelect={select} openIndex={rootOpen} onOpenChange={setRootOpen} />
    </nav>
  );
};

export default TieredMenu;
