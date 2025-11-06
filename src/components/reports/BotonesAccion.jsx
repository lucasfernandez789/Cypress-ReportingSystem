import React from 'react'
import PropTypes from 'prop-types'
import Button from '../common/Button'
import { API_ENDPOINTS } from '../../constants/constants'

function BotonesAccion({ filePath, date, onDelete, category = 'mixed' }) {
  return (
    <div className="flex items-center justify-between">
      <a
        href={`${API_ENDPOINTS.REPORTS_BASE_URL}/${filePath}?category=${category}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 transition-colors duration-200 hover:bg-blue-100"
      >
        Ver reporte
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </a>

      <Button
        variant="danger"
        size="sm"
        onClick={() => onDelete(date, filePath)}
        className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-sm text-red-600 transition-colors duration-200 hover:bg-red-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="#dc2626">
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
        Eliminar
      </Button>
    </div>
  )
}

BotonesAccion.propTypes = {
  filePath: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  category: PropTypes.oneOf(['core', 'features', 'mixed']).isRequired,
}

export default BotonesAccion