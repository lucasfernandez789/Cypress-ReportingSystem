import React from 'react'

function PaginacionReportes({
  currentPage,
  totalPages,
  onPageChange
}) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <img src="/Cypress-ReportingSystem/assets/images/arrow_left_alt_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="previous" className="w-4 h-4" />
      </button>

      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`rounded-md border px-3 py-2 transition-colors duration-200 ${
            page === currentPage
              ? 'border-blue-600 bg-blue-600 text-white'
              : page === '...'
              ? 'cursor-default border-gray-300 bg-white text-gray-700'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <img src="/Cypress-ReportingSystem/assets/images/arrow_right_alt_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="next" className="w-4 h-4" />
      </button>
    </div>
  )
}

export default PaginacionReportes