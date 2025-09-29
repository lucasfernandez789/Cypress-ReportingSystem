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

  // Generar index.html para docs/reports con mejor organización
  const docsIndexHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reportes de Testing Cypress</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .collapsible-section { transition: all 0.3s ease; }
        .report-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
    </style>
</head>
<body class="font-sans bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">📊 Reportes de Testing Cypress</h1>
                    <p class="text-gray-600">Sistema automatizado de reportes de testing</p>
                </div>
                <div class="text-right">
                    <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                        <span class="font-bold text-2xl">${reportFiles.length}</span>
                        <div class="text-sm">Reportes Total</div>
                    </div>
                </div>
            </div>
            
            <div class="flex flex-wrap gap-4 text-sm">
                <div class="flex items-center gap-2">
                    <span class="w-3 h-3 bg-blue-500 rounded"></span>
                    <span>Sincronizado automáticamente desde cypress/reports/</span>
                </div>
                <div class="flex items-center gap-2">
                    <a href="../index.html" class="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        ← Volver al inicio
                    </a>
                </div>
            </div>
        </div>

        <!-- Estadísticas por fecha -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">📈 Resumen por Fecha</h2>
            <div class="report-grid">
                ${(() => {
                  const dateGroups = {};
                  reportFiles.forEach(report => {
                    if (!dateGroups[report.date]) {
                      dateGroups[report.date] = [];
                    }
                    dateGroups[report.date].push(report);
                  });

                  return Object.entries(dateGroups)
                    .sort(([a], [b]) => new Date(b) - new Date(a))
                    .map(([date, reports]) => `
                      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                        <div class="font-semibold text-gray-800">${date}</div>
                        <div class="text-2xl font-bold text-blue-600">${reports.length}</div>
                        <div class="text-sm text-gray-600">ejecuciones</div>
                      </div>
                    `).join('');
                })()}
            </div>
        </div>

        <!-- Reportes organizados por fecha -->
        ${(() => {
          const dateGroups = {};
          reportFiles.forEach(report => {
            if (!dateGroups[report.date]) {
              dateGroups[report.date] = [];
            }
            dateGroups[report.date].push(report);
          });

          return Object.entries(dateGroups)
            .sort(([a], [b]) => new Date(b) - new Date(a))
            .map(([date, reports]) => {
              const reportsCount = reports.length;
              const dateFormatted = new Date(date).toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              });

              return `
                <div class="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                  <!-- Header de fecha -->
                  <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 cursor-pointer" 
                       onclick="toggleSection('section-${date}')">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3 class="text-xl font-semibold">${dateFormatted}</h3>
                        <p class="text-blue-100 text-sm">${reportsCount} ejecuciones de tests</p>
                      </div>
                      <div class="flex items-center gap-4">
                        <div class="text-right">
                          <div class="text-sm text-blue-100">Última ejecución</div>
                          <div class="font-semibold">${reports[0].time}</div>
                        </div>
                        <div id="arrow-${date}" class="transform transition-transform duration-300">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Lista de reportes -->
                  <div id="section-${date}" class="collapsible-section">
                    <div class="p-4">
                      <div class="report-grid">
                        ${reports
                          .sort((a, b) => b.fullDate - a.fullDate)
                          .map((report, index) => `
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 hover:border-blue-300">
                              <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center gap-2">
                                  <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                                  <span class="font-semibold text-gray-700">Ejecución ${index + 1}</span>
                                </div>
                                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  ${report.time}
                                </span>
                              </div>
                              
                              <div class="mb-3">
                                <div class="text-sm text-gray-600 mb-1">Archivo:</div>
                                <div class="text-xs font-mono text-gray-800 bg-gray-50 p-2 rounded">
                                  ${report.file}
                                </div>
                              </div>
                              
                              <a href="${report.file}" 
                                 class="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200" 
                                 target="_blank">
                                📄 Ver Reporte Completo
                              </a>
                            </div>
                          `).join('')}
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('');
        })()}

        <!-- Footer -->
        <div class="text-center text-gray-500 text-sm mt-8 p-4">
          <div class="flex items-center justify-center gap-2 mb-2">
            <span>🔄 Sincronizado automáticamente</span>
            <span>•</span>
            <span>📊 ${reportFiles.length} reportes disponibles</span>
          </div>
          <div>Última actualización: ${new Date().toLocaleString('es-ES')}</div>
        </div>
    </div>

    <script>
      function toggleSection(sectionId) {
        const section = document.getElementById(sectionId);
        const arrow = document.getElementById('arrow-' + sectionId.replace('section-', ''));
        
        if (section.style.display === 'none') {
          section.style.display = 'block';
          arrow.style.transform = 'rotate(0deg)';
        } else {
          section.style.display = 'none';
          arrow.style.transform = 'rotate(-90deg)';
        }
      }

      // Inicializar: mostrar solo la fecha más reciente
      document.addEventListener('DOMContentLoaded', function() {
        const sections = document.querySelectorAll('[id^="section-"]');
        sections.forEach((section, index) => {
          if (index > 0) {
            section.style.display = 'none';
            const dateId = section.id.replace('section-', '');
            const arrow = document.getElementById('arrow-' + dateId);
            if (arrow) arrow.style.transform = 'rotate(-90deg)';
          }
        });
      });
    </script>
</body>
</html>`;

  const docsIndexPath = path.join(docsReportsDir, 'index.html');
  fs.writeFileSync(docsIndexPath, docsIndexHtml);

  console.log(`✅ Reportes sincronizados en docs: ${docsIndexPath}`);
  console.log(`📊 Total de reportes encontrados: ${reportFiles.length}`);
  console.log(`📁 Archivos copiados desde cypress/reports/ a docs/reports/`);
}

syncReportsToDocsFolder();