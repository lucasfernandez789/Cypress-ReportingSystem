import React from 'react'
import PropTypes from 'prop-types'
import Button from '../common/Button'
import Icon from '../common/Icon'

function PaginacionReportes({
  currentPage,
  totalPages,
  onPageChange
}) {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) {
    return (
      <div className="mt-8 flex items-center justify-center">
        <span className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700">
          1
        </span>
      </div>
    )
  }

  return (
    <div className="mt-8 flex items-center justify-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon name="arrow_left_alt_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24" size="h-4 w-4" />
      </Button>

      {getVisiblePages().map((page, index) => (
        <Button
          key={index}
          variant={page === currentPage ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={page === '...' ? 'cursor-default' : ''}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon name="arrow_right_alt_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24" size="h-4 w-4" />
      </Button>
    </div>
  )
}

PaginacionReportes.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default PaginacionReportes