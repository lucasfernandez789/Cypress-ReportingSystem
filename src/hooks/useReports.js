import { useMemo, useState } from 'react';
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
  // System filter state
  const [selectedSystem, setSelectedSystem] = useState('all');

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
        // Si el archivo es 'mixed', mostrarlo en todas las categorías
        if (file.category === REPORT_CATEGORIES.MIXED) {
          return true;
        }

        if (category === REPORT_CATEGORIES.CORE) {
          return file.category === REPORT_CATEGORIES.CORE || file.category === REPORT_CATEGORIES.MIXED;
        } else if (category === REPORT_CATEGORIES.FEATURES) {
          return file.category === REPORT_CATEGORIES.FEATURES || file.category === REPORT_CATEGORIES.MIXED;
        } else if (category === REPORT_CATEGORIES.MIXED) {
          return file.category === REPORT_CATEGORIES.MIXED;
        }
        return file.category === category;
      })
    })).filter(report => report.files.length > 0);
  }, [reports, category]);

  // Get available systems from reports
  const availableSystems = useMemo(() => {
    if (!reports) return [{ id: 'all', name: 'Todos los sistemas' }];

    const systems = new Set();
    reports.forEach(report => {
      report.files.forEach(file => {
        if (file.systemId && file.systemName) {
          systems.add(JSON.stringify({ id: file.systemId, name: file.systemName }));
        }
      });
    });

    const systemList = Array.from(systems).map(item => JSON.parse(item));
    return [{ id: 'all', name: 'Todos los sistemas' }, ...systemList];
  }, [reports]);

  // Filter reports by system
  const systemFilteredReports = useMemo(() => {
    if (selectedSystem === 'all' || !categoryFilteredReports) return categoryFilteredReports;

    return categoryFilteredReports.map(report => ({
      ...report,
      files: report.files.filter(file => file.systemId === selectedSystem)
    })).filter(report => report.files.length > 0);
  }, [categoryFilteredReports, selectedSystem]);

  // Apply date filters
  const filtered = useMemo(() => {
    return applyDateFilter(systemFilteredReports);
  }, [systemFilteredReports, dateFilter, dateFrom, dateTo]);

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
    // Filters are applied automatically, but this provides user feedback
    loadReports();
  };

  // Enhanced clearFilters that also resets pagination and system filter
  const clearFilters = () => {
    clearFilterState();
    resetPagination();
    setSelectedSystem('all');
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
    selectedSystem,
    availableSystems,

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
    setSelectedSystem,
    onSystemChange: setSelectedSystem,

    // Actions
    loadReports,
    deleteExecution,
    toggleDateExpansion,
    filterReports,
    clearFilters,
    onSearch: filterReports,
  };
}