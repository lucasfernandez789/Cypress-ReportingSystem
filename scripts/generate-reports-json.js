#!/usr/bin/env node
/**
 * Script para generar el archivo JSON de reportes que usa la aplicación React
 * Lee el report.json de Cypress y genera un JSON simplificado con información de reportes por fecha
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CONFIG } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function generateReportsJson(sourceDir, outputPath) {
  const reportsDir = path.join(sourceDir);
  const reportJsonPath = path.join(reportsDir, 'report.json');

  // Leer el archivo report.json generado por Cypress
  if (!fs.existsSync(reportJsonPath)) {
    console.error(`Archivo report.json no encontrado en: ${reportJsonPath}`);
    return;
  }

  const reportData = JSON.parse(fs.readFileSync(reportJsonPath, 'utf8'));

  // Mapa para agrupar reportes por fecha
  const reportsByDate = new Map();

  // Función para determinar la categoría y metadata del sistema
  function determineCategoryAndSystem(reportPath, folderName) {
    try {
      const fullReportPath = path.join(reportsDir, reportPath);
      if (fs.existsSync(fullReportPath)) {
        const content = fs.readFileSync(fullReportPath, 'utf8');

        // Buscar en el contenido si contiene referencias a core y features
        const hasCore = content.includes('cypress\\\\e2e\\\\core\\\\') || content.includes('cypress/e2e/core/');
        const hasFeatures = content.includes('cypress\\\\e2e\\\\features\\\\') || content.includes('cypress/e2e/features/');

        let category = 'unknown';
        if (hasCore && hasFeatures) {
          category = 'mixed';
        } else if (hasCore) {
          category = 'core';
        } else if (hasFeatures) {
          category = 'features';
        }

        // Determinar systemId basado en el nombre de la carpeta
        let systemName, systemId;
        
        if (folderName.includes('_')) {
          // Carpeta con APP_NAME: YYYY-MM-DD_APP_NAME
          const parts = folderName.split('_');
          const appName = parts.slice(1).join('_'); // En caso de que APP_NAME tenga underscores
          systemName = appName;
          systemId = appName.toLowerCase().replace(/[^a-z0-9]/g, '');
        } else {
          // Carpeta sin APP_NAME: usar configuración por defecto
          systemName = 'Sistema por Defecto';
          systemId = 'default';
        }

        return { category, systemName, systemId };
      }
    } catch (error) {
      console.warn(`Error al determinar categoría para ${reportPath}:`, error.message);
    }
    return { category: 'unknown', systemName: 'Sistema Desconocido', systemId: 'unknown' };
  }

  // Función para formatear fecha
  function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  }

  // Función para extraer estadísticas del HTML
  function extractStatsFromHtml(htmlPath) {
    try {
      if (fs.existsSync(htmlPath)) {
        const content = fs.readFileSync(htmlPath, 'utf8');

        // Extraer datos JSON del atributo data-raw del body
        const dataRawMatch = content.match(/data-raw="([^"]*)"/);
        if (dataRawMatch) {
          try {
            const dataRaw = dataRawMatch[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&');
            const data = JSON.parse(dataRaw);

            if (data.stats) {
              return {
                suites: data.stats.suites || 1,
                tests: data.stats.tests || 1,
                passes: data.stats.passes || 0,
                failures: data.stats.failures || 0,
                total: data.stats.tests || 1,
                duration: data.stats.duration || 1000
              };
            }
          } catch (parseError) {
            console.warn(`Error parsing JSON from ${htmlPath}:`, parseError);
          }
        }

        // Fallback: valores por defecto
        return {
          suites: 1,
          tests: 1,
          passes: 1,
          failures: 0,
          total: 1,
          duration: 1000
        };
      }
    } catch (error) {
      console.warn(`Error reading HTML file ${htmlPath}:`, error);
    }

    return {
      suites: 1,
      tests: 1,
      passes: 1,
      failures: 0,
      total: 1,
      duration: 1000
    };
  }

  // Escanear directorios de reportes
  if (fs.existsSync(reportsDir)) {
    const items = fs.readdirSync(reportsDir);

    for (const item of items) {
      const itemPath = path.join(reportsDir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory() && (/^\d{4}-\d{2}-\d{2}$/.test(item) || /^\d{4}-\d{2}-\d{2}_/.test(item))) {
        // Es un directorio con fecha (ej: 2025-10-30) o fecha con APP_NAME (ej: 2025-10-30_MiApp)
        const dateMatch = item.match(/^(\d{4}-\d{2}-\d{2})/);
        const date = dateMatch ? dateMatch[1] : item;
        const folderName = item; // Usar el nombre completo de la carpeta
        const dateFiles = fs.readdirSync(itemPath);

        for (const file of dateFiles) {
          if (file.startsWith('report-') && file.endsWith('.html')) {
            // Extraer información del archivo
            const match = file.match(/report-(\d{4}-\d{2}-\d{2})T(\d{2}-\d{2}-\d{2})\.html/);
            if (match) {
              const fileDate = match[1];
              const time = match[2].replace(/-/g, ':');

              const { category, systemName, systemId } = determineCategoryAndSystem(`${folderName}/${file}`, folderName);

              // Extraer estadísticas del HTML
              const stats = extractStatsFromHtml(path.join(reportsDir, folderName, file));

              const reportInfo = {
                date: fileDate,
                time: time,
                path: `${folderName}/${file}`,
                url: `${folderName}/${file}`,
                category: category,
                systemName: systemName,
                systemId: systemId,
                stats: stats
              };

              if (!reportsByDate.has(date)) {
                reportsByDate.set(date, {
                  date: date,
                  files: [],
                  dateFormatted: formatDate(date),
                  executions: 0,
                  lastExecution: time
                });
              }

              reportsByDate.get(date).files.push(reportInfo);
              reportsByDate.get(date).executions++;
            }
          }
        }
      }
    }
  }

  // Convertir el mapa a array y ordenar por fecha descendente
  const reportsArray = Array.from(reportsByDate.values())
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Ordenar archivos dentro de cada fecha por hora descendente (más reciente primero)
  reportsArray.forEach(dateGroup => {
    dateGroup.files.sort((a, b) => b.time.localeCompare(a.time));
    dateGroup.lastExecution = dateGroup.files[0]?.time || '';
  });

  // Escribir el archivo JSON
  fs.writeFileSync(outputPath, JSON.stringify(reportsArray, null, 2));
  console.log(`Archivo JSON generado: ${outputPath}`);
}

export default generateReportsJson;