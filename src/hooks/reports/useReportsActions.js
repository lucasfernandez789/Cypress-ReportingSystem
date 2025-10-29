import { deleteReportExecution } from '../../utils/apiUtils';
import { API_ENDPOINTS, UI_MESSAGES } from '../../constants/constants';

/**
 * Hook para gestionar acciones de reportes como eliminación.
 *
 * Proporciona funciones para realizar acciones en los datos de reportes,
 * como eliminar ejecuciones individuales.
 *
 * @param {Function} onDataChange - Función de callback llamada cuando los datos cambian
 * @returns {Object} Funciones de acción
 * @returns {Function} returns.deleteExecution - Función para eliminar una ejecución específica
 */
export function useReportsActions(onDataChange) {
  /**
   * Elimina una ejecución específica de prueba después de confirmación del usuario.
   *
   * @param {string} date - Fecha de la ejecución a eliminar
   * @param {string} filePath - Ruta del archivo de la ejecución a eliminar
   * @returns {Promise<boolean>} Estado de éxito de la eliminación
   */
  const deleteExecution = async (date, filePath) => {
    const confirmMessage = UI_MESSAGES.CONFIRM_DELETE_EXECUTION
      .replace('{date}', date)
      .replace('{filePath}', filePath);

    if (!confirm(confirmMessage)) {
      return false;
    }

    try {
      await deleteReportExecution(date, filePath);
      alert(UI_MESSAGES.DELETE_SUCCESS);
      if (onDataChange) {
        onDataChange();
      }
      return true;
    } catch (error) {
      console.error('Error deleting execution:', error);
      const errorMessage = UI_MESSAGES.DELETE_ERROR.replace('{error}', error.message || 'Error desconocido');
      alert(errorMessage);
      return false;
    }
  };

  return {
    deleteExecution,
  };
}