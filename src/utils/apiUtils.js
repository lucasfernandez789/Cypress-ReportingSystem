/**
 * Utilidades de API para el sistema de reportes Cypress.
 *
 * Proporciona funciones consistentes de llamadas a API y manejo de errores.
 */

import { API_ENDPOINTS, API_CONFIG } from '../constants/constants';

/**
 * Realiza una petición GET al endpoint de API especificado.
 *
 * @param {string} endpoint - URL del endpoint de API
 * @param {Object} [options] - Opciones de fetch
 * @returns {Promise<Object>} Datos de respuesta
 * @throws {Error} Si la petición falla
 *
 * @example
 * ```js
 * const data = await apiGet('/api/reports');
 * ```
 */
export async function apiGet(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API GET error for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Realiza una petición POST al endpoint de API especificado.
 *
 * @param {string} endpoint - URL del endpoint de API
 * @param {Object} data - Datos a enviar en el cuerpo de la petición
 * @param {Object} [options] - Opciones adicionales de fetch
 * @returns {Promise<Object>} Datos de respuesta
 * @throws {Error} Si la petición falla
 *
 * @example
 * ```js
 * const result = await apiPost('/api/reports', { date: '2024-01-01' });
 * ```
 */
export async function apiPost(endpoint, data, options = {}) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API POST error for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Realiza una petición DELETE al endpoint de API especificado.
 *
 * @param {string} endpoint - URL del endpoint de API
 * @param {Object} [options] - Opciones adicionales de fetch
 * @returns {Promise<Object>} Datos de respuesta
 * @throws {Error} Si la petición falla
 *
 * @example
 * ```js
 * const result = await apiDelete('/api/reports/123');
 * ```
 */
export async function apiDelete(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API DELETE error for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Carga datos de reportes desde el endpoint de reportes.
 *
 * @returns {Promise<Object>} Datos de reportes
 * @throws {Error} Si la carga falla
 *
 * @example
 * ```js
 * const reports = await loadReportsData();
 * ```
 */
export async function loadReportsData() {
  return await apiGet(API_ENDPOINTS.REPORTS_DATA);
}

/**
 * Elimina una ejecución de reporte vía API.
 *
 * @param {string} date - Fecha del reporte
 * @param {string} filePath - Ruta del archivo del reporte
 * @returns {Promise<Object>} Resultado de la eliminación
 * @throws {Error} Si la eliminación falla
 *
 * @example
 * ```js
 * const result = await deleteReportExecution('2024-01-01', '/path/to/report.html');
 * ```
 */
export async function deleteReportExecution(date, filePath) {
  return await apiDelete(API_ENDPOINTS.DELETE_REPORT, {
    body: JSON.stringify({ date, filePath }),
  });
}

/**
 * Verifica si el servidor API está disponible.
 *
 * @returns {Promise<boolean>} Si el servidor API está accesible
 *
 * @example
 * ```js
 * const isAvailable = await checkApiServer();
 * ```
 */
export async function checkApiServer() {
  try {
    await apiGet(`${API_CONFIG.SERVER_HOST}:${API_CONFIG.SERVER_PORT}/health`);
    return true;
  } catch (error) {
    return false;
  }
}