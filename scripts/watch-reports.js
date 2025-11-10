#!/usr/bin/env node
/**
 * Watcher para sincronizar automaticamente reportes desde el directorio centralizado
 * Monitorea cambios en REPORTS_DIR y actualiza el frontend automaticamente
 */

import chokidar from "chokidar";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CONFIG } from "./config.js";
import { copyDirSync, removeDirSync } from "./utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Rutas
const centralReportsDir = CONFIG.REPORTS_DIR;
const publicReportsDir = CONFIG.PUBLIC_REPORTS_DIR;
const srcDataDir = CONFIG.SRC_DATA_DIR;
const publicDataDir = CONFIG.PUBLIC_DATA_DIR;
const reportsDataFile = path.join(srcDataDir, "reports-data.js");
const publicReportsDataFile = path.join(publicDataDir, "reports-data.js");

// Funcion para sincronizar reportes
function syncReports() {
  console.log("Sincronizando reportes...");

  try {
    // Limpiar directorio publico
    removeDirSync(publicReportsDir);

    // Copiar desde carpeta centralizada
    if (fs.existsSync(centralReportsDir)) {
      copyDirSync(centralReportsDir, publicReportsDir);

      // Leer el report.json y crear el archivo JS
      const reportJsonPath = path.join(publicReportsDir, "report.json");
      if (fs.existsSync(reportJsonPath)) {
        const reportData = JSON.parse(fs.readFileSync(reportJsonPath, "utf8"));

        // Crear el archivo JS con los datos
        const jsContent = `// Datos de reportes generados automaticamente
// Este archivo se actualiza automaticamente desde el directorio centralizado de reportes

export const reportsData = ${JSON.stringify(reportData, null, 2)};

export default reportsData;`;

        // Asegurar que los directorios existen
        fs.mkdirSync(srcDataDir, { recursive: true });
        fs.mkdirSync(publicDataDir, { recursive: true });

        // Escribir los archivos JS
        fs.writeFileSync(reportsDataFile, jsContent);
        fs.writeFileSync(publicReportsDataFile, jsContent);

        console.log("Reportes sincronizados exitosamente!");
      } else {
        console.log("No se encontro report.json en el directorio centralizado");
      }
    } else {
      console.error("Error: Directorio de reportes centralizado no existe:", centralReportsDir);
      console.log("Asegurate de configurar REPORTS_DIR correctamente en tu .env");
      process.exit(1);
    }
  } catch (error) {
    console.error("Error durante la sincronizacion:", error.message);
  }
}

// Verificar que el directorio centralizado existe
if (!fs.existsSync(centralReportsDir)) {
  console.error("Error: Directorio de reportes centralizado no existe:", centralReportsDir);
  console.log("Asegurate de configurar REPORTS_DIR correctamente en tu .env");
  process.exit(1);
}

// Sincronizacion inicial
console.log("Iniciando watcher de reportes...");
console.log("Monitoreando:", centralReportsDir);
console.log("Sincronizando a:", publicReportsDir);

syncReports();

// Configurar watcher
const watcher = chokidar.watch(centralReportsDir, {
  ignored: /(^|[\/\\])\../, // ignorar archivos ocultos
  persistent: true,
  ignoreInitial: true, // no disparar eventos para archivos existentes
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  }
});

// Eventos del watcher
watcher
  .on("add", (filePath) => {
    console.log("Archivo agregado:", path.relative(centralReportsDir, filePath));
    syncReports();
  })
  .on("change", (filePath) => {
    console.log("Archivo modificado:", path.relative(centralReportsDir, filePath));
    syncReports();
  })
  .on("unlink", (filePath) => {
    console.log("Archivo eliminado:", path.relative(centralReportsDir, filePath));
    syncReports();
  })
  .on("addDir", (dirPath) => {
    console.log("Directorio agregado:", path.relative(centralReportsDir, dirPath));
    syncReports();
  })
  .on("unlinkDir", (dirPath) => {
    console.log("Directorio eliminado:", path.relative(centralReportsDir, dirPath));
    syncReports();
  })
  .on("error", (error) => {
    console.error("Error del watcher:", error);
  });

// Manejar señales de terminacion
process.on("SIGINT", () => {
  console.log("\nDeteniendo watcher...");
  watcher.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\nDeteniendo watcher...");
  watcher.close();
  process.exit(0);
});

console.log("Watcher iniciado. Presiona Ctrl+C para detener.");
