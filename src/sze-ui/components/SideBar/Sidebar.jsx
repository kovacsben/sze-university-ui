import React from 'react';
import { Sidebar as PrimeSidebar } from 'primereact/sidebar';

const Sidebar = ({
  visible = false,
  onHide = null,
  children = null,
  content = '',
  position = 'left',
  baseZIndex = 1000,
  modal = true,
  blockScroll = true,
  className = '',
  style = {},
}) => {
  const handleHide = () => {
    if (onHide) {
      onHide();
    }
  };

  return (
    <div className={`sidebar-wrapper ${className}`} style={style}>
      <PrimeSidebar
        visible={visible}
        onHide={handleHide}
        position={position}
        blockScroll={blockScroll}
        modal={modal}
        baseZIndex={baseZIndex}
        className="bg-sze-primary-50"
      >
        <div className="text-gray-700">
          {children || content}
        </div>
      </PrimeSidebar>
    </div>
  );
};

export default Sidebar;
