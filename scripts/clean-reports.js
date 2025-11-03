#!/usr/bin/env node
/**
 * Script cross-platform para limpiar reportes
 * Reemplaza el comando específico de Windows en package.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function cleanReports() {
  const mochaDir = path.join(__dirname, '..', 'cypress', 'reports', 'mocha');
  const reportJsonPath = path.join(__dirname, '..', 'cypress', 'reports', 'report.json');

  // Limpiar archivos JSON de mocha
  if (fs.existsSync(mochaDir)) {
    const files = fs.readdirSync(mochaDir);
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(mochaDir, file);
        try {
          fs.unlinkSync(filePath);
          console.log(`Eliminado: ${file}`);
        } catch (error) {
          console.warn(`No se pudo eliminar ${file}:`, error.message);
        }
      }
    });
  }

  // Limpiar report.json principal
  if (fs.existsSync(reportJsonPath)) {
    try {
      fs.unlinkSync(reportJsonPath);
      console.log('Eliminado: report.json');
    } catch (error) {
      console.warn('No se pudo eliminar report.json:', error.message);
    }
  }
}

cleanReports();