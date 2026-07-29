import React from 'react';
import { Button } from '../Button';

const Toolbar = ({
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

  return (
    <div
      className={`toolbar-wrapper flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}
      style={style}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.separator ? (
            <div className="h-6 border-l border-gray-300 mx-2"></div>
          ) : (
            <Button
              onClick={() => handleItemClick(item)}
              severity={item.severity}
              icon={item.icon}
              label={item.label}
              title={item.title}
              size="small"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Toolbar;
