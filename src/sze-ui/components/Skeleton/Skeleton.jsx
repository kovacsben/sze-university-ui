import React from 'react';
import { Skeleton as PrimeSkeleton } from 'primereact/skeleton';

/**
 * SZE Skeleton - betöltés közbeni helyőrző
 *
 * A megjelenés és az átfutó fény a PT-ből jön (theme/pt/skeleton.js).
 *
 * @param {number} count  - ennyi helyőrző egymás alatt
 * @param {string} width, height - CSS méret (a PrimeReact inline stílusként adja)
 * @param {"rectangle"|"circle"} shape
 * @param {string} size   - kör vagy négyzet esetén a szélesség és a magasság egyben
 * @param {string} borderRadius - egyedi lekerekítés (felülírja a PT-ét)
 * @param {"wave"|"none"} animation
 */
const Skeleton = ({
  count = 1,
  width = '100%',
  height = '1rem',
  shape = 'rectangle',
  size = null,
  borderRadius = null,
  animation = 'wave',
  className = '',
  style = {},
}) => {
  const item = (key) => (
    <PrimeSkeleton
      key={key}
      width={width}
      height={height}
      shape={shape}
      size={size ?? undefined}
      borderRadius={borderRadius ?? undefined}
      animation={animation}
    />
  );

  if (count === 1) {
    return (
      <div className={className} style={style}>
        {item(0)}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`} style={style}>
      {Array.from({ length: count }, (_, i) => item(i))}
    </div>
  );
};

export default Skeleton;
