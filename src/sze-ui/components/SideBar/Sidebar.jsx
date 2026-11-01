import React from 'react';
import { Sidebar as PrimeSidebar } from 'primereact/sidebar';

/**
 * SZE Sidebar - oldalról beúszó panel
 *
 * A beúszás, a háttér-sötétítés és a SZE-kék fejlécsáv a PT-ből jön
 * (theme/pt/sidebar.js). A komponens a fejléc tartalmát (cím + alcím) és a
 * panel aljára rögzített láblécet rakja össze.
 *
 * @param {boolean}  visible
 * @param {Function} onHide
 * @param {"left"|"right"|"top"|"bottom"} position
 * @param {string}    title    - cím a fejlécsávban
 * @param {string}    subtitle - kisebb szöveg a cím alatt
 * @param {ReactNode} header   - saját fejléc-tartalom (a title/subtitle helyett)
 * @param {ReactNode} footer   - a panel aljára rögzített rész (pl. kijelentkezés gomb)
 * @param {boolean}   modal    - sötétített háttér, amire kattintva bezár
 */
const Sidebar = ({
  visible = false,
  onHide = null,
  children = null,
  content = '',
  position = 'left',
  title = null,
  subtitle = null,
  header = null,
  footer = null,
  baseZIndex = 1000,
  modal = true,
  blockScroll = true,
  className = '',
  style = {},
}) => {
  const headerContent =
    header ??
    (title || subtitle ? (
      <div className="min-w-0">
        {/* text-white kifejezetten: az index.css h1–h6 alapstílusa felülírná az örökölt színt */}
        {title && <h2 className="truncate text-lg font-bold leading-tight text-white">{title}</h2>}
        {subtitle && <p className="mt-0.5 text-sm text-white/70">{subtitle}</p>}
      </div>
    ) : (
      // A fejlécsáv cím nélkül is megmarad (benne a bezáró gomb); a flex-1
      // tartja jobbra a gombot.
      <span className="flex-1" />
    ));

  return (
    <PrimeSidebar
      visible={visible}
      onHide={() => onHide?.()}
      position={position}
      header={headerContent}
      blockScroll={blockScroll}
      modal={modal}
      dismissable
      baseZIndex={baseZIndex}
      className={className}
      style={style}
    >
      <div className="flex-1 px-6 py-5 text-gray-700">{children || content}</div>
      {footer && <div className="border-t border-black/5 bg-gray-50/80 px-6 py-4">{footer}</div>}
    </PrimeSidebar>
  );
};

export default Sidebar;
