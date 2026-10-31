import React from 'react';
import { Menu as PrimeMenu } from 'primereact/menu';
import { Button } from '../Button';

const Menu = ({
  items = [],
  model = [],
  popup = false,
  className = '',
  onItemClick = null,
  icon = 'pi pi-bars',
  label = 'Menü',
  severity = 'primary',
}) => {
  const menuRef = React.useRef(null);

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    if (item.command) {
      item.command();
    }
  };

  const menuItems = items.length > 0 ? items : model;

  const enrichedItems = menuItems.map((item) => ({
    ...item,
    command: () => handleItemClick(item),
  }));

  // A nyitógomb az alap Button komponens, hogy ugyanúgy nézzen ki, mint a
  // felület összes többi gombja. A Button severity-szókészletében a
  // "primary" az alapértelmezett (nincs külön neve), "info" pedig nincs -
  // mindkettő a sima primary gombot jelenti.
  const buttonSeverity =
    severity === 'primary' || severity === 'info' ? undefined : severity;

  return (
    <div className={`menu-wrapper ${className}`}>
      {popup ? (
        <>
          <Button
            icon={icon}
            label={label}
            severity={buttonSeverity}
            onClick={(e) => menuRef.current?.toggle(e)}
          />
          <PrimeMenu
            ref={menuRef}
            popup
            model={enrichedItems}
            className="w-56"
          />
        </>
      ) : (
        <PrimeMenu
          model={enrichedItems}
          className={`w-full ${className}`}
        />
      )}
    </div>
  );
};

export default Menu;
