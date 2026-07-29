import React from 'react';

const TieredMenu = ({
  items = [],
  className = '',
  style = {},
  onItemClick = null,
}) => {
  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    if (item.command) {
      item.command();
    }
  };

  const renderMenuItems = (menuItems) => {
    return (
      <ul className="list-none p-0 m-0 bg-white border border-gray-200 rounded-lg shadow-md">
        {menuItems.map((item, index) => (
          <li key={index} className="border-b border-gray-100 last:border-b-0">
            {item.separator ? (
              <div className="h-px bg-gray-200"></div>
            ) : (
              <div
                onClick={() => handleItemClick(item)}
                className="px-4 py-3 hover:bg-sze-primary-50 cursor-pointer transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {item.icon && <i className={`${item.icon} text-sze-primary`}></i>}
                  <span className="text-gray-700 font-medium">{item.label}</span>
                </div>
                {item.items && item.items.length > 0 && (
                  <i className="pi pi-chevron-right text-xs text-gray-400"></i>
                )}
              </div>
            )}
            {item.items && item.items.length > 0 && (
              <div className="pl-8 bg-gray-50">
                {renderMenuItems(item.items)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`tiered-menu-wrapper ${className}`} style={style}>
      {renderMenuItems(items)}
    </div>
  );
};

export default TieredMenu;
