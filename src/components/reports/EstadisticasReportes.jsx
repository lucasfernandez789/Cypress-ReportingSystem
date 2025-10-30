import React from 'react'
import PropTypes from 'prop-types'
import Card from '../common/Card'

function EstadisticasReportes({ reports, visibleCount, totalReports }) {
  const calculatedVisibleCount = reports ? reports.length : visibleCount || 0
  const calculatedTotalReports = reports ? reports.reduce((sum, report) => sum + report.files.length, 0) : totalReports || 0

  return (
    <Card title="Estadísticas de Reportes" className="mb-6">
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
    </Card>
  )
}

EstadisticasReportes.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.object),
  visibleCount: PropTypes.number,
  totalReports: PropTypes.number,
}

export default EstadisticasReportes