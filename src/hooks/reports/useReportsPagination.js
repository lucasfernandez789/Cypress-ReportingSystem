import { useState, useCallback } from 'react';

/**
 * Hook para gestionar paginación de reportes.
 *
 * @returns {Object} Estado y funciones de paginación
 * @returns {number} returns.currentPage - Página actual
 * @returns {Function} returns.setCurrentPage - Setter para página actual
 * @returns {Function} returns.paginateReports - Función para paginar reportes
 * @returns {Function} returns.getPaginationInfo - Función para obtener info de paginación
 * @returns {Function} returns.resetPagination - Función para resetear paginación
 */
export function useReportsPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const paginateReports = useCallback((reports) => {
    if (!reports) return [];

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return reports.slice(startIndex, endIndex);
  }, [currentPage]);

  const getPaginationInfo = useCallback((reports) => {
    const totalItems = reports?.length || 0;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return {
      totalPages,
      totalItems,
      itemsPerPage: ITEMS_PER_PAGE,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }, [currentPage]);

  return {
    currentPage,
    setCurrentPage,
    paginateReports,
    getPaginationInfo,
    resetPagination,
  };
}