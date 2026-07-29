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

  return (
    <div className={`paginator-wrapper ${className}`} style={style}>
      <PrimePaginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={handlePageChange}
        rowsPerPageOptions={rowsPerPageOptions}
        showPageLinks={showPageLinks}
        className="bg-white border border-gray-200 rounded-lg p-3 text-sm"
        template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} results"
      />
    </div>
  );
};

export default Paginator;
