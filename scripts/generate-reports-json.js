#!/usr/bin/env node
/**
 * Script para generar el archivo JSON de reportes que usa la aplicación React
 * Lee el report.json de Cypress y genera un JSON simplificado con información de reportes por fecha
 */

import fs from 'fs';
import path from 'path';

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

  // Función para formatear fecha
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  }

  // Escanear directorios de reportes
  if (fs.existsSync(reportsDir)) {
    const items = fs.readdirSync(reportsDir);

    for (const item of items) {
      const itemPath = path.join(reportsDir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(item)) {
        // Es un directorio con fecha (ej: 2025-10-30)
        const date = item;
        const dateFiles = fs.readdirSync(itemPath);

        for (const file of dateFiles) {
          if (file.startsWith('report-') && file.endsWith('.html')) {
            // Extraer información del archivo
            const match = file.match(/report-(\d{4}-\d{2}-\d{2})T(\d{2}-\d{2}-\d{2})\.html/);
            if (match) {
              const fileDate = match[1];
              const time = match[2].replace(/-/g, ':');

              const reportInfo = {
                date: fileDate,
                time: time,
                path: `${date}/${file}`,
                url: `${date}/${file}`,
                category: 'mixed' // Todos los reportes contienen tanto core como features
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

  // Ordenar archivos dentro de cada fecha por hora descendente
  reportsArray.forEach(dateGroup => {
    dateGroup.files.sort((a, b) => b.time.localeCompare(a.time));
    dateGroup.lastExecution = dateGroup.files[0]?.time || '';
  });

  // Escribir el archivo JSON
  fs.writeFileSync(outputPath, JSON.stringify(reportsArray, null, 2));
  console.log(`Archivo JSON generado: ${outputPath}`);
}

export default generateReportsJson;