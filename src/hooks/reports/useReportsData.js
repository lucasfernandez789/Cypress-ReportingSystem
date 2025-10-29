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

      // Cargar datos de reportes desde archivos JSON en cypress/reports/
      const reports = await loadReportsFromDirectory();

      setReports(reports);
    } catch (err) {
      setError(err);
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
 * Carga reportes desde el directorio de reportes de Cypress.
 * En una implementación real, esto escanearía el directorio y cargaría archivos JSON.
 *
 * @returns {Promise<Array>} Reportes cargados
 */
async function loadReportsFromDirectory() {
  // Simular carga de reportes - en producción esto cargaría desde cypress/reports/
  const mockReports = [
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

  return mockReports;
}