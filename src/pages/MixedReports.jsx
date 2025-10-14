import React, { useState } from 'react'
import { useReports } from '../hooks/useReports'
import FiltrosReportes from '../components/reports/FiltrosReportes'
import PaginacionReportes from '../components/reports/PaginacionReportes'
import EstadisticasReportes from '../components/reports/EstadisticasReportes'
import ReporteFecha from '../components/reports/ReporteFecha'

function MixedReports({ onNavigate }) {
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
  } = useReports('mixed')

  // El hook ya filtra por categoría 'mixed', así que usamos directamente filtered y paginated
  const filteredReports = filtered
  const paginatedReports = paginated

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
                  <img src="/Cypress-ReportingSystem/assets/images/arrow_left_alt_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="back" className="icon-red h-4 w-4" />
                  Volver
                </button>
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Reportes Mixtos
              </h1>
              <p className="mt-1 text-gray-600">
                Funcionalidades combinadas de core y features
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                Mixed
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
              clearFilters={clearFilters}
              filterReports={filterReports}
            />
          </div>

          {/* Contenido Principal */}
          <div className="lg:col-span-3">
            {/* Información de paginación */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Historial de Ejecuciones</h2>
                <p className="text-sm text-gray-600">
                  {visibleCount} fechas con reportes • {totalReports} ejecuciones totales
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Página {currentPage} de {totalPages}
              </div>
            </div>

            {/* Lista de reportes por fecha */}
            <div className="space-y-4">
              {paginatedReports.length > 0 ? (
                paginatedReports.map((report) => (
                  <ReporteFecha
                    key={report.date}
                    report={report}
                    isExpanded={expandedDates.has(report.date)}
                    onToggleExpansion={toggleDateExpansion}
                    onDeleteExecution={() => {}} // TODO: Implementar eliminación
                  />
                ))
              ) : (
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                  <div className="text-gray-500">
                    <p className="text-lg font-medium">No hay reportes mixtos</p>
                    <p className="text-sm">Los reportes mixtos aparecen cuando se ejecutan tests de core y features juntos.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-8">
                <PaginacionReportes
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MixedReports