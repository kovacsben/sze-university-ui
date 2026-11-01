import React from 'react';
import { ScrollPanel as PrimeScrollPanel } from 'primereact/scrollpanel';

/**
 * SZE ScrollPanel - görgethető panel saját görgetősávval
 *
 * A görgetősáv (SZE-kék, csak hoverre jelenik meg) a PT-ből jön
 * (theme/pt/scrollpanel.js). A belső térköz itt, a tartalom burkolóján van:
 * a PrimeReact content elemének jobb és alsó belső margója a natív sáv
 * elrejtésére kell, azt nem szabad felülírni.
 *
 * @param {string} height - a panel magassága (CSS érték), alapértelmezés: 300px
 */
const ScrollPanel = ({
  children = null,
  content = '',
  className = '',
  style = {},
  height = '300px',
}) => {
  return (
    <PrimeScrollPanel style={{ width: '100%', height, ...style }} className={className}>
      <div className="p-4 text-gray-700">{children || content}</div>
    </PrimeScrollPanel>
  );
};

export default ScrollPanel;
