import React from 'react';
import { Timeline as PrimeTimeline } from 'primereact/timeline';

/**
 * SZE Timeline - esemény-idővonal
 *
 * Balra az esemény ikonja egy SZE-kék körben, a mellette lévő kártya függőleges
 * közepéhez igazítva (a köröket vonal köti össze); jobbra a tartalom: cím, dátum, leírás. Az elrendezés
 * a PT-ből jön (theme/pt/timeline.js), itt csak a jelölő és a tartalom sablonja.
 *
 * value: [{ title, description?, date?, icon?, done? }]
 *   - done: false esetén a jelölő halvány (még hátralévő esemény)
 */
const Timeline = ({
  value = [],
  align = 'left',
  layout = 'vertical',
  className = '',
  style = {},
  dataKey = undefined,
}) => {
  const marker = (item) => (
    <span
      // relative z-[1]: a jelölő a mögötte futó összekötő vonal fölött legyen
      className={`relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm ring-4 ring-white ${
        item.done === false ? 'bg-sze-primary-100 text-sze-primary' : 'bg-sze-primary text-white'
      }`}
    >
      <i className={`${item.icon || 'pi pi-circle-fill'} text-base`} aria-hidden="true" />
    </span>
  );

  const content = (item) => (
    <div className="rounded-xl border border-black/10 bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h4 className="font-semibold text-sze-primary">{item.title}</h4>
        {item.date && <time className="text-xs font-medium text-gray-500 tabular-nums">{item.date}</time>}
      </div>
      {item.description && <p className="mt-1 text-sm text-gray-600">{item.description}</p>}
    </div>
  );

  return (
    <PrimeTimeline
      value={value}
      align={align}
      layout={layout}
      dataKey={dataKey}
      marker={marker}
      content={content}
      className={className}
      style={style}
    />
  );
};

export default Timeline;
