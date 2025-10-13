import React from 'react';
import FiltrosReportes from '../components/reports/FiltrosReportes';
import PaginacionReportes from '../components/reports/PaginacionReportes';
import EstadisticasReportes from '../components/reports/EstadisticasReportes';
import ReporteFecha from '../components/reports/ReporteFecha';
import { useReports } from '../hooks/useReports';

function Reports() {
  const {
    visibleCount,
    totalReports,
    dateFilter,
    dateFrom,
    dateTo,
    expandedDates,
    currentPage,
    paginated,
    totalPages,
    filtered,
    setDateFilter,
    setDateFrom,
    setDateTo,
    setCurrentPage,
    toggleDateExpansion,
    deleteExecution,
    clearFilters,
  } = useReports();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Reportes por Fecha</h2>

        <EstadisticasReportes visibleCount={visibleCount} totalReports={totalReports} />

        <FiltrosReportes
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          clearFilters={clearFilters}
          setCurrentPage={setCurrentPage}
          filteredCount={filtered.length}
          totalFilteredReports={filtered.reduce((sum, report) => sum + report.files.length, 0)}
        />
      </div>

      <div className="space-y-4">
        {paginated && paginated.length > 0 ? (
          <>
            {paginated.map((report, index) => (
              <ReporteFecha
                key={index}
                report={report}
                isExpanded={expandedDates.has(report.date)}
                onToggleExpansion={toggleDateExpansion}
                onDeleteExecution={deleteExecution}
              />
            ))}

            <PaginacionReportes
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              totalItems={filtered.length}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No hay reportes disponibles</h3>
            <p className="mt-2 text-sm text-gray-500">
              No se encontraron reportes para mostrar. Ejecuta algunas pruebas primero.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;