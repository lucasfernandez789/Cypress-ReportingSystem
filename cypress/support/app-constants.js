/**
 * Constantes específicas para la aplicación CYPRESS
 *
 * Este archivo contiene constantes específicas para la aplicación de leyes,
 * incluyendo URLs, selectores, mensajes y configuraciones particulares.
 */

/**
 * URLs y endpoints específicos de la aplicación
 */
export const APP_ENDPOINTS = {
  // URL base de la aplicación de leyes
  BASE_URL: 'https://testing.hlt.gob:3008/',
  // Endpoint de login
  LOGIN: '/#/login',
  // Endpoint de leyes privadas
  LEYES_PRIVADO: '/#/login',
};

/**
 * Selectores CSS específicos de la aplicación
 */
export const APP_SELECTORS = {
  // Botones principales
  BOTON_MENU_HAMBURGUESA: '[data-testid="MenuIcon"]',
  BOTON_NUEVA_LEY: '[data-cy="nueva-ley-btn"]',

  // Formularios
  FORM_ID_LEY: '#idLey',
  FORM_TITULO_LEY: '#tituloLey',
  FORM_DESCRIPCION_LEY: '#descripcionLey',

  // Tablas y listas
  TABLA_LEYES: '.leyes-table',
  FILA_LEY: '.ley-row',

  // Modales y dialogs
  MODAL_CONFIRMACION: '.confirmation-modal',
  MODAL_EDITAR_LEY: '.edit-ley-modal',
};

/**
 * Mensajes y textos de la aplicación
 */
export const APP_MESSAGES = {
  // Mensajes de éxito
  LEY_CREADA: 'Ley creada exitosamente',
  LEY_EDITADA: 'Ley editada exitosamente',
  LEY_ELIMINADA: 'Ley eliminada exitosamente',

  // Mensajes de error
  ERROR_CREAR_LEY: 'Error al crear la ley',
  ERROR_EDITAR_LEY: 'Error al editar la ley',
  ERROR_ELIMINAR_LEY: 'Error al eliminar la ley',

  // Mensajes de validación
  VALIDACION_ID_REQUERIDO: 'El ID de la ley es requerido',
  VALIDACION_TITULO_REQUERIDO: 'El título de la ley es requerido',
};

/**
 * Configuraciones específicas de la aplicación
 */
export const APP_CONFIG = {
  // Timeouts
  TIMEOUT_CARGA_PAGINA: 10000,
  TIMEOUT_ELEMENTO_VISIBLE: 5000,

  // Delays
  DELAY_CLICK: 500,
  DELAY_TYPE: 100,

  // Selectores de carga
  LOADING_SPINNER: '.loading-spinner',
  LOADING_OVERLAY: '.loading-overlay',
};

/**
 * Datos de prueba
 */
export const TEST_DATA = {
  // Usuario de prueba
  USUARIO_PRUEBA: {
    username: 'testuser',
    password: 'testpass123'
  },

  // Datos de ley de prueba
  LEY_PRUEBA: {
    id: '12345',
    titulo: 'Ley de Prueba Automatizada',
    descripcion: 'Esta es una ley creada por pruebas automatizadas'
  }
};