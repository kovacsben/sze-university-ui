import React from 'react';
import { TabMenu as PrimeTabMenu } from 'primereact/tabmenu';

const TabMenu = ({
  items = [],
  activeIndex = 0,
  onTabChange = null,
  model = [],
  className = '',
  style = {},
}) => {
  const handleTabChange = (event) => {
    if (onTabChange) {
      onTabChange(event);
    }
  };

  const menuItems = items.length > 0 ? items : model;

  return (
    <div className={`tab-menu-wrapper ${className}`} style={style}>
      <PrimeTabMenu
        model={menuItems}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default TabMenu;
