import React from 'react';
import { ProgressBar as PrimeProgressBar } from 'primereact/progressbar';
import { progressBarPT } from '../../theme/pt/progressbar';

/**
 * SZE ProgressBar - haladási sáv
 *
 * Az érték a sáv mellett, jobbra jelenik meg (a PrimeReact a kitöltésbe írná,
 * ahol kis értéknél levágódna). Az érték változását a kitöltés szélességének
 * átmenete mutatja; `animated` esetén a kitöltés mozgó csíkos mintát kap.
 *
 * @param {number}  value        - 0–100
 * @param {boolean} showValue    - az érték kiírása a sáv mellett
 * @param {string}  color        - kitöltés színe: "primary" | "secondary" | "success" | "warning" | "danger"
 *                                 (a régi "bg-sze-primary" stb. osztálynevek is működnek)
 * @param {"sm"|"md"|"lg"} size  - a sáv vastagsága
 * @param {boolean} animated     - mozgó csíkos kitöltés
 * @param {"percent"|"value"} displayFormat - "45%" vagy "45"
 * @param {string}  label        - opcionális felirat a sáv fölött (és akadálymentes név)
 */

// A színek a @theme tokenekre hivatkoznak (CSS-változóként), így nem kell
// hex-kódokat duplikálni: ha a token változik, a sáv is követi.
const COLORS = {
  primary: 'var(--color-sze-primary)',
  secondary: 'var(--color-sze-secondary)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  danger: 'var(--color-danger)',
};
const LEGACY_COLORS = {
  'bg-sze-primary': 'primary',
  'bg-sze-secondary': 'secondary',
  'bg-green-600': 'success',
  'bg-yellow-600': 'warning',
  'bg-red-600': 'danger',
};

const ProgressBar = ({
  value = 0,
  showValue = true,
  color = 'primary',
  size = 'md',
  animated = false,
  displayFormat = 'percent',
  label = null,
  className = '',
  style = {},
}) => {
  const clamped = Math.min(100, Math.max(0, Number(value) || 0));
  const text = displayFormat === 'value' ? `${clamped}` : `${clamped}%`;
  const labelId = React.useId();

  return (
    <div className={`w-full ${className}`} style={style}>
      {label && (
        <p id={labelId} className="mb-1.5 text-sm font-medium text-gray-700">
          {label}
        </p>
      )}
      <div className="flex items-center gap-3">
        <PrimeProgressBar
          value={clamped}
          showValue={false}
          color={COLORS[LEGACY_COLORS[color] || color] || COLORS.primary}
          pt={progressBarPT({ size, animated })}
          aria-labelledby={label ? labelId : undefined}
          aria-valuetext={text}
        />
        {showValue && (
          <span className="w-12 shrink-0 text-right text-sm font-semibold text-sze-primary tabular-nums">{text}</span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
