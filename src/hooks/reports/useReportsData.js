import { useState, useEffect } from 'react';
// import { reportsData } from '../../data/reports-data.js'; // Comentado - ahora se carga dinámicamente

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
  const [lastUpdate, setLastUpdate] = useState(null);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Loading reports from local data');

      // Cargar datos dinámicamente para detectar cambios automáticos
      const response = await fetch('/data/reports-data.js', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const scriptText = await response.text();

      // Extraer el objeto reportsData del script
      const reportsDataMatch = scriptText.match(/export const reportsData = (\[[\s\S]*?\]);/);
      if (!reportsDataMatch) {
        throw new Error('No se pudo encontrar reportsData en el archivo');
      }

      const data = JSON.parse(reportsDataMatch[1]);
      console.log('Data loaded dynamically:', data);

      await loadReportsFromData(data);
    } catch (err) {
      console.error('Error loading reports:', err);
      setError(err);
      // Fallback a datos mock si falla la carga
      setReports(await loadMockReports());
    } finally {
      setLoading(false);
    }
  };

  const loadReportsFromData = async (data) => {
    try {
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
      console.error('Error processing reports:', err);
      setReports(await loadMockReports());
    }
  };

  useEffect(() => {
    loadReports();
    // Polling deshabilitado temporalmente para evitar sobrecarga
    // const interval = setInterval(() => {
    //   loadReports();
    // }, 10000);
    // return () => clearInterval(interval);
  }, []);

  return { reports, loading, error, loadReports, loadReportsFromData };
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