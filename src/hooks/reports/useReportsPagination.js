import { useState } from 'react';
import { PAGINATION } from '../../constants/constants';

/**
 * Hook para gestionar la funcionalidad de paginación de reportes.
 *
 * Maneja el estado de página actual y proporciona lógica de paginación
 * para mostrar reportes en fragmentos.
 *
 * @param {number} itemsPerPage - Número de elementos a mostrar por página (default: PAGINATION.ITEMS_PER_PAGE)
 * @returns {Object} Estado de paginación y funciones
 * @returns {number} returns.currentPage - Página activa actual
 * @returns {Function} returns.setCurrentPage - Setter para página actual
 * @returns {Function} returns.paginateReports - Función para paginar un array de reportes
 * @returns {Function} returns.getPaginationInfo - Función para obtener metadatos de paginación
 */
export function useReportsPagination(itemsPerPage = PAGINATION.ITEMS_PER_PAGE) {
  const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE);

  /**
   * Pagina un array de reportes basado en la página actual y elementos por página.
   *
   * @param {Array} reports - Array de reportes para paginar
   * @returns {Array} Subconjunto paginado de reportes
   */
  const paginateReports = (reports) => {
    if (!reports) return [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return reports.slice(startIndex, endIndex);
  };

  /**
   * Calcula metadatos de paginación para un array de reportes.
   *
   * @param {Array} reports - Array de reportes
   * @returns {Object} Metadatos de paginación
   * @returns {number} returns.totalPages - Número total de páginas
   * @returns {number} returns.totalItems - Número total de elementos
   * @returns {boolean} returns.hasNextPage - Si hay una página siguiente
   * @returns {boolean} returns.hasPrevPage - Si hay una página anterior
   */
  const getPaginationInfo = (reports) => {
    const totalItems = reports?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      totalPages,
      totalItems,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  };

  /**
   * Reinicia la paginación a la primera página.
   */
  const resetPagination = () => {
    setCurrentPage(PAGINATION.DEFAULT_PAGE);
  };

  return {
    currentPage,
    setCurrentPage,
    paginateReports,
    getPaginationInfo,
    resetPagination,
  };
}