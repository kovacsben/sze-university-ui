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

  // A PrimeReact Panel KONTROLLÁLTTÁ válik, ha kap onToggle-t:
  //   collapsed = props.toggleable ? (props.onToggle ? props.collapsed : belsoAllapot) : false
  // Eddig mindig átadtunk egy handleToggle-t egy fix collapsed={false} mellé,
  // ezért a panel sosem tudott összecsukódni. Az onToggle-t csak akkor adjuk
  // át, ha a hívó tényleg kezeli az állapotot - egyébként a PrimeReact a saját
  // belső állapotát használja, és a nyitás/zárás magától működik.
  const controlled = typeof onToggle === 'function';

  return (
    <div className={`panel-wrapper ${className}`} style={style}>
      <PrimePanel
        header={header}
        toggleable={toggleable}
        // Kontrollálatlan esetben ez csak a kezdeti állapot.
        collapsed={collapsed}
        {...(controlled ? { onToggle: handleToggle } : {})}
        className="bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <div className="text-gray-700">
          {children || content}
        </div>
      </PrimePanel>
    </div>
  );
};

export default Panel;
