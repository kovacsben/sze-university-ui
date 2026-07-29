import React from 'react';
import { Menu as PrimeMenu } from 'primereact/menu';

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
  const buttonRef = React.useRef(null);

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

  const severityStyles = {
    primary: 'bg-sze-primary text-white hover:bg-sze-primary-700',
    secondary: 'bg-sze-secondary text-white hover:bg-sze-secondary-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    info: 'bg-blue-600 text-white hover:bg-blue-700',
  }[severity] || 'bg-sze-primary text-white hover:bg-sze-primary-700';

  return (
    <div className={`menu-wrapper ${className}`}>
      {popup ? (
        <>
          <button
            ref={buttonRef}
            onClick={(e) => menuRef.current?.toggle(e)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${severityStyles}`}
          >
            <i className={icon} />
            {label}
          </button>
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
