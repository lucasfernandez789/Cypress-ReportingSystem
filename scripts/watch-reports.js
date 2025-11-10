#!/usr/bin/env node
/**
 * Watcher automático para sincronización de reportes
 * Monitorea cambios en el directorio centralizado y sincroniza automáticamente
 */

import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { CONFIG } from './config.js';
import { copyDirSync, removeDirSync } from './utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Rutas de origen y destino
const sourceDir = CONFIG.REPORTS_DIR;
const destDir = path.join(__dirname, '..', 'public', 'cypress', 'reports');
const dataFile = path.join(__dirname, '..', 'src', 'data', 'reports-data.js');
const publicDataFile = path.join(__dirname, '..', 'public', 'data', 'reports-data.js');

console.log('Iniciando watcher de reportes...');
console.log(`Monitoreando: ${sourceDir}`);
console.log(`Sincronizando a: ${destDir}`);
console.log('');

// Verificar que el directorio fuente existe
if (!fs.existsSync(sourceDir)) {
  console.error(` Error: Directorio de reportes no existe: ${sourceDir}`);
  console.log(' Asegúrate de configurar REPORTS_DIR correctamente en tu .env');
  process.exit(1);
}

// Función para sincronizar reportes
function syncReports() {
  try {
    console.log('Sincronizando reportes...');

    // Limpiar directorio destino
    removeDirSync(destDir);

    // Copiar desde fuente
    if (fs.existsSync(sourceDir)) {
      copyDirSync(sourceDir, destDir);

      // Verificar si existe report.json para generar el archivo JS
      const reportJsonPath = path.join(destDir, 'report.json');
      if (fs.existsSync(reportJsonPath)) {
        const reportData = JSON.parse(fs.readFileSync(reportJsonPath, 'utf8'));

        // Crear el archivo JS con los datos
        const jsContent = `// Datos de reportes generados automáticamente
// Este archivo se actualiza automáticamente desde el directorio centralizado de reportes

export const reportsData = ${JSON.stringify(reportData, null, 2)};

export default reportsData;`;

        // Asegurar que el directorio src/data existe
        const dataDir = path.dirname(dataFile);
        fs.mkdirSync(dataDir, { recursive: true });

        // Escribir el archivo JS
        fs.writeFileSync(dataFile, jsContent);
        console.log('Archivo reports-data.js actualizado');

        // También copiar a public/data/ para acceso desde el navegador
        const publicDataDir = path.dirname(publicDataFile);
        fs.mkdirSync(publicDataDir, { recursive: true });
        fs.writeFileSync(publicDataFile, jsContent);
        console.log('Archivo reports-data.js copiado a public/data/');
      }

      console.log('Reportes sincronizados correctamente');
    } else {
      console.log('Directorio fuente vacío, creando estructura básica...');
      fs.mkdirSync(destDir, { recursive: true });

      // Crear report.json básico
      const basicReport = [{
        date: new Date().toISOString().split('T')[0],
        files: [],
        dateFormatted: new Date().toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        executions: 0,
        lastExecution: ''
      }];

      fs.writeFileSync(path.join(destDir, 'report.json'), JSON.stringify(basicReport, null, 2));
    }
  } catch (error) {
    console.error('Error durante sincronización:', error.message);
  }
}

// Sistema de debouncing para evitar sincronizaciones excesivas
let syncTimeout = null;
const DEBOUNCE_DELAY = 1000; // 1 segundo de espera

function debounceSync() {
  if (syncTimeout) {
    clearTimeout(syncTimeout);
  }
  syncTimeout = setTimeout(() => {
    syncReports();
  }, DEBOUNCE_DELAY);
}

// Sincronización inicial
console.log(' Realizando sincronización inicial...');
syncReports();

// Configurar watcher con configuración optimizada
const watcher = chokidar.watch(sourceDir, {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  },
  ignored: [
    /(^|[\/\\])\../, // Archivos ocultos
    '**/node_modules/**',
    '**/.git/**',
    '**/*.tmp', // Archivos temporales
    '**/*.log', // Archivos de log
    '**/Thumbs.db', // Archivos de Windows
    '**/.DS_Store' // Archivos de macOS
  ],
  ignorePermissionErrors: true,
  atomic: true // Para archivos que se escriben atómicamente
});

// Eventos del watcher
watcher.on('add', (filePath) => {
  const relativePath = path.relative(sourceDir, filePath);
  console.log(`Archivo nuevo detectado: ${relativePath}`);
  debounceSync();
});

watcher.on('change', (filePath) => {
  const relativePath = path.relative(sourceDir, filePath);
  console.log(`Archivo modificado: ${relativePath}`);
  debounceSync();
});

watcher.on('unlink', (filePath) => {
  const relativePath = path.relative(sourceDir, filePath);
  console.log(`Archivo eliminado: ${relativePath}`);
  debounceSync();
});

watcher.on('addDir', (dirPath) => {
  const relativePath = path.relative(sourceDir, dirPath);
  console.log(`Directorio nuevo detectado: ${relativePath}`);
  debounceSync();
});

watcher.on('unlinkDir', (dirPath) => {
  const relativePath = path.relative(sourceDir, dirPath);
  console.log(`Directorio eliminado: ${relativePath}`);
  debounceSync();
});

watcher.on('error', (error) => {
  console.error(' Error en watcher:', error);
});

console.log('');
console.log('Watcher activo y monitoreando cambios...');
console.log('Los reportes se sincronizarán automáticamente cuando cambien.');
console.log('Presiona Ctrl+C para detener el watcher.');
console.log('');

// Mantener el proceso vivo
process.on('SIGINT', () => {
  console.log('');
  console.log('Deteniendo watcher...');
  watcher.close();
  process.exit(0);
});