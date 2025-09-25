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
    <title>Historial de Reportes Cypress</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        .report-item { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px; background: #fafafa; }
        .report-item:hover { background: #f0f8ff; }
        .report-link { color: #3498db; text-decoration: none; font-weight: bold; font-size: 16px; }
        .report-link:hover { text-decoration: underline; }
        .report-meta { color: #666; font-size: 14px; margin-top: 5px; }
        .status { padding: 3px 8px; border-radius: 3px; font-size: 12px; font-weight: bold; }
        .status.success { background: #d4edda; color: #155724; }
        .status.failure { background: #f8d7da; color: #721c24; }
        .date-group { margin: 30px 0; }
        .date-header { background: #3498db; color: white; padding: 10px; border-radius: 5px; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Historial de Reportes Cypress</h1>
        <p><strong>Total de reportes:</strong> ${reportFiles.length}</p>

        ${reportFiles.reduce((acc, report, index) => {
          const currentDate = report.date;
          const prevDate = index > 0 ? reportFiles[index - 1].date : null;

          if (currentDate !== prevDate) {
            acc += `
        <div class="date-group">
            <div class="date-header">${currentDate}</div>`;
          }

          acc += `
            <div class="report-item">
                <a href="${report.file}" class="report-link" target="_blank">
                    Reporte ${report.time}
                </a>
                <div class="report-meta">
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