#!/usr/bin/env node
/**
 * Script para generar reportes con timestamp
 * Reemplaza el comando inline en package.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { CONFIG, SYSTEM_INFO } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function generateTimestampedReport() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const date = `${year}-${month}-${day}`;
  const time = `${hours}-${minutes}-${seconds}`;

  // Crear directorio con estructura APP_NAME/fecha_APP_NAME
  const baseReportsDir = CONFIG.REPORTS_DIR.startsWith('/') || CONFIG.REPORTS_DIR.includes(':')
    ? CONFIG.REPORTS_DIR  // Ruta absoluta
    : path.join(__dirname, '..', CONFIG.REPORTS_DIR); // Ruta relativa

  // Crear carpeta del sistema si no existe
  const systemDir = path.join(baseReportsDir, CONFIG.APP_NAME);
  fs.mkdirSync(systemDir, { recursive: true });

  const folderName = `${date}_${CONFIG.APP_NAME}`;
  const reportsDir = path.join(systemDir, folderName);
  fs.mkdirSync(reportsDir, { recursive: true });

  // Generar reporte HTML
  const reportJsonPath = path.join(CONFIG.REPORTS_DIR, 'report.json');
  const assetsDir = path.join(reportsDir, 'assets');
  const reportFilename = `report-${date}T${time}.html`;

  const command = `marge "${reportJsonPath}" --reportDir "${reportsDir}" --assetsDir "${assetsDir}" --reportFilename "${reportFilename}"`;

  try {
    execSync(command, { stdio: 'inherit' });
    const reportPath = path.join(reportsDir, reportFilename);
    console.log(`Reporte generado: ${reportPath}`);
  } catch (error) {
    console.error('Error generando reporte:', error.message);
    process.exit(1);
  }
}

generateTimestampedReport();