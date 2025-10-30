import React from 'react'
import PropTypes from 'prop-types'
import Card from '../common/Card'
import Input from '../common/Input'
import Button from '../common/Button'

/**
 * Componente FiltrosReportes para filtrar reportes por fecha.
 *
 * Proporciona controles para filtrar reportes por fecha específica,
 * rango de fechas y botones de acción.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.dateFilter - Valor del filtro de fecha específica
 * @param {Function} props.setDateFilter - Función para actualizar fecha específica
 * @param {string} props.dateFrom - Valor del filtro de fecha desde
 * @param {Function} props.setDateFrom - Función para actualizar fecha desde
 * @param {string} props.dateTo - Valor del filtro de fecha hasta
 * @param {Function} props.setDateTo - Función para actualizar fecha hasta
 * @param {Function} props.onClearFilters - Función para limpiar filtros
 * @param {Function} props.onSearch - Función para buscar con filtros
 * @returns {JSX.Element} Formulario de filtros con inputs y botones
 *
 * @example
 * ```jsx
 * <FiltrosReportes
 *   dateFilter={dateFilter}
 *   setDateFilter={setDateFilter}
 *   dateFrom={dateFrom}
 *   setDateFrom={setDateFrom}
 *   dateTo={dateTo}
 *   setDateTo={setDateTo}
 *   onClearFilters={clearFilters}
 *   onSearch={filterReports}
 * />
 * ```
 */
function FiltrosReportes({
  dateFilter,
  setDateFilter,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  onClearFilters,
  onSearch
}) {
  return (
    <Card title="Filtros de Reportes" className="mb-6">
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Fecha específica"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <Input
          label="Desde"
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <Input
          label="Hasta"
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="primary" onClick={onSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          Buscar
        </Button>
        <Button variant="secondary" onClick={onClearFilters}>
          Limpiar Filtros
        </Button>
      </div>
    </Card>
  )
}

FiltrosReportes.propTypes = {
  dateFilter: PropTypes.string.isRequired,
  setDateFilter: PropTypes.func.isRequired,
  dateFrom: PropTypes.string.isRequired,
  setDateFrom: PropTypes.func.isRequired,
  dateTo: PropTypes.string.isRequired,
  setDateTo: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
}

export default FiltrosReportes