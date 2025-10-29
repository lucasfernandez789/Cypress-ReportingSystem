import { useMemo } from 'react';
import { useReportsData } from './reports/useReportsData';
import { useReportsFilters } from './reports/useReportsFilters';
import { useReportsPagination } from './reports/useReportsPagination';
import { useReportsExpansion } from './reports/useReportsExpansion';
import { useReportsActions } from './reports/useReportsActions';
import { REPORT_CATEGORIES } from '../constants/constants';

/**
 * Hook personalizado para gestionar datos y estado de reportes de pruebas Cypress.
 *
 * Este hook proporciona funcionalidad completa para:
 * - Cargar y gestionar datos de reportes desde archivos JSON
 * - Filtrar reportes por categoría (core, features, mixed)
 * - Filtrado por fechas (fecha específica o rango de fechas)
 * - Paginación de resultados de reportes
 * - Expandir/colapsar secciones de fechas de reportes
 * - Eliminar ejecuciones individuales de pruebas
 *
 * El hook carga automáticamente reportes al montar y proporciona métodos
 * para filtrar, paginar y manipular datos.
 *
 * @param {string|null} category - Filtro opcional de categoría ('core', 'features', 'mixed', o null para todos)
 * @returns {Object} Estado y métodos del hook
 * @returns {Array} returns.reports - Array de datos de reportes sin procesar
 * @returns {number} returns.visibleCount - Número de fechas visibles después del filtrado
 * @returns {number} returns.totalReports - Número total de ejecuciones de reportes
 * @returns {string} returns.dateFilter - Filtro de fecha específica actual
 * @returns {string} returns.dateFrom - Fecha de inicio para filtro de rango
 * @returns {string} returns.dateTo - Fecha de fin para filtro de rango
 * @returns {Set} returns.expandedDates - Conjunto de identificadores de fechas expandidas
 * @returns {number} returns.currentPage - Página actual de paginación
 * @returns {Array} returns.filtered - Array de reportes filtrados
 * @returns {Array} returns.paginated - Página actual de resultados paginados
 * @returns {number} returns.totalPages - Número total de páginas
 * @returns {Function} returns.setDateFilter - Setter para filtro de fecha
 * @returns {Function} returns.setDateFrom - Setter para fecha desde
 * @returns {Function} returns.setDateTo - Setter para fecha hasta
 * @returns {Function} returns.setCurrentPage - Setter para página actual
 * @returns {Function} returns.loadReports - Función para recargar datos de reportes
 * @returns {Function} returns.deleteExecution - Función para eliminar una ejecución específica
 * @returns {Function} returns.toggleDateExpansion - Función para alternar expansión de sección de fecha
 * @returns {Function} returns.filterReports - Función para aplicar filtros actuales
 * @returns {Function} returns.clearFilters - Función para limpiar todos los filtros
 *
 * @example
 * ```js
 * const {
 *   reports,
 *   filtered,
 *   paginated,
 *   loadReports,
 *   deleteExecution
 * } = useReports('core');
 * ```
 */
export function useReports(category = null) {
  // Use specialized hooks for different concerns
  const { reports, loading, error, loadReports } = useReportsData();
  const {
    dateFilter,
    dateFrom,
    dateTo,
    setDateFilter,
    setDateFrom,
    setDateTo,
    clearFilters: clearFilterState,
    applyDateFilter
  } = useReportsFilters();
  const {
    currentPage,
    setCurrentPage,
    paginateReports,
    getPaginationInfo,
    resetPagination
  } = useReportsPagination();
  const {
    expandedDates,
    toggleDateExpansion
  } = useReportsExpansion();
  const { deleteExecution } = useReportsActions(loadReports);

  // Filter reports by category if specified
  const categoryFilteredReports = useMemo(() => {
    if (!category || !reports) return reports || [];

    return reports.map(report => ({
      ...report,
      files: report.files.filter(file => {
        if (category === REPORT_CATEGORIES.CORE) {
          return file.category === REPORT_CATEGORIES.CORE;
        } else if (category === REPORT_CATEGORIES.FEATURES) {
          return file.category === REPORT_CATEGORIES.FEATURES;
        } else if (category === REPORT_CATEGORIES.MIXED) {
          return file.category === REPORT_CATEGORIES.MIXED;
        }
        return file.category === category;
      })
    })).filter(report => report.files.length > 0);
  }, [reports, category]);

  // Apply date filters
  const filtered = useMemo(() => {
    return applyDateFilter(categoryFilteredReports);
  }, [categoryFilteredReports, dateFilter, dateFrom, dateTo]);

  // Apply pagination
  const paginated = useMemo(() => {
    return paginateReports(filtered);
  }, [filtered, currentPage]);

  // Calculate statistics
  const visibleCount = filtered.length;
  const totalReports = filtered.reduce((sum, report) => sum + report.files.length, 0);
  const { totalPages } = getPaginationInfo(filtered);

  // Legacy filterReports function for backward compatibility
  const filterReports = () => {
    // Filters are now applied automatically via useMemo
    // This function is kept for backward compatibility
  };

  // Enhanced clearFilters that also resets pagination
  const clearFilters = () => {
    clearFilterState();
    resetPagination();
  };

  return {
    // Data state
    reports: categoryFilteredReports,
    loading,
    error,

    // Statistics
    visibleCount,
    totalReports,

    // Filter state
    dateFilter,
    dateFrom,
    dateTo,

    // UI state
    expandedDates,
    currentPage,

    // Computed data
    filtered,
    paginated,
    totalPages,

    // Setters
    setDateFilter,
    setDateFrom,
    setDateTo,
    setCurrentPage,

    // Actions
    loadReports,
    deleteExecution,
    toggleDateExpansion,
    filterReports,
    clearFilters,
  };
}