import React from 'react';

const Menubar = ({
  items = [],
  model = [],
  logo = null,
  className = '',
  onItemClick = null,
  logoText = 'SZE UI',
}) => {
  const [activeSubmenu, setActiveSubmenu] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    if (item.command) {
      item.command();
    }
    setActiveSubmenu(null);
  };

  const menuItems = items.length > 0 ? items : model;

  return (
    <div className={`w-full ${className}`}>
      {/* Menubar */}
      <nav className="bg-white border-b-2 border-sze-primary-200 shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            {logo ? (
              typeof logo === 'string' ? (
                <img src={logo} alt="Logo" className="h-8 w-8" />
              ) : (
                logo
              )
            ) : (
              <div className="h-8 w-8 rounded bg-gradient-to-br from-sze-primary to-sze-primary-700 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
            )}
            <span className="font-bold text-sze-primary text-lg hidden sm:inline">{logoText}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(index)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                {/* Menu Item Button */}
                <button
                  onClick={() => {
                    handleItemClick(item);
                    if (!item.items) {
                      setMobileOpen(false);
                    }
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-sze-primary hover:bg-sze-primary-50 rounded-lg transition-all duration-200 font-medium flex items-center gap-2 whitespace-nowrap"
                >
                  {item.icon && <i className={item.icon} />}
                  <span>{item.label}</span>
                  {item.items && item.items.length > 0 && (
                    <i className="pi pi-chevron-down text-xs group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </button>

                {/* Submenu Dropdown */}
                {item.items && item.items.length > 0 && (
                  <div
                    className={`absolute left-0 mt-0 bg-white border border-sze-primary-200 rounded-b-lg shadow-xl z-40 min-w-max overflow-hidden transition-all duration-200 ${
                      activeSubmenu === index
                        ? 'opacity-100 visible top-full'
                        : 'opacity-0 invisible -top-2 pointer-events-none'
                    }`}
                  >
                    {item.items.map((subitem, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => handleItemClick(subitem)}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:text-sze-primary hover:bg-sze-primary-50 transition-colors duration-200 border-b border-sze-primary-100 last:border-b-0 flex items-center gap-2"
                      >
                        {subitem.icon && <i className={subitem.icon} />}
                        <span>{subitem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-sze-primary-50 text-sze-primary"
          >
            <i className={`pi ${mobileOpen ? 'pi-times' : 'pi-bars'} text-xl`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-sze-primary-200 bg-gray-50">
            {menuItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => {
                    if (!item.items) {
                      handleItemClick(item);
                      setMobileOpen(false);
                    } else {
                      setActiveSubmenu(activeSubmenu === index ? null : index);
                    }
                  }}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-sze-primary-100 transition-colors duration-200 font-medium flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    {item.icon && <i className={item.icon} />}
                    {item.label}
                  </span>
                  {item.items && item.items.length > 0 && (
                    <i
                      className={`pi pi-chevron-down text-xs transition-transform duration-200 ${
                        activeSubmenu === index ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Mobile Submenu */}
                {item.items && item.items.length > 0 && activeSubmenu === index && (
                  <div className="bg-white border-l-4 border-sze-primary">
                    {item.items.map((subitem, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => {
                          handleItemClick(subitem);
                          setMobileOpen(false);
                        }}
                        className="w-full text-left px-6 py-2 text-gray-600 hover:text-sze-primary hover:bg-sze-primary-50 transition-colors duration-200 text-sm flex items-center gap-2"
                      >
                        {subitem.icon && <i className={subitem.icon} />}
                        {subitem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Menubar;
