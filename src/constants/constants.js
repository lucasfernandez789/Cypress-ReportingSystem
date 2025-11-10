/**
 * Constantes centralizadas para el Sistema de Reportes Cypress.
 *
 * Este archivo contiene todos los valores de configuración, URLs, mensajes y otras
 * constantes utilizadas en toda la aplicación. Centralizar estos valores
 * mejora la mantenibilidad y reduce las cadenas mágicas en el código.
 */

/**
 * Endpoints de API y URLs
 */
export const API_ENDPOINTS = {
  // URL base para reportes (configurable por fork)
  REPORTS_BASE_URL: import.meta.env.VITE_REPORTS_BASE_URL || `${import.meta.env.BASE_URL}cypress/reports`,
  // URL completa para el archivo JSON de reportes
  REPORTS_DATA: import.meta.env.DEV
    ? `${import.meta.env.BASE_URL}cypress/reports/report.json`
    : `${import.meta.env.VITE_REPORTS_BASE_URL || import.meta.env.BASE_URL}cypress/reports/report.json`,
  DELETE_REPORT: 'http://localhost:3001/api/delete-report',
};

/**
 * Configuración del repositorio (para forks)
 */
export const REPO_CONFIG = {
  OWNER: import.meta.env.VITE_REPORTS_REPO_OWNER || 'lucasfernandez789',
  NAME: import.meta.env.VITE_REPORTS_REPO_NAME || 'Cypress-ReportingSystem',
  BASE_URL: import.meta.env.DEV
    ? `${import.meta.env.BASE_URL}reports`
    : import.meta.env.VITE_REPORTS_BASE_URL || `${import.meta.env.BASE_URL}reports`,
};

/**
 * Categorías de reportes disponibles en el sistema
 */
export const REPORT_CATEGORIES = {
  CORE: 'core',
  FEATURES: 'features',
  MIXED: 'mixed',
  OTHER: 'other',
};

/**
 * Identificadores de páginas de navegación
 */
export const PAGES = {
  HOME: 'home',
  CORE: 'core',
  FEATURES: 'features',
  MIXED: 'mixed',
};

/**
 * Configuración de paginación
 */
export const PAGINATION = {
  ITEMS_PER_PAGE: 5,
  DEFAULT_PAGE: 1,
};

/**
 * Valores por defecto para filtros de fecha
 */
export const DATE_FILTERS = {
  DEFAULT_FROM: '1900-01-01',
  DEFAULT_TO: '2100-12-31',
};

/**
 * Mensajes de interfaz de usuario y etiquetas
 */
export const UI_MESSAGES = {
  CONFIRM_DELETE_EXECUTION: '¿Estás seguro de que quieres eliminar esta ejecución?\n\nFecha: {date}\nArchivo: {filePath}',
  DELETE_SUCCESS: ' Ejecución eliminada correctamente',
  DELETE_ERROR: ' Error al eliminar la ejecución: {error}',
  CONNECTION_ERROR: ' Error de conexión. Asegúrate de que el servidor API esté corriendo:\n\nnpm run api-server\n\nError: {error}',
  NO_REPORTS_AVAILABLE: 'No hay reportes disponibles',
  REPORTS_WILL_APPEAR: 'Los reportes aparecerán aquí después de ejecutar los tests',
  NO_CORE_REPORTS: 'No hay reportes de Core disponibles',
  NO_FEATURES_REPORTS: 'No hay reportes de Features disponibles',
  NO_MIXED_REPORTS: 'No hay reportes de Mixed disponibles',
};

/**
 * Etiquetas de accesibilidad y texto para lectores de pantalla
 */
export const ACCESSIBILITY = {
  OPEN_MAIN_MENU: 'Abrir menú principal',
  CLOSE_MENU: 'Cerrar menú',
  BACK_BUTTON: 'Volver',
  LOGO_ALT: 'Legislatura Logo',
  ARROW_LEFT_ALT: 'back',
};

/**
 * Nombres de clases CSS y constantes de estilos
 */
export const STYLES = {
  NAV_HEIGHT: 'h-16',
  MOBILE_MENU_WIDTH: 'w-64',
  LOGO_HEIGHT: 'h-10',
  LOGO_HEIGHT_MOBILE: 'h-8',
};

/**
 * Configuración de estadísticas de reportes
 */
export const REPORT_STATS = {
  PASSES_DEFAULT: 1,
  FAILURES_DEFAULT: 0,
  TOTAL_DEFAULT: 1,
};

/**
 * Rutas de archivos y ubicaciones de assets
 */
export const ASSETS = {
  LOGO_IMAGE: `${import.meta.env.BASE_URL}assets/images/logo-legis-act-D-yCoXSC.png`,
  ARROW_LEFT_ICON: `${import.meta.env.BASE_URL}assets/images/arrow_left_alt_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg`,
};

/**
 * Configuración del servidor API
 */
export const API_CONFIG = {
  SERVER_HOST: 'localhost',
  SERVER_PORT: 3001,
};