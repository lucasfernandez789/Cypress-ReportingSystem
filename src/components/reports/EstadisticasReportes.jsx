import React from 'react'
import PropTypes from 'prop-types'

/**
 * Statistics component for displaying report metrics.
 *
 * Shows key statistics about test reports including:
 * - Number of dates with available reports
 * - Total number of test executions
 *
 * The component can accept reports data directly or use provided counts,
 * making it flexible for different usage contexts.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} [props.reports] - Array of report data to calculate statistics from
 * @param {number} [props.visibleCount] - Pre-calculated visible count (used if reports not provided)
 * @param {number} [props.totalReports] - Pre-calculated total reports count (used if reports not provided)
 * @returns {JSX.Element} Statistics cards with report metrics
 *
 * @example
 * ```jsx
 * <EstadisticasReportes reports={filteredReports} />
 * ```
 *
 * @example
 * ```jsx
 * <EstadisticasReportes visibleCount={5} totalReports={25} />
 * ```
 */
function EstadisticasReportes({ reports, visibleCount, totalReports }) {
  // Si se pasan reports como array, calcular las estadísticas
  const calculatedVisibleCount = reports ? reports.length : visibleCount || 0;
  const calculatedTotalReports = reports ? reports.reduce((sum, report) => sum + report.files.length, 0) : totalReports || 0;

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Estadísticas de Reportes</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-blue-50 p-4">
          <div className="text-2xl font-bold text-blue-600">{calculatedVisibleCount}</div>
          <div className="text-sm text-blue-800">Fechas con reportes</div>
        </div>
        <div className="rounded-lg bg-green-50 p-4">
          <div className="text-2xl font-bold text-green-600">{calculatedTotalReports}</div>
          <div className="text-sm text-green-800">Ejecuciones totales</div>
        </div>
      </div>
    </div>
  )
}

export default EstadisticasReportes

EstadisticasReportes.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.object),
  visibleCount: PropTypes.number,
  totalReports: PropTypes.number,
};