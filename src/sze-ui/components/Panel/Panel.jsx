import React from 'react';
import { Panel as PrimePanel } from 'primereact/panel';

/**
 * SZE Panel - csukható tartalomdoboz fejléccel
 *
 * A teljes fejléc kattintható (a PT a kapcsológomb kattintási felületét
 * kiterjeszti a fejlécre, lásd theme/pt/panel.js), a nyitás/zárás jele egy
 * fel/le nyíl a PrimeReact +/- ikonja helyett.
 *
 * @param {string}    header    - fejléc szövege. Szöveg legyen: a PrimeReact ebből adja
 *                               a kapcsológomb aria-label-jét is.
 * @param {boolean}   toggleable - csukható-e (alapértelmezés: true)
 * @param {boolean}   collapsed - kezdeti (vagy kontrollált) csukott állapot
 * @param {Function}  onToggle  - ha megadod, a panel kontrollált lesz (lásd lent)
 */
const Panel = ({
  header = 'Panel',
  content = '',
  children = null,
  toggleable = true,
  collapsed = false,
  onToggle = null,
  footer = null,
  className = '',
  style = {},
}) => {
  // A PrimeReact Panel KONTROLLÁLTTÁ válik, ha kap onToggle-t:
  //   collapsed = props.toggleable ? (props.onToggle ? props.collapsed : belsoAllapot) : false
  // Az onToggle-t ezért csak akkor adjuk át, ha a hívó tényleg kezeli az
  // állapotot - egyébként a PrimeReact a saját belső állapotát használja.
  const controlled = typeof onToggle === 'function';

  return (
    <PrimePanel
      header={header}
      toggleable={toggleable}
      // Kontrollálatlan esetben ez csak a kezdeti állapot.
      collapsed={collapsed}
      {...(controlled ? { onToggle } : {})}
      expandIcon={<i className="pi pi-chevron-down text-xs" aria-hidden="true" />}
      collapseIcon={<i className="pi pi-chevron-up text-xs" aria-hidden="true" />}
      footer={footer}
      className={className}
      style={style}
    >
      {children || content}
    </PrimePanel>
  );
};

export default Panel;
