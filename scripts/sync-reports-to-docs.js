#!/usr/bin/env node
/**
 * Script para sincronizar reportes desde cypress/reports hacia docs/reports
 * Mantiene cypress/reports como fuente única de verdad
 * Copia reportes necesarios a docs/reports para GitHub Pages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import generateReportsJson from './generate-reports-json.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  const publicDir = path.join(__dirname, '..', 'public');

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
        // Si está en una carpeta con fecha, usar la fecha de la carpeta, si no, extraer del archivo
        let date;
        if (relativePath && relativePath.match(/\d{4}-\d{2}-\d{2}/)) {
          // Extraer fecha de la ruta de la carpeta (ej: "2025-09-25/report-...")
          date = relativePath.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || 'unknown';
        } else {
          // Extraer fecha del nombre del archivo (ej: "report-2025-09-25T...")
          date = item.match(/report-(\d{4}-\d{2}-\d{2})/)?.[1] || 'unknown';
        }
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

  // Generar index.html para docs/reports con buscador por fecha
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
        .hidden { display: none !important; }
    </style>
</head>
<body class="font-sans bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">Reportes de Testing Cypress</h1>
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

        <!-- Buscador por fecha -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Buscar Reportes</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Fecha específica:</label>
                    <input type="date" id="dateFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Desde:</label>
                    <input type="date" id="dateFrom" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Hasta:</label>
                    <input type="date" id="dateTo" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="flex items-end gap-2">
                    <button onclick="filterReports()" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Buscar
                    </button>
                    <button onclick="clearFilters()" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                        Limpiar
                    </button>
                </div>
            </div>
            <div id="searchResults" class="mt-4 text-sm text-gray-600"></div>
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
              // Crear fecha local evitando problemas de timezone
              const [year, month, day] = date.split('-');
              const localDate = new Date(year, month - 1, day);
              const dateFormatted = localDate.toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              });

              return `
                <div class="bg-white rounded-lg shadow-md mb-6 overflow-hidden date-section" data-date="${date}">
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
                              
                              <a href="/Cypress-ReportingSystem/reports/${report.file}" 
                                 class="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200" 
                                 target="_blank">
                                Ver Reporte Completo
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
            <span>Sincronizado automáticamente</span>
            <span>•</span>
            <span>${reportFiles.length} reportes disponibles</span>
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

      function filterReports() {
        const dateFilter = document.getElementById('dateFilter').value;
        const dateFrom = document.getElementById('dateFrom').value;
        const dateTo = document.getElementById('dateTo').value;
        const sections = document.querySelectorAll('.date-section');
        const resultsDiv = document.getElementById('searchResults');
        
        let visibleCount = 0;
        let totalReports = 0;

        sections.forEach(section => {
          const sectionDate = section.getAttribute('data-date');
          let isVisible = false;

          if (dateFilter) {
            // Búsqueda por fecha específica - comparación exacta
            isVisible = sectionDate === dateFilter;
          } else if (dateFrom || dateTo) {
            // Búsqueda por rango - usar comparación de strings para evitar problemas de zona horaria
            const dateStr = sectionDate;
            const fromStr = dateFrom || '1900-01-01';
            const toStr = dateTo || '2100-12-31';
            isVisible = dateStr >= fromStr && dateStr <= toStr;
          } else {
            // Sin filtros, mostrar todo
            isVisible = true;
          }

          if (isVisible) {
            section.classList.remove('hidden');
            const reportsInSection = section.querySelectorAll('.report-grid > div').length;
            totalReports += reportsInSection;
            visibleCount++;
            
            // Expandir sección automáticamente cuando se filtra
            const sectionContent = section.querySelector('[id^="section-"]');
            const arrow = section.querySelector('[id^="arrow-"]');
            if (sectionContent && arrow) {
              sectionContent.style.display = 'block';
              arrow.style.transform = 'rotate(0deg)';
            }
          } else {
            section.classList.add('hidden');
          }
        });

        // Mostrar resultados
        if (dateFilter || dateFrom || dateTo) {
          resultsDiv.innerHTML = \`Mostrando \${visibleCount} fechas con \${totalReports} reportes\`;
        } else {
          resultsDiv.innerHTML = '';
        }
      }

      function clearFilters() {
        document.getElementById('dateFilter').value = '';
        document.getElementById('dateFrom').value = '';
        document.getElementById('dateTo').value = '';
        document.getElementById('searchResults').innerHTML = '';
        
        const sections = document.querySelectorAll('.date-section');
        sections.forEach(section => {
          section.classList.remove('hidden');
        });

        // Volver al estado inicial (solo primera fecha expandida)
        initializeSections();
      }

      function initializeSections() {
        const sections = document.querySelectorAll('[id^="section-"]');
        sections.forEach((section, index) => {
          if (index > 0) {
            section.style.display = 'none';
            const dateId = section.id.replace('section-', '');
            const arrow = document.getElementById('arrow-' + dateId);
            if (arrow) arrow.style.transform = 'rotate(-90deg)';
          }
        });
      }

      // Inicializar: mostrar solo la fecha más reciente
      document.addEventListener('DOMContentLoaded', function() {
        initializeSections();
      });
    </script>
</body>
</html>`;

  const docsIndexPath = path.join(docsReportsDir, 'index.html');
  fs.writeFileSync(docsIndexPath, docsIndexHtml);

  // Generar el archivo JSON para la aplicación React
  const docsReportsJsonPath = path.join(docsReportsDir, 'report.json');
  generateReportsJson(sourceDir, docsReportsJsonPath);

  // Copiar también a public/reports para modo desarrollo
  const publicReportsDir = path.join(__dirname, '..', 'public', 'reports');
  if (!fs.existsSync(publicReportsDir)) {
    fs.mkdirSync(publicReportsDir, { recursive: true });
  }
  const publicReportsJsonPath = path.join(publicReportsDir, 'report.json');
  fs.copyFileSync(docsReportsJsonPath, publicReportsJsonPath);

  // Copiar también los directorios de reportes individuales a public/reports
  const sourceItems = fs.readdirSync(sourceDir);
  for (const item of sourceItems) {
    if (item === 'assets' || item === 'mocha' || item === 'report.json' || item === 'index.html') continue;

    const sourcePath = path.join(sourceDir, item);
    const publicPath = path.join(publicReportsDir, item);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyDirSync(sourcePath, publicPath);
    }
  }

  console.log(` Reportes sincronizados en docs: ${docsIndexPath}`);
  console.log(` Total de reportes encontrados: ${reportFiles.length}`);
  console.log(` Archivos copiados desde cypress/reports/ a docs/reports/`);
  console.log(` JSON generado para aplicación React: ${docsReportsJsonPath}`);
  console.log(` JSON copiado a public/reports para modo desarrollo: ${publicReportsJsonPath}`);
  console.log(` Directorios de reportes copiados a public/reports para modo desarrollo`);
}

syncReportsToDocsFolder();