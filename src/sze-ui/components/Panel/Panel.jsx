import React from 'react';
import { Panel as PrimePanel } from 'primereact/panel';

const Panel = ({
  header = 'Panel',
  content = '',
  children = null,
  toggleable = true,
  collapsed = false,
  onToggle = null,
  className = '',
  style = {},
  icon = 'pi pi-chevron-down',
}) => {
  const handleToggle = (e) => {
    if (onToggle) {
      onToggle(e);
    }
  };

  return (
    <div className={`panel-wrapper ${className}`} style={style}>
      <PrimePanel
        header={header}
        toggleable={toggleable}
        collapsed={collapsed}
        onToggle={handleToggle}
        className="bg-white border border-gray-200 rounded-lg shadow-sm"
        headerClassName="bg-sze-primary text-white font-semibold"
      >
        <div className="text-gray-700">
          {children || content}
        </div>
      </PrimePanel>
    </div>
  );
};

export default Panel;
