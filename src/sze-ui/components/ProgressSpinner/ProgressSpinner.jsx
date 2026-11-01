import React from 'react';
import { ProgressSpinner as PrimeProgressSpinner } from 'primereact/progressspinner';

/**
 * SZE ProgressSpinner - betöltésjelző
 *
 * A megjelenést (szín, forgás, a körív animációja) a PT adja
 * (theme/pt/progressspinner.js); itt csak a méret és a felirat.
 *
 * @param {"sm"|"md"|"lg"} size - 32 / 48 / 64 px
 * @param {number}  strokeWidth - a vonal vastagsága (svg-egységben)
 * @param {boolean} showLabel   - felirat a spinner alatt
 * @param {string}  label       - a felirat, egyben a role="progressbar" akadálymentes neve
 */
const SIZES = { sm: '2rem', md: '3rem', lg: '4rem' };

const ProgressSpinner = ({
  size = 'md',
  strokeWidth = 4,
  animationDuration = '1.4s',
  className = '',
  style = {},
  showLabel = false,
  label = 'Betöltés...',
}) => {
  const dimension = SIZES[size] || SIZES.md;

  return (
    <div className={`inline-flex flex-col items-center justify-center gap-3 ${className}`} style={style}>
      <PrimeProgressSpinner
        strokeWidth={strokeWidth}
        fill="none"
        animationDuration={animationDuration}
        style={{ width: dimension, height: dimension }}
        aria-label={label}
      />
      {showLabel && <p className="text-sm font-medium text-sze-primary">{label}</p>}
    </div>
  );
};

export default ProgressSpinner;
