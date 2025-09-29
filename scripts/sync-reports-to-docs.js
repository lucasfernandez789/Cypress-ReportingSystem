#!/usr/bin/env node
/**
 * Script para sincronizar reportes desde cypress/reports hacia docs/reports
 * Mantiene cypress/reports como fuente única de verdad
 * Copia reportes necesarios a docs/reports para GitHub Pages
 */

const fs = require('fs');
const path = require('path');

function copyFileSync(source, target) {
  // Crear directorio de destino si no existe
  const targetDir = path.dirname(target);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(target, fs.readFileSync(source));
}

function copyDirSync(source, target) {
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

function syncReportsToDocsFolder() {
  const sourceDir = path.join(__dirname, '..', 'cypress', 'reports');
  const docsReportsDir = path.join(__dirname, '..', 'docs', 'reports');

  // Limpiar directorio de destino (excepto index.html que se regenerará)
  if (fs.existsSync(docsReportsDir)) {
    const items = fs.readdirSync(docsReportsDir);
    for (const item of items) {
      if (item !== 'index.html') {
        const itemPath = path.join(docsReportsDir, item);
        if (fs.lstatSync(itemPath).isDirectory()) {
          fs.rmSync(itemPath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(itemPath);
        }
      }
    }
  }

  // Crear directorio de destino si no existe
  if (!fs.existsSync(docsReportsDir)) {
    fs.mkdirSync(docsReportsDir, { recursive: true });
  }

  const reportFiles = [];

  // Copiar reportes y escanear
  function copyAndScanReports(dir, relativePath = '') {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.includes('mocha')) {
        // Copiar directorio completo a docs/reports
        const targetDir = path.join(docsReportsDir, relativePath, item);
        copyDirSync(fullPath, targetDir);
        
        // Continuar escaneando
        copyAndScanReports(fullPath, path.join(relativePath, item));
      } else if (item.endsWith('.html') && item.startsWith('report-')) {
        // Si el reporte está en la raíz, copiarlo también
        if (relativePath === '') {
          const targetFile = path.join(docsReportsDir, item);
          copyFileSync(fullPath, targetFile);
        }
        
        // Registrar para el índice
        const date = item.match(/report-(\d{4}-\d{2}-\d{2})/)?.[1] || 'unknown';
        const time = item.match(/T(\d{2}-\d{2}-\d{2})/)?.[1]?.replace(/-/g, ':') || 'unknown';

        reportFiles.push({
          file: path.join(relativePath, item).replace(/\\/g, '/'),
          date: date,
          time: time,
          fullDate: new Date(date + 'T' + time.replace(/:/g, '-') + ':00')
        });
      }
    }
  }

  copyAndScanReports(sourceDir);

  // Ordenar por fecha descendente
  reportFiles.sort((a, b) => b.fullDate - a.fullDate);

  // Generar index.html para docs/reports
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
                <strong>Nota:</strong> Los reportes se sincronizan automáticamente desde cypress/reports/.
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
                <a href="${report.file}" class="text-blue-500 no-underline font-bold text-base hover:underline" target="_blank">
                    Reporte ${report.time}
                </a>
                <div class="text-gray-600 text-sm mt-1.5">
                    ${report.time} | ${report.file}
                </div>
            </div>`;

          return acc;
        }, '')}
    </div>
</body>
</html>`;

  const docsIndexPath = path.join(docsReportsDir, 'index.html');
  fs.writeFileSync(docsIndexPath, docsIndexHtml);

  console.log(`✅ Reportes sincronizados en docs: ${docsIndexPath}`);
  console.log(`📊 Total de reportes encontrados: ${reportFiles.length}`);
  console.log(`📁 Archivos copiados desde cypress/reports/ a docs/reports/`);
}

syncReportsToDocsFolder();