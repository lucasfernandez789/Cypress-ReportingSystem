import { useState } from 'react';
import { PAGINATION, DATE_FILTERS } from '../../constants/constants';

/**
 * Hook para gestionar la funcionalidad de filtrado de reportes.
 *
 * Maneja el filtrado por fecha (fecha específica y rango de fechas) y proporciona
 * lógica de filtrado para los datos de reportes.
 *
 * @returns {Object} Estado de filtros y funciones
 * @returns {string} returns.dateFilter - Filtro de fecha específica actual
 * @returns {string} returns.dateFrom - Fecha de inicio para filtro de rango
 * @returns {string} returns.dateTo - Fecha de fin para filtro de rango
 * @returns {Function} returns.setDateFilter - Setter para filtro de fecha
 * @returns {Function} returns.setDateFrom - Setter para filtro de fecha desde
 * @returns {Function} returns.setDateTo - Setter para filtro de fecha hasta
 * @returns {Function} returns.clearFilters - Función para limpiar todos los filtros
 * @returns {Function} returns.applyDateFilter - Función para aplicar lógica de filtrado por fecha
 */
export function useReportsFilters() {
  const [dateFilter, setDateFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  /**
   * Aplica lógica de filtrado por fecha a un array de reportes.
   *
   * @param {Array} reports - Array de reportes para filtrar
   * @returns {Array} Array de reportes filtrados
   */
  const applyDateFilter = (reports) => {
    if (!reports) return [];

    let filtered = reports;

    // Apply specific date filter
    if (dateFilter) {
      filtered = filtered.filter(report => report.date === dateFilter);
    }

    // Apply date range filter
    if (dateFrom || dateTo) {
      filtered = filtered.filter(report => {
        const dateStr = report.date;
        const fromStr = dateFrom || DATE_FILTERS.DEFAULT_FROM;
        const toStr = dateTo || DATE_FILTERS.DEFAULT_TO;
        return dateStr >= fromStr && dateStr <= toStr;
      });
    }

    return filtered;
  };

  /**
   * Limpia todos los filtros activos.
   */
  const clearFilters = () => {
    setDateFilter('');
    setDateFrom('');
    setDateTo('');
  };

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