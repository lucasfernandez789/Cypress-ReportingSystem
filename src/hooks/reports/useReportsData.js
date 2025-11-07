import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../constants/constants.js';

/**
 * Hook para cargar datos de reportes desde archivos JSON.
 *
 * @returns {Object} Estado de carga de reportes
 * @returns {Array} returns.reports - Array de reportes procesados
 * @returns {boolean} returns.loading - Estado de carga
 * @returns {Error} returns.error - Error si la carga falló
 * @returns {Function} returns.loadReports - Función para recargar reportes
 */
export function useReportsData() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar datos de reportes desde URL configurable
      const response = await fetch(API_ENDPOINTS.REPORTS_DATA);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Procesar y enriquecer los datos con estadísticas
      const processedReports = await Promise.all(
        data.map(async (dateGroup) => {
          const enrichedFiles = await Promise.all(
            dateGroup.files.map(async (file) => {
              // Las estadísticas ya están incluidas en el JSON generado por el script
              return {
                ...file,
                name: `Reporte ${file.category.charAt(0).toUpperCase() + file.category.slice(1)}`,
                stats: file.stats || {
                  suites: 1,
                  tests: 1,
                  passes: 1,
                  failures: 0,
                  total: 1,
                  duration: 1000
                }
              };
            })
          );

          return {
            ...dateGroup,
            files: enrichedFiles
          };
        })
      );

      setReports(processedReports);
    } catch (err) {
      console.error('Error loading reports:', err);
      setError(err);
      // Fallback a datos mock si falla la carga
      setReports(await loadMockReports());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  return { reports, loading, error, loadReports };
}

/**
 * Carga reportes mock para fallback cuando falla la carga real.
 *
 * @returns {Promise<Array>} Reportes mock
 */
async function loadMockReports() {
  return [
    {
      date: '2025-10-14',
      files: [
        {
          name: 'Reporte Core',
          path: '2025-10-14/report-2025-10-14T11-57-14.html',
          time: '11:57:14',
          category: 'core',
          stats: {
            suites: 2,
            tests: 5,
            passes: 5,
            failures: 0,
            total: 5,
            duration: 12000
          }
        }
      ]
    },
    {
      date: '2025-10-16',
      files: [
        {
          name: 'Reporte Features',
          path: '2025-10-16/report-2025-10-16T11-31-59.html',
          time: '11:31:59',
          category: 'features',
          stats: {
            suites: 1,
            tests: 3,
            passes: 2,
            failures: 1,
            total: 3,
            duration: 8500
          }
        }
      ]
    }
  ];
}