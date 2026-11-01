import React from "react";
import { classNames } from "primereact/utils";
import { Button } from "./Button";
import { Divider } from "./Divider";

/** A menük közös komponensei - a leírást lásd: menuUtils.js. */

/**
 * Menüpont egy panelen: teljes szélességű, balra igazított (align="left") SZE Button.
 */
export const MenuItemButton = React.forwardRef(function MenuItemButton(
  { item, trailingIcon, className, ...rest },
  ref
) {
  return (
    <Button
      ref={ref}
      type="button"
      variant="text"
      radius="xl"
      fullWidth
      align="left"
      icon={item.icon}
      label={item.label}
      disabled={item.disabled}
      className={classNames("whitespace-nowrap", className)}
      {...rest}
    >
      {trailingIcon && <i aria-hidden="true" className={`${trailingIcon} ml-auto pl-3 text-xs`} />}
    </Button>
  );
});

/** Menüsor-gomb (felső szint): pill alakú text Button, opcionális lenyíló nyíllal. */
export function MenuBarButton({ item, open, hasPanel, ...rest }) {
  return (
    <Button
      type="button"
      variant="text"
      icon={item.icon}
      label={item.label}
      disabled={item.disabled}
      className="whitespace-nowrap"
      aria-expanded={hasPanel ? open : undefined}
      aria-haspopup={hasPanel ? "true" : undefined}
      {...rest}
    >
      {hasPanel && (
        <i
          aria-hidden="true"
          className={classNames("pi pi-chevron-down text-xs transition-transform duration-200", open && "rotate-180")}
        />
      )}
    </Button>
  );
}

/** Elválasztó a paneleken: a SZE Divider, a panelhez illő kisebb margóval. */
export function MenuSeparator() {
  return (
    <li role="separator" className="list-none px-2">
      <Divider className="!my-1" />
    </li>
  );
}
