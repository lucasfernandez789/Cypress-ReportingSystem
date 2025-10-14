import React, { useState } from 'react'
import { useReports } from '../hooks/useReports'
import FiltrosReportes from '../components/reports/FiltrosReportes'
import PaginacionReportes from '../components/reports/PaginacionReportes'
import EstadisticasReportes from '../components/reports/EstadisticasReportes'
import ReporteFecha from '../components/reports/ReporteFecha'

function CoreReports({ onNavigate }) {
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
    clearFilters,
    filterReports,
    filtered,
    paginated,
    totalPages
  } = useReports('core')

  const filteredReports = filtered.map(report => ({
    ...report,
    files: report.files.filter(file =>
      file.category === 'core' || file.category === 'mixed'
    )
  })).filter(report => report.files.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onNavigate('home')}
                  className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  Volver
                </button>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">Reportes Core</span>
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Reportes de Testing Core
              </h1>
              <p className="mt-1 text-gray-600">
                Funcionalidades básicas y críticas del sistema
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                Core
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Izquierdo - Estadísticas y Filtros */}
          <div className="lg:col-span-1">
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
              onSearch={filterReports}
            />
          </div>

          {/* Contenido Principal - Tests */}
          <div className="lg:col-span-3">
            {/* Lista de Reportes */}
            <div className="space-y-6">
              {filteredReports.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="text-lg text-gray-500">No hay reportes de Core disponibles</div>
                  <p className="mt-2 text-gray-400">Los reportes aparecerán aquí después de ejecutar los tests</p>
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
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoreReports