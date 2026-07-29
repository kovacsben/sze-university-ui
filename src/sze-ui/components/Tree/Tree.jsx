import React from 'react';
import { Tree as PrimeTree } from 'primereact/tree';

const Tree = ({
  value = [],
  selectionMode = 'single',
  selectionKeys = null,
  onSelectionChange = null,
  expandedKeys = null,
  onToggle = null,
  className = '',
  style = {},
}) => {
  const handleSelectionChange = (event) => {
    if (onSelectionChange) {
      onSelectionChange(event.value);
    }
  };

  const handleToggle = (event) => {
    if (onToggle) {
      onToggle(event.value);
    }
  };

  return (
    <div className={`tree-wrapper ${className}`} style={style}>
      <PrimeTree
        value={value}
        selectionMode={selectionMode}
        selectionKeys={selectionKeys}
        onSelectionChange={handleSelectionChange}
        expandedKeys={expandedKeys}
        onToggle={handleToggle}
        className="bg-white border border-gray-200 rounded-lg p-4 text-sm"
      />
    </div>
  );
};

export default Tree;
