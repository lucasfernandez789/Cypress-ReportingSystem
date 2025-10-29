import { useState, useCallback } from 'react';

/**
 * Hook para gestionar filtros de fechas en reportes.
 *
 * @returns {Object} Estado y funciones de filtros
 * @returns {string} returns.dateFilter - Filtro de fecha específica
 * @returns {string} returns.dateFrom - Fecha de inicio del rango
 * @returns {string} returns.dateTo - Fecha de fin del rango
 * @returns {Function} returns.setDateFilter - Setter para filtro de fecha
 * @returns {Function} returns.setDateFrom - Setter para fecha desde
 * @returns {Function} returns.setDateTo - Setter para fecha hasta
 * @returns {Function} returns.clearFilters - Función para limpiar filtros
 * @returns {Function} returns.applyDateFilter - Función para aplicar filtros a reportes
 */
export function useReportsFilters() {
  const [dateFilter, setDateFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const clearFilters = useCallback(() => {
    setDateFilter('');
    setDateFrom('');
    setDateTo('');
  }, []);

  const applyDateFilter = useCallback((reports) => {
    if (!reports) return [];

    return reports.filter(report => {
      const reportDate = report.date;

      if (dateFilter) {
        return reportDate === dateFilter;
      }

      if (dateFrom && dateTo) {
        return reportDate >= dateFrom && reportDate <= dateTo;
      }

      if (dateFrom) {
        return reportDate >= dateFrom;
      }

      if (dateTo) {
        return reportDate <= dateTo;
      }

      return true;
    });
  }, [dateFilter, dateFrom, dateTo]);

  return {
    dateFilter,
    dateFrom,
    dateTo,
    setDateFilter,
    setDateFrom,
    setDateTo,
    clearFilters,
    applyDateFilter,
  };
}