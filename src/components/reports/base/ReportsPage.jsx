import React from 'react';
import PropTypes from 'prop-types';
import FiltrosReportes from '../FiltrosReportes';
import PaginacionReportes from '../PaginacionReportes';
import EstadisticasReportes from '../EstadisticasReportes';
import ReporteFecha from '../ReporteFecha';
import LoadingCard from '../../common/LoadingCard';
import SystemSelector from '../SystemSelector';

/**
 * Componente base para páginas de reportes (Core, Features, Mixed).
 *
 * Proporciona un layout consistente y funcionalidad para diferentes tipos de reportes de pruebas.
 * Este componente encapsula la estructura y comportamiento común compartido entre
 * todas las páginas de categorías de reportes.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título de la página
 * @param {string} props.description - Descripción de la página
 * @param {string} props.category - Texto del badge de categoría de reporte
 * @param {string} props.emptyMessage - Mensaje a mostrar cuando no hay reportes disponibles
 * @param {Function} props.onNavigate - Función de navegación
 * @param {Object} props.reportsData - Datos de reportes del hook useReports
 * @param {boolean} props.loading - Estado de carga
 * @param {Error} props.error - Objeto de error si la carga falló
 * @param {string} props.selectedSystem - Sistema seleccionado actualmente
 * @param {Function} props.onSystemChange - Función para cambiar el sistema seleccionado
 * @param {Array} props.availableSystems - Lista de sistemas disponibles
 * @returns {JSX.Element} Layout de página de reportes
 *
 * @example
 * ```jsx
 * <ReportsPage
 *   title="Reportes Core"
 *   description="Pruebas de funcionalidad core"
 *   category="Core"
 *   emptyMessage="No hay reportes de Core disponibles"
 *   onNavigate={handleNavigate}
 *   reportsData={reportsHookData}
 *   loading={false}
 *   error={null}
 * />
 * ```
 */
function ReportsPage({
  title,
  description,
  category,
  emptyMessage,
  onNavigate,
  reportsData,
  loading,
  error,
  selectedSystem,
  onSystemChange,
  availableSystems
}) {
  const {
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
    clearFilters,
    filterReports,
    filtered,
    paginated,
    totalPages
  } = reportsData;

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
                  <img src={`${import.meta.env.BASE_URL}assets/images/arrow_left_alt_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg`} alt="back" className="icon-red h-4 w-4" />
                  Volver
                </button>
                <SystemSelector
                  selectedSystem={selectedSystem}
                  onSystemChange={onSystemChange}
                  availableSystems={availableSystems}
                />
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {title}
              </h1>
              <p className="mt-1 text-gray-600">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => reportsData.loadReports()}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Actualizar reportes"
              >
                <svg className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? 'Actualizando...' : 'Actualizar'}
              </button>
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
            {loading ? (
              <LoadingCard message="Cargando estadísticas..." />
            ) : (
              <EstadisticasReportes reports={filtered} />
            )}

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
              {loading ? (
                <LoadingCard message="Cargando reportes..." />
              ) : error ? (
                <div className="py-12 text-center">
                  <div className="text-lg text-red-600">Error al cargar los reportes</div>
                  <p className="mt-2 text-gray-400">{error.message}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Reintentar
                  </button>
                </div>
              ) : paginated.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="text-lg text-gray-500">{emptyMessage}</div>
                  <p className="mt-2 text-gray-400">Los reportes aparecerán aquí después de ejecutar los tests</p>
                </div>
              ) : (
                paginated.map((report) => (
                  <ReporteFecha
                    key={report.date}
                    report={report}
                    isExpanded={expandedDates.has(report.date)}
                    onToggleExpansion={toggleDateExpansion}
                    onDeleteExecution={(date, fileIndex) => {
                      // TODO: Implementar lógica para eliminar ejecución
                      // console.log('Eliminar ejecución:', date, fileIndex);
                    }}
                    category={category}
                  />
                ))
              )}
            </div>

            {/* Paginación */}
            {!loading && !error && paginated.length > 0 && (
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
  );
}

ReportsPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  reportsData: PropTypes.shape({
    visibleCount: PropTypes.number,
    totalReports: PropTypes.number,
    dateFilter: PropTypes.string,
    setDateFilter: PropTypes.func,
    dateFrom: PropTypes.string,
    setDateFrom: PropTypes.func,
    dateTo: PropTypes.string,
    setDateTo: PropTypes.func,
    expandedDates: PropTypes.instanceOf(Set),
    toggleDateExpansion: PropTypes.func,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    clearFilters: PropTypes.func,
    filterReports: PropTypes.func,
    filtered: PropTypes.array,
    paginated: PropTypes.array,
    totalPages: PropTypes.number,
  }).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  selectedSystem: PropTypes.string.isRequired,
  onSystemChange: PropTypes.func.isRequired,
  availableSystems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ReportsPage;