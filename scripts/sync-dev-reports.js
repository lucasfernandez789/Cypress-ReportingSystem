#!/usr/bin/env node
/**
 * Script para sincronizar reportes de la carpeta centralizada al directorio público del proyecto
 * Esto permite que el frontend en desarrollo pueda acceder a los reportes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CONFIG } from './config.js';
import { copyDirSync, removeDirSync } from './utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Rutas
const centralReportsDir = CONFIG.REPORTS_DIR;
const publicReportsDir = path.join(__dirname, '..', 'public', 'cypress', 'reports');
const srcDataDir = path.join(__dirname, '..', 'src', 'data');
const publicDataDir = path.join(__dirname, '..', 'public', 'data');
const reportsDataFile = path.join(srcDataDir, 'reports-data.js');
const publicReportsDataFile = path.join(publicDataDir, 'reports-data.js');

console.log('Sincronizando reportes para desarrollo...');
console.log('Desde:', centralReportsDir);
console.log('Hacia:', publicReportsDir);

// Limpiar directorio público
removeDirSync(publicReportsDir);

// Copiar desde carpeta centralizada
if (fs.existsSync(centralReportsDir)) {
  copyDirSync(centralReportsDir, publicReportsDir);
  
  // Leer el report.json y crear el archivo JS
  const reportJsonPath = path.join(publicReportsDir, 'report.json');
  if (fs.existsSync(reportJsonPath)) {
    const reportData = JSON.parse(fs.readFileSync(reportJsonPath, 'utf8'));
    
    // Crear el archivo JS con los datos
    const jsContent = `// Datos de reportes generados automáticamente
// Este archivo se actualiza automáticamente desde el directorio centralizado de reportes

export const reportsData = ${JSON.stringify(reportData, null, 2)};

export default reportsData;`;
    
    // Asegurar que el directorio src/data existe
    fs.mkdirSync(srcDataDir, { recursive: true });
    
    // Escribir el archivo JS
    fs.writeFileSync(reportsDataFile, jsContent);
    console.log('Archivo reports-data.js actualizado');
    
    // También copiar a public/data/ para acceso desde el navegador
    fs.mkdirSync(publicDataDir, { recursive: true });
    fs.writeFileSync(publicReportsDataFile, jsContent);
    console.log('Archivo reports-data.js copiado a public/data/');
  }
  
  console.log('Reportes sincronizados correctamente');
} else {
  console.log('Carpeta centralizada no existe, creando estructura básica...');
  fs.mkdirSync(publicReportsDir, { recursive: true });
  
  // Crear un report.json básico
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
  
  fs.writeFileSync(path.join(publicReportsDir, 'report.json'), JSON.stringify(basicReport, null, 2));
  
  // Crear también el archivo JS básico
  const jsContent = `// Datos de reportes generados automáticamente
// Este archivo se actualiza automáticamente desde el directorio centralizado de reportes

export const reportsData = ${JSON.stringify(basicReport, null, 2)};

export default reportsData;`;
  
  fs.mkdirSync(srcDataDir, { recursive: true });
  fs.writeFileSync(reportsDataFile, jsContent);
  
  console.log('Estructura básica creada');
}