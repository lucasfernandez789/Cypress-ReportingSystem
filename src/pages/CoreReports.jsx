import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReports } from '../hooks/useReports'
import FiltrosReportes from '../components/reports/FiltrosReportes'
import PaginacionReportes from '../components/reports/PaginacionReportes'
import EstadisticasReportes from '../components/reports/EstadisticasReportes'
import ReporteFecha from '../components/reports/ReporteFecha'

function CoreReports() {
  const {
    reports,
    visibleCount,
    totalReports,
    dateFilter,
    setDateFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    expandedDates,
    toggleDateExpansion,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    clearFilters
  } = useReports('core')

  const filteredReports = reports.map(report => ({
    ...report,
    files: report.files.filter(file =>
      file.category === 'core' || file.category === 'mixed'
    )
  })).filter(report => report.files.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  ← Volver al inicio
                </Link>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">Reportes Core</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">
                Reportes de Testing Core
              </h1>
              <p className="text-gray-600 mt-1">
                Funcionalidades básicas y críticas del sistema
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                🔧 Core
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas */}
        <EstadisticasReportes reports={filteredReports} />

        {/* Filtros */}
        <FiltrosReportes
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          onClearFilters={clearFilters}
        />

        {/* Lista de Reportes */}
        <div className="space-y-6">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No hay reportes de Core disponibles</div>
              <p className="text-gray-400 mt-2">Los reportes aparecerán aquí después de ejecutar los tests</p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <ReporteFecha
                key={report.date}
                report={report}
                isExpanded={expandedDates.has(report.date)}
                onToggleExpansion={toggleDateExpansion}
                onDeleteExecution={(date, fileIndex) => {
                  // Lógica para eliminar ejecución
                  console.log('Eliminar ejecución:', date, fileIndex);
                }}
              />
            ))
          )}
        </div>

        {/* Paginación */}
        {filteredReports.length > 0 && (
          <PaginacionReportes
            currentPage={currentPage}
            totalPages={Math.ceil(filteredReports.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}

export default CoreReports