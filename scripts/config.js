#!/usr/bin/env node
/**
 * Módulo de configuración centralizada para variables de entorno
 * Lee y valida todas las variables de entorno del sistema
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Carga y valida las variables de entorno desde .env
 * @returns {Object} Configuración validada
 */
export function loadConfig() {
  // Cargar variables de entorno desde .env si existe
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = parseEnvFile(envContent);

    // Aplicar las variables al process.env
    Object.assign(process.env, envVars);
  }

  const config = {
    // Credenciales
    USER: process.env.USER || 'default-user',
    PASS: process.env.PASS || 'default-pass',

    // URLs
    CYPRESS_BASE_URL: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',

    // Configuración de reportes
    VITE_REPORTS_BASE_URL: process.env.VITE_REPORTS_BASE_URL,
    VITE_REPORTS_REPO_OWNER: process.env.VITE_REPORTS_REPO_OWNER || 'lucasfernandez789',
    VITE_REPORTS_REPO_NAME: process.env.VITE_REPORTS_REPO_NAME || 'Cypress-ReportingSystem',

    // Sistema
    APP_NAME: process.env.APP_NAME || 'Cypress-ReportingSystem',
    REPORTS_DIR: process.env.REPORTS_DIR || 'cypress/reports',
    REPORTS_BASE_URL: process.env.REPORTS_BASE_URL,

    // Rutas de specs de Cypress
    CYPRESS_CORE_SPECS: process.env.CYPRESS_CORE_SPECS || 'cypress/e2e/core/*.cy.js',
    CYPRESS_FEATURES_SPECS: process.env.CYPRESS_FEATURES_SPECS || 'cypress/e2e/features/*.cy.js',
    CYPRESS_ALL_SPECS: process.env.CYPRESS_ALL_SPECS || 'cypress/e2e/**/*.cy.js',

    // Configuración avanzada
    CYPRESS_VIEWPORT_WIDTH: parseInt(process.env.CYPRESS_VIEWPORT_WIDTH) || 1280,
    CYPRESS_VIEWPORT_HEIGHT: parseInt(process.env.CYPRESS_VIEWPORT_HEIGHT) || 720,
    CYPRESS_DEFAULT_COMMAND_TIMEOUT: parseInt(process.env.CYPRESS_DEFAULT_COMMAND_TIMEOUT) || 4000,
    CYPRESS_REQUEST_TIMEOUT: parseInt(process.env.CYPRESS_REQUEST_TIMEOUT) || 5000,

    // Configuración de retención
    REPORTS_RETENTION_DAYS: parseInt(process.env.REPORTS_RETENTION_DAYS) || 30,
    REPORTS_MAX_FILES_PER_DATE: parseInt(process.env.REPORTS_MAX_FILES_PER_DATE) || 50,
  };

  // Validaciones
  validateConfig(config);

  return config;
}

/**
 * Parsea un archivo .env básico
 * @param {string} content - Contenido del archivo .env
 * @returns {Object} Variables parseadas
 */
function parseEnvFile(content) {
  const vars = {};
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remover comillas
        vars[key] = value;
      }
    }
  }

  return vars;
}

/**
 * Valida la configuración cargada
 * @param {Object} config - Configuración a validar
 */
function validateConfig(config) {
  const errors = [];

  // Validar URLs
  if (config.CYPRESS_BASE_URL && !isValidUrl(config.CYPRESS_BASE_URL)) {
    errors.push(`CYPRESS_BASE_URL no es una URL válida: ${config.CYPRESS_BASE_URL}`);
  }

  if (config.VITE_REPORTS_BASE_URL && !isValidUrl(config.VITE_REPORTS_BASE_URL)) {
    errors.push(`VITE_REPORTS_BASE_URL no es una URL válida: ${config.VITE_REPORTS_BASE_URL}`);
  }

  // Validar rutas
  if (config.REPORTS_DIR && !path.isAbsolute(config.REPORTS_DIR)) {
    // Convertir ruta relativa a absoluta
    config.REPORTS_DIR = path.resolve(process.cwd(), config.REPORTS_DIR);
  }

  // Validar valores numéricos
  if (config.CYPRESS_VIEWPORT_WIDTH <= 0) {
    errors.push('CYPRESS_VIEWPORT_WIDTH debe ser mayor que 0');
  }

  if (config.CYPRESS_VIEWPORT_HEIGHT <= 0) {
    errors.push('CYPRESS_VIEWPORT_HEIGHT debe ser mayor que 0');
  }

  if (errors.length > 0) {
    console.error('Errores de configuración:');
    errors.forEach(error => console.error(`  - ${error}`));
    throw new Error('Configuración inválida');
  }
}

/**
 * Valida si una cadena es una URL válida
 * @param {string} url - URL a validar
 * @returns {boolean} True si es válida
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Obtiene información derivada del sistema
 * @param {Object} config - Configuración base
 * @returns {Object} Información del sistema
 */
export function getSystemInfo(config) {
  return {
    systemName: config.APP_NAME,
    systemId: config.APP_NAME.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    reportsDir: config.REPORTS_DIR,
    reportsBaseUrl: config.REPORTS_BASE_URL || config.VITE_REPORTS_BASE_URL,
  };
}

// Exportar configuración por defecto
export const CONFIG = loadConfig();
export const SYSTEM_INFO = getSystemInfo(CONFIG);