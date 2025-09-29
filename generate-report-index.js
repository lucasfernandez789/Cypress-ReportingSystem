#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function generateReportIndex() {
  const reportsDir = path.join(__dirname, 'cypress', 'reports');

  if (!fs.existsSync(reportsDir)) {
    console.log('No hay directorio de reportes aún.');
    return;
  }

  const reportFiles = [];

  // Buscar todos los archivos HTML de reportes
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.html') && item.startsWith('report-')) {
        // Calcular ruta relativa desde el directorio del index.html
        const relativePath = path.relative(path.join(__dirname, 'cypress', 'reports'), fullPath);
        const date = item.match(/report-(\d{4}-\d{2}-\d{2})/)?.[1] || 'unknown';
        const time = item.match(/T(\d{2}-\d{2}-\d{2})/)?.[1]?.replace(/-/g, ':') || 'unknown';

        reportFiles.push({
          file: relativePath.replace(/\\/g, '/'), // Convertir barras invertidas a barras normales para URLs
          date: date,
          time: time,
          fullDate: new Date(date + 'T' + time.replace(/:/g, '-') + ':00')
        });
      }
    }
  }

  scanDirectory(reportsDir);

  // Ordenar por fecha descendente (más recientes primero)
  reportFiles.sort((a, b) => b.fullDate - a.fullDate);

  // Generar HTML del índice
  const html = `
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
        <h1 class="text-gray-800 border-b-2 border-blue-500 pb-2.5">Historial de Reportes Cypress</h1>
        <p class="font-bold">Total de reportes: ${reportFiles.length}</p>

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

  const indexPath = path.join(reportsDir, 'index.html');
  fs.writeFileSync(indexPath, html);

  console.log(`✅ Índice de reportes generado: ${indexPath}`);
  console.log(`📊 Total de reportes encontrados: ${reportFiles.length}`);
}

generateReportIndex();