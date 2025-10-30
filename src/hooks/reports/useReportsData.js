import { useState, useEffect } from 'react';

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

      // Cargar datos de reportes desde public/reports/report.json
      const response = await fetch('/reports/report.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Procesar y enriquecer los datos con estadísticas
      const processedReports = await Promise.all(
        data.map(async (dateGroup) => {
          const enrichedFiles = await Promise.all(
            dateGroup.files.map(async (file) => {
              // Intentar cargar estadísticas del reporte HTML
              const stats = await loadReportStats(file.path);
              return {
                ...file,
                name: `Reporte ${file.category.charAt(0).toUpperCase() + file.category.slice(1)}`,
                stats: stats || {
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
 * Carga estadísticas de un reporte HTML específico.
 * Intenta extraer información del archivo HTML del reporte.
 *
 * @param {string} reportPath - Ruta relativa del reporte
 * @returns {Promise<Object|null>} Estadísticas del reporte o null si falla
 */
async function loadReportStats(reportPath) {
  try {
    const response = await fetch(`/${reportPath}`);
    if (!response.ok) return null;

    const html = await response.text();

    // Extraer estadísticas del HTML usando expresiones regulares
    const stats = {
      suites: extractNumber(html, /Suites:\s*(\d+)/) || 1,
      tests: extractNumber(html, /Tests:\s*(\d+)/) || 1,
      passes: extractNumber(html, /Passes:\s*(\d+)/) || 1,
      failures: extractNumber(html, /Failures:\s*(\d+)/) || 0,
      total: extractNumber(html, /Total:\s*(\d+)/) || 1,
      duration: extractDuration(html) || 1000
    };

    return stats;
  } catch (err) {
    console.warn(`Could not load stats for ${reportPath}:`, err);
    return null;
  }
}

/**
 * Extrae un número de una cadena usando expresión regular.
 *
 * @param {string} text - Texto a buscar
 * @param {RegExp} regex - Expresión regular con grupo de captura
 * @returns {number|null} Número extraído o null
 */
function extractNumber(text, regex) {
  const match = text.match(regex);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Extrae duración del reporte en milisegundos.
 *
 * @param {string} html - Contenido HTML del reporte
 * @returns {number|null} Duración en ms o null
 */
function extractDuration(html) {
  // Buscar patrón como "Duration: 5 seconds" o "Duration: 2.5 seconds"
  const match = html.match(/Duration:\s*([\d.]+)\s*seconds?/i);
  if (match) {
    return Math.round(parseFloat(match[1]) * 1000);
  }
  return null;
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