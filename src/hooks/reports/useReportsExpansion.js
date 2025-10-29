import { useState, useCallback } from 'react';

/**
 * Hook para gestionar expansión/colapso de secciones de fechas en reportes.
 *
 * @returns {Object} Estado y funciones de expansión
 * @returns {Set} returns.expandedDates - Conjunto de fechas expandidas
 * @returns {Function} returns.toggleDateExpansion - Función para alternar expansión de una fecha
 */
export function useReportsExpansion() {
  const [expandedDates, setExpandedDates] = useState(new Set());

  const toggleDateExpansion = useCallback((date) => {
    setExpandedDates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      return newSet;
    });
  }, []);

  return {
    expandedDates,
    toggleDateExpansion,
  };
}