import React from 'react';

const Megamenu = ({
  model = [],
  items = [],
  orientation = 'horizontal',
  className = '',
  onItemClick = null,
}) => {
  const [activeSubmenu, setActiveSubmenu] = React.useState(null);

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    if (item.command) {
      item.command();
    }
  };

  const menuItems = items.length > 0 ? items : model;

  return (
    <div className={`w-full ${className}`}>
      {/* Main Menu Bar */}
      <div className="flex items-center bg-gradient-to-r from-sze-primary to-sze-primary-700 text-white shadow-lg rounded-lg overflow-hidden">
        {menuItems.map((mainItem, index) => (
          <div
            key={index}
            className="relative group flex-1"
            onMouseEnter={() => setActiveSubmenu(index)}
            onMouseLeave={() => setActiveSubmenu(null)}
          >
            {/* Main Menu Item */}
            <button
              onClick={() => mainItem.command && handleItemClick(mainItem)}
              className="w-full px-4 py-3 flex items-center gap-2 hover:bg-sze-primary-600 transition-colors duration-200 font-medium text-sm"
            >
              {mainItem.icon && <i className={mainItem.icon} />}
              <span>{mainItem.label}</span>
              {mainItem.items && mainItem.items.length > 0 && (
                <i className="pi pi-chevron-down ml-auto text-xs group-hover:rotate-180 transition-transform duration-200" />
              )}
            </button>

            {/* Submenu */}
            {mainItem.items && mainItem.items.length > 0 && (
              <div
                className={`absolute left-0 top-full bg-white text-gray-700 shadow-xl rounded-b-lg overflow-hidden transition-all duration-200 z-20 ${
                  activeSubmenu === index
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible pointer-events-none'
                }`}
                style={{
                  minWidth: `${mainItem.items.length * 250}px`,
                }}
              >
                <div className="grid" style={{ gridTemplateColumns: `repeat(${mainItem.items.length}, 1fr)` }}>
                  {mainItem.items.map((subCategory, subIndex) => (
                    <div
                      key={subIndex}
                      className="p-4 border-r border-gray-200 last:border-r-0 hover:bg-sze-primary-50 transition-colors duration-200"
                    >
                      {/* Subcategory Header */}
                      {subCategory.label && (
                        <h4 className="font-semibold text-sze-primary text-sm mb-3 uppercase tracking-wide">
                          {subCategory.label}
                        </h4>
                      )}

                      {/* Subcategory Items */}
                      {subCategory.items && subCategory.items.length > 0 && (
                        <ul className="space-y-2">
                          {subCategory.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <button
                                onClick={() => handleItemClick(item)}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-sze-primary hover:bg-gray-100 rounded transition-colors duration-200 flex items-center gap-2"
                              >
                                {item.icon && <i className={item.icon} />}
                                <span>{item.label}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Megamenu;
