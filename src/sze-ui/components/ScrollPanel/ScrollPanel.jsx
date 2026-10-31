import React from 'react';
import { ScrollPanel as PrimeScrollPanel } from 'primereact/scrollpanel';

const ScrollPanel = ({
  children = null,
  content = '',
  className = '',
  style = {},
  height = '300px',
}) => {
  return (
    <div className={`scroll-panel-wrapper ${className}`} style={style}>
      <PrimeScrollPanel
        style={{ width: '100%', height }}
        className="bg-white border border-gray-200 rounded-lg"
      >
        {/* A belső térköz a PT `content` szekciójában van (theme/pt/scrollpanel.js),
            hogy a görgethető terület a panel teljes magasságát elfoglalja. */}
        <div className="text-gray-700">
          {children || content}
        </div>
      </PrimeScrollPanel>
    </div>
  );
};

export default ScrollPanel;
