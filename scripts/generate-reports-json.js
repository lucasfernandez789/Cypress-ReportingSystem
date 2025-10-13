const fs = require('fs');
const path = require('path');

// Función para procesar los reportes y generar el archivo JSON
function generateReportsJson(reportsDir, outputFile) {
  const reports = [];
  const dates = new Map();

  // Procesar todos los archivos de reporte
  function processDirectory(dir, relativePath = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      if (item === 'assets' || item === 'mocha') continue;
      
      const fullPath = path.join(dir, item);
      const isDirectory = fs.lstatSync(fullPath).isDirectory();
      
      if (isDirectory) {
        processDirectory(fullPath, path.join(relativePath, item));
      } else if (item.startsWith('report-') && item.endsWith('.html')) {
        let date;
        if (relativePath && relativePath.match(/\d{4}-\d{2}-\d{2}/)) {
          date = relativePath.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || 'unknown';
        } else {
          date = item.match(/report-(\d{4}-\d{2}-\d{2})/)?.[1] || 'unknown';
        }
        const time = item.match(/T(\d{2}-\d{2}-\d{2})/)?.[1]?.replace(/-/g, ':') || 'unknown';

        // Determinar categoría leyendo el contenido del archivo HTML
        let category = 'other';
        try {
          const htmlContent = fs.readFileSync(fullPath, 'utf8');
          const hasCore = htmlContent.includes('cypress\\\\e2e\\\\core');
          const hasFeatures = htmlContent.includes('cypress\\\\e2e\\\\features');

          if (hasCore && hasFeatures) {
            category = 'mixed'; // Contiene ambos tipos de tests
          } else if (hasCore) {
            category = 'core';
          } else if (hasFeatures) {
            category = 'features';
          }
        } catch (error) {
          // Si no se puede leer el archivo, dejar como 'other'
          console.warn(`No se pudo determinar categoría para ${fullPath}:`, error.message);
        }

        // Crear el objeto de reporte
        const report = {
          date,
          time,
          path: path.join(relativePath, item).replace(/\\/g, '/'),
          url: path.join(relativePath, item).replace(/\\/g, '/'),
          category
        };

        // Agrupar por fecha
        if (!dates.has(date)) {
          dates.set(date, {
            date,
            files: [],
            dateFormatted: formatDate(date),
            executions: 0,
            lastExecution: time
          });
        }
        
        const dateGroup = dates.get(date);
        dateGroup.files.push(report);
        dateGroup.executions = dateGroup.files.length;
        dateGroup.lastExecution = time > dateGroup.lastExecution ? time : dateGroup.lastExecution;
      }
    }
  }

  // Formatear fecha
  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Procesar el directorio
  processDirectory(reportsDir);

  // Convertir el Map a array y ordenar por fecha
  const reportsList = Array.from(dates.values())
    .sort((a, b) => b.date.localeCompare(a.date));

  // Escribir el archivo JSON
  fs.writeFileSync(outputFile, JSON.stringify(reportsList, null, 2));
  console.log(`JSON de reportes generado en: ${outputFile}`);
}

// Exportar la función
module.exports = generateReportsJson;