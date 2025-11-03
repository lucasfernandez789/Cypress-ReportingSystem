#!/usr/bin/env node
/**
 * Script para generar reportes con timestamp
 * Reemplaza el comando inline en package.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

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

  // Crear directorio si no existe
  const reportsDir = path.join(__dirname, '..', 'cypress', 'reports', date);
  fs.mkdirSync(reportsDir, { recursive: true });

  // Generar reporte HTML
  const reportJsonPath = path.join(__dirname, '..', 'cypress', 'reports', 'report.json');
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