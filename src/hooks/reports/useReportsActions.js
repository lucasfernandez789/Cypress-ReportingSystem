import { useCallback } from 'react';

/**
 * Hook para gestionar acciones de reportes.
 *
 * @param {Function} loadReports - Función para recargar reportes
 * @returns {Object} Funciones de acciones
 * @returns {Function} returns.deleteExecution - Función para eliminar una ejecución
 */
export function useReportsActions(loadReports) {
  const deleteExecution = useCallback(async (executionId) => {
    try {
      // Implementar eliminación de ejecución
      // Esto podría hacer una llamada a una API o modificar archivos locales
      console.log('Deleting execution:', executionId);

      // Después de eliminar, recargar reportes
      await loadReports();
    } catch (error) {
      console.error('Error deleting execution:', error);
      throw error;
    }
  }, [loadReports]);

  return {
    deleteExecution,
  };
}