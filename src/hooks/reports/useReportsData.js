import { useState, useEffect } from 'react';
import { loadReportsData } from '../../utils/apiUtils';
import { API_ENDPOINTS, REPORT_CATEGORIES, REPORT_STATS } from '../../constants/constants';

/**
 * Hook para gestionar la carga y almacenamiento de datos de reportes.
 *
 * Maneja la obtención de reportes desde la API y transforma los datos
 * al formato esperado por la aplicación.
 *
 * @returns {Object} Estado de datos y funciones de carga
 * @returns {Array} returns.reports - Array de datos de reportes formateados
 * @returns {boolean} returns.loading - Indicador de estado de carga
 * @returns {Error|null} returns.error - Objeto de error si la carga falló
 * @returns {Function} returns.loadReports - Función para recargar datos de reportes
 */
export function useReportsData() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Carga datos de reportes desde el endpoint de la API.
   * Transforma datos JSON crudos en objetos de reporte formateados.
   */
  const loadReports = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await loadReportsData();

      if (Array.isArray(data) && data.length > 0) {
        const formattedReports = data.map(dateGroup => ({
          date: dateGroup.date,
          dateFormatted: dateGroup.dateFormatted,
          lastExecution: dateGroup.lastExecution,
          files: dateGroup.files.map((file, index) => ({
            path: file.path,
            time: file.time,
            date: file.date,
            category: file.category || REPORT_CATEGORIES.OTHER,
            stats: {
              passes: REPORT_STATS.PASSES_DEFAULT,
              failures: REPORT_STATS.FAILURES_DEFAULT,
              total: REPORT_STATS.TOTAL_DEFAULT
            },
            executionNumber: index + 1
          }))
        }));

        setReports(formattedReports);
      } else {
        setReports([]);
      }
    } catch (err) {
      console.error('Error loading reports:', err);
      setError(err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  return {
    reports,
    loading,
    error,
    loadReports,
  };
}