import { useState } from 'react';

/**
 * Hook para gestionar el estado de expansión de secciones de reportes.
 *
 * Maneja qué secciones de fecha están expandidas/colapsadas en la vista de reportes.
 * Usa un Set para rastrear eficientemente los estados expandidos.
 *
 * @returns {Object} Estado de expansión y funciones
 * @returns {Set} returns.expandedDates - Set de identificadores de fechas expandidas
 * @returns {Function} returns.toggleDateExpansion - Función para alternar expansión de una fecha
 * @returns {Function} returns.expandDate - Función para expandir una fecha específica
 * @returns {Function} returns.collapseDate - Función para colapsar una fecha específica
 * @returns {Function} returns.collapseAll - Función para colapsar todas las fechas
 * @returns {Function} returns.isExpanded - Función para verificar si una fecha está expandida
 */
export function useReportsExpansion() {
  const [expandedDates, setExpandedDates] = useState(new Set());

  /**
   * Alterna el estado de expansión de una sección de fecha.
   *
   * @param {string} date - Identificador de fecha para alternar
   */
  const toggleDateExpansion = (date) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  };

  /**
   * Expande una sección de fecha específica.
   *
   * @param {string} date - Identificador de fecha para expandir
   */
  const expandDate = (date) => {
    const newExpanded = new Set(expandedDates);
    newExpanded.add(date);
    setExpandedDates(newExpanded);
  };

  /**
   * Colapsa una sección de fecha específica.
   *
   * @param {string} date - Identificador de fecha para colapsar
   */
  const collapseDate = (date) => {
    const newExpanded = new Set(expandedDates);
    newExpanded.delete(date);
    setExpandedDates(newExpanded);
  };

  /**
   * Colapsa todas las secciones de fecha expandidas.
   */
  const collapseAll = () => {
    setExpandedDates(new Set());
  };

  /**
   * Verifica si una sección de fecha está actualmente expandida.
   *
   * @param {string} date - Identificador de fecha para verificar
   * @returns {boolean} Si la fecha está expandida
   */
  const isExpanded = (date) => {
    return expandedDates.has(date);
  };

  return {
    expandedDates,
    toggleDateExpansion,
    expandDate,
    collapseDate,
    collapseAll,
    isExpanded,
  };
}