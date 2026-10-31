import { Tree as PrimeTree } from 'primereact/tree';

/**
 * SZE Tree - fa szerkezetű adatok megjelenítése.
 *
 * Az eseményobjektumot változatlanul adjuk tovább (`e.value`,
 * `e.originalEvent`, ...), ahogy a könyvtár többi komponense is teszi.
 * Korábban a wrapper `onToggle(event.value)`-t hívott, a hívó oldal viszont
 * `e.value`-ként olvasta ki belőle az értéket - így minden nyitás/zárás
 * `undefined`-ot állított be, és a fa egyáltalán nem volt kibontható.
 *
 * A megjelenést a globális `tree` PT adja (src/sze-ui/theme/pt/tree.js);
 * a korábban ide beégetett className ugyanazokat az osztályokat duplikálta.
 *
 * @param {string} selectionMode - kijelölési mód (default: "single")
 * @param {string} className - a burkoló elem extra osztályai
 */
export default function Tree({ selectionMode = 'single', className = '', ...props }) {
  return (
    <div className={`tree-wrapper ${className}`.trim()}>
      <PrimeTree selectionMode={selectionMode} {...props} />
    </div>
  );
}
