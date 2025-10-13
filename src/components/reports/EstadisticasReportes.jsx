import React from 'react'

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