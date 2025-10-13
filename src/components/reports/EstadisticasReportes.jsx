import React from 'react'

function EstadisticasReportes({ visibleCount, totalReports }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas de Reportes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{visibleCount}</div>
          <div className="text-sm text-blue-800">Fechas con reportes</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{totalReports}</div>
          <div className="text-sm text-green-800">Ejecuciones totales</div>
        </div>
      </div>
    </div>
  )
}

export default EstadisticasReportes