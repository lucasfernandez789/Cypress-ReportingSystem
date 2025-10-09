#!/usr/bin/env node
/**
 * Script para eliminar una ejecución específica de reporte
 * Uso: npm run delete-report "2025-10-09" "2025-10-09/report-2025-10-09T14-30-21.html"
 */

const fs = require('fs');
const path = require('path');

// Obtener parámetros de la línea de comandos
const [,, date, filePath] = process.argv;

if (!date || !filePath) {
  console.error('Uso: npm run delete-report "fecha" "ruta-del-archivo"');
  console.error('Ejemplo: npm run delete-report "2025-10-09" "2025-10-09/report-2025-10-09T14-30-21.html"');
  process.exit(1);
}

function deleteReportExecution(targetDate, targetFilePath) {
  const cypressReportsDir = path.join(__dirname, '..', 'cypress', 'reports');
  const publicReportsDir = path.join(__dirname, '..', 'public', 'reports');
  const docsReportsDir = path.join(__dirname, '..', 'docs', 'reports');

  console.log(`Eliminando ejecución: ${targetDate} - ${targetFilePath}`);

  // Función para eliminar archivo si existe
  const deleteFileIfExists = (baseDir, file) => {
    const fullPath = path.join(baseDir, file);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`✅ Eliminado: ${fullPath}`);
      return true;
    }
    return false;
  };

  // Eliminar de cypress/reports
  const deletedFromCypress = deleteFileIfExists(cypressReportsDir, targetFilePath);

  // Eliminar de public/reports
  const deletedFromPublic = deleteFileIfExists(publicReportsDir, targetFilePath);

  // Eliminar de docs/reports
  const deletedFromDocs = deleteFileIfExists(docsReportsDir, targetFilePath);

  if (deletedFromCypress || deletedFromPublic || deletedFromDocs) {
    console.log('🔄 Regenerando archivo report.json...');

    // Regenerar el archivo JSON sin la ejecución eliminada
    const generateReportsJson = require('./generate-reports-json');
    const outputFile = path.join(docsReportsDir, 'report.json');
    generateReportsJson(cypressReportsDir, outputFile);

    // Copiar a public/reports
    const publicJsonPath = path.join(publicReportsDir, 'report.json');
    fs.copyFileSync(outputFile, publicJsonPath);

    console.log('✅ Archivo report.json actualizado');
    console.log('💡 Recarga la página web para ver los cambios');
  } else {
    console.log('⚠️  No se encontró el archivo especificado');
  }
}

deleteReportExecution(date, filePath);