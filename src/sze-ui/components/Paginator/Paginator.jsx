import React from 'react';
import { Paginator as PrimePaginator } from 'primereact/paginator';

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
  const handlePageChange = (event) => {
    if (onPageChange) {
      onPageChange(event);
    }
  };

  // A `showPageLinks` nem PrimeReact-prop: korábban változatlanul átment a
  // DOM-ig, ahol React-figyelmeztetést okozott ("React does not recognize the
  // showPageLinks prop on a DOM element"). Itt a template-be fordítjuk, ami a
  // tényleges hatása lenne: legyenek-e oldalszám-gombok.
  const template = [
    'CurrentPageReport',
    'FirstPageLink',
    'PrevPageLink',
    showPageLinks ? 'PageLinks' : null,
    'NextPageLink',
    'LastPageLink',
    'RowsPerPageDropdown',
  ].filter(Boolean).join(' ');

  return (
    <div className={`paginator-wrapper ${className}`} style={style}>
      <PrimePaginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={handlePageChange}
        rowsPerPageOptions={rowsPerPageOptions}
        className="bg-white border border-gray-200 rounded-lg p-3 text-sm"
        template={template}
        currentPageReportTemplate="{first}-{last} / {totalRecords} találat"
      />
    </div>
  );
};

export default Paginator;
