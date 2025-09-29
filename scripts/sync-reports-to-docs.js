#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * Script para sincronizar reportes desde cypress/reports hacia docs/reports
 * Mantiene cypress/reports como fuente única de verdad
 * docs/reports solo contiene enlaces/índices para GitHub Pages
 */

function syncReportsToDocsFolder() {
  const sourceDir = path.join(__dirname, '..', 'cypress', 'reports');
  const docsReportsDir = path.join(__dirname, '..', 'docs', 'reports');

  // Crear directorio de destino si no existe
  if (!fs.existsSync(docsReportsDir)) {
    fs.mkdirSync(docsReportsDir, { recursive: true });
  }

  // Crear un índice que apunte a los reportes reales
  const reportFiles = [];

  function scanSourceDirectory(dir, relativePath = '') {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.includes('mocha') && !item.includes('assets')) {
        scanSourceDirectory(fullPath, path.join(relativePath, item));
      } else if (item.endsWith('.html') && item.startsWith('report-')) {
        const date = item.match(/report-(\d{4}-\d{2}-\d{2})/)?.[1] || 'unknown';
        const time = item.match(/T(\d{2}-\d{2}-\d{2})/)?.[1]?.replace(/-/g, ':') || 'unknown';

        reportFiles.push({
          file: path.join(relativePath, item).replace(/\\/g, '/'),
          date: date,
          time: time,
          fullDate: new Date(date + 'T' + time.replace(/:/g, '-') + ':00'),
          sourceUrl: `../../cypress/reports/${path.join(relativePath, item).replace(/\\/g, '/')}`
        });
      }
    }
  }

  scanSourceDirectory(sourceDir);

  // Ordenar por fecha descendente
  reportFiles.sort((a, b) => b.fullDate - a.fullDate);

  // Generar index.html para docs/reports que apunte a cypress/reports
  const docsIndexHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reportes de Testing Cypress</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans m-5 bg-gray-100">
    <div class="max-w-[1200px] mx-auto bg-white p-5 rounded-lg shadow-md">
        <div class="mb-6">
            <a href="../index.html" class="text-blue-500 hover:text-blue-700 text-sm">&larr; Volver al inicio</a>
        </div>
        
        <h1 class="text-gray-800 border-b-2 border-blue-500 pb-2.5">Reportes de Testing Cypress</h1>
        <p class="font-bold mb-4">Total de reportes: ${reportFiles.length}</p>
        
        <div class="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
            <p class="text-sm text-blue-800">
                <strong>Nota:</strong> Los reportes se almacenan en <code>cypress/reports/</code> y se sincronizan automáticamente.
            </p>
        </div>

        ${reportFiles.reduce((acc, report, index) => {
          const currentDate = report.date;
          const prevDate = index > 0 ? reportFiles[index - 1].date : null;

          if (currentDate !== prevDate) {
            acc += `
        <div class="my-7.5">
            <div class="bg-blue-500 text-white p-2.5 rounded mb-2.5">${currentDate}</div>`;
          }

          acc += `
            <div class="border border-gray-300 my-2.5 p-4 rounded bg-gray-50 hover:bg-blue-50">
                <a href="${report.sourceUrl}" class="text-blue-500 no-underline font-bold text-base hover:underline" target="_blank">
                    Reporte ${report.time}
                </a>
                <div class="text-gray-600 text-sm mt-1.5">
                    ${report.time} | Fuente: cypress/reports/${report.file}
                </div>
            </div>`;

          return acc;
        }, '')}
    </div>
</body>
</html>`;

  const docsIndexPath = path.join(docsReportsDir, 'index.html');
  fs.writeFileSync(docsIndexPath, docsIndexHtml);

  console.log(`✅ Índice de reportes sincronizado en docs: ${docsIndexPath}`);
  console.log(`📊 Total de reportes encontrados: ${reportFiles.length}`);
}

syncReportsToDocsFolder();