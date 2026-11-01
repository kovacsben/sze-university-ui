import React from 'react';
import { Paginator as PrimePaginator } from 'primereact/paginator';
import { Dropdown } from '../Dropdown';

/**
 * SZE Paginator - lapozó
 *
 * Elrendezés: bal oldalt a találatszám, középen a lapozógombok, jobb oldalt
 * a "/ oldal" választó. A PrimeReact template-jében ezek egymás utáni
 * testvérelemek, amiket nem lehet három oszlopba rendezni - ezért a két
 * szélső rész a PrimeReact `leftContent` / `rightContent` helyére kerül
 * (a PT-ben `left` és `end`, mindkettő flex-1), a template pedig csak a
 * lapozógombokat tartalmazza, így azok pontosan középre kerülnek.
 *
 * A "/ oldal" választó a SZE Dropdown, hogy ugyanúgy nézzen ki, mint a
 * könyvtár többi legördülője.
 *
 * @param {number}   first, rows, totalRecords - a PrimeReact-tal azonos jelentésű
 * @param {Function} onPageChange - { first, rows, page, totalPages } eseménnyel hívódik
 * @param {number[]} rowsPerPageOptions - üres tömb esetén nincs választó
 * @param {boolean}  showPageLinks - legyenek-e oldalszám-gombok (különben csak nyilak)
 */
const Paginator = ({
  first = 0,
  rows = 10,
  totalRecords = 0,
  onPageChange = null,
  rowsPerPageOptions = [5, 10, 20, 50],
  showPageLinks = true,
  className = '',
  style = {},
}) => {
  // A `showPageLinks` nem PrimeReact-prop: korábban változatlanul átment a
  // DOM-ig, ahol React-figyelmeztetést okozott. Itt a template-be fordítjuk.
  const template = [
    'FirstPageLink',
    'PrevPageLink',
    showPageLinks ? 'PageLinks' : null,
    'NextPageLink',
    'LastPageLink',
  ].filter(Boolean).join(' ');

  const last = Math.min(first + rows, totalRecords);
  const report = (
    <span className="text-sm text-gray-600 tabular-nums">
      <span className="font-semibold text-sze-primary">{totalRecords ? first + 1 : 0}–{last}</span>
      {' / '}
      {totalRecords} találat
    </span>
  );

  const rowsOptions = rowsPerPageOptions.map((n) => ({ label: `${n} / oldal`, value: n }));
  const rowsSelector = rowsOptions.length > 0 && (
    <Dropdown
      value={rows}
      options={rowsOptions}
      size="small"
      ariaLabel="Találatok oldalanként"
      // A PrimeReact saját választójával egyezően a lapméret váltásakor az első oldalra ugrik.
      onChange={(e) =>
        onPageChange?.({ first: 0, rows: e.value, page: 0, totalPages: Math.ceil(totalRecords / e.value) })
      }
    />
  );

  return (
    <PrimePaginator
      first={first}
      rows={rows}
      totalRecords={totalRecords}
      onPageChange={(e) => onPageChange?.(e)}
      template={template}
      leftContent={report}
      rightContent={rowsSelector || <span />}
      className={className}
      style={style}
    />
  );
};

export default Paginator;
