#!/usr/bin/env node
/**
 * Utilidades comunes para scripts del proyecto Cypress-ReportingSystem
 * Contiene lógica compartida para manejo de paths, archivos, y operaciones comunes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Rutas importantes del proyecto
 */
export const PATHS = {
  ROOT: path.join(__dirname, '..'),
  SCRIPTS: path.join(__dirname, '..', 'scripts'),
  CYPRESS: path.join(__dirname, '..', 'cypress'),
  REPORTS: path.join(__dirname, '..', 'cypress', 'reports'),
  REPORTS_TMP: path.join(__dirname, '..', 'cypress', 'reports', 'tmp'),
  DOCS: path.join(__dirname, '..', 'docs'),
  DOCS_REPORTS: path.join(__dirname, '..', 'docs', 'reports'),
  PUBLIC: path.join(__dirname, '..', 'public'),
  PUBLIC_REPORTS: path.join(__dirname, '..', 'public', 'reports'),
  ENV_FILE: path.join(__dirname, '..', '.env'),
  ENV_EXAMPLE: path.join(__dirname, '..', '.env.example'),
  PACKAGE_JSON: path.join(__dirname, '..', 'package.json')
};

/**
 * Copia archivo de forma síncrona
 */
export function copyFileSync(source, target) {
  // Crear directorio de destino si no existe
  const targetDir = path.dirname(target);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(target, fs.readFileSync(source));
}

/**
 * Copia directorio recursivamente
 */
export function copyDirSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyDirSync(sourcePath, targetPath);
    } else {
      copyFileSync(sourcePath, targetPath);
    }
  }
}

/**
 * Elimina directorio recursivamente
 */
export function removeDirSync(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

/**
 * Limpia directorio pero mantiene archivos específicos
 */
export function cleanDirSync(dirPath, keepFiles = []) {
  if (!fs.existsSync(dirPath)) return;

  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    if (!keepFiles.includes(item)) {
      const itemPath = path.join(dirPath, item);
      if (fs.lstatSync(itemPath).isDirectory()) {
        removeDirSync(itemPath);
      } else {
        fs.unlinkSync(itemPath);
      }
    }
  }
}

/**
 * Lee archivo JSON de forma segura
 */
export function readJsonFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.warn(`Error leyendo JSON ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Escribe archivo JSON
 */
export function writeJsonFile(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/**
 * Verifica si archivo existe
 */
export function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Lee archivo de texto
 */
export function readFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Escribe archivo de texto
 */
export function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
}

/**
 * Obtiene timestamp actual formateado
 */
export function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}-${minutes}-${seconds}`,
    datetime: `${year}-${month}-${day}T${hours}-${minutes}-${seconds}`
  };
}

/**
 * Formatea fecha para display
 */
export function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('es-ES', options);
}

/**
 * Ejecuta comando del sistema
 */
export function execCommand(command, options = {}) {
  const { execSync } = require('child_process');
  try {
    return execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Error ejecutando comando: ${command}`);
    console.error(error.message);
    throw error;
  }
}

/**
 * Pregunta al usuario por input
 */
export function promptUser(question) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/**
 * Valida configuración del proyecto
 */
export function validateSetup() {
  const errors = [];
  const warnings = [];

  // Verificar archivos esenciales
  if (!fileExists(PATHS.ENV_FILE)) {
    errors.push('Archivo .env no encontrado');
  }

  if (!fileExists(PATHS.PACKAGE_JSON)) {
    errors.push('Archivo package.json no encontrado');
  }

  // Verificar directorios
  if (!fs.existsSync(PATHS.CYPRESS)) {
    errors.push('Directorio cypress/ no encontrado');
  }

  if (!fs.existsSync(path.join(PATHS.CYPRESS, 'e2e'))) {
    warnings.push('Directorio cypress/e2e/ no encontrado - ejecutar setup:tests');
  }

  return { errors, warnings };
}

/**
 * Imprime banner de script
 */
export function printBanner(title, description = '') {
  console.log('='.repeat(60));
  console.log(` ${title}`);
  if (description) {
    console.log(description);
  }
  console.log('='.repeat(60));
}

/**
 * Imprime resultado de operación
 */
export function printResult(success, message) {
  const icon = success ? '✓' : '✗';
  console.log(`${icon} ${message}`);
}

/**
 * Manejo de errores consistente
 */
export function handleError(error, context = '') {
  console.error(` Error${context ? ` en ${context}` : ''}:`, error.message);
  if (process.env.DEBUG) {
    console.error(error.stack);
  }
  process.exit(1);
}