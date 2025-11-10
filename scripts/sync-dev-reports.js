#!/usr/bin/env node
/**
 * Script para sincronizar reportes de la carpeta centralizada al directorio publico del proyecto
 * Esto permite que el frontend en desarrollo pueda acceder a los reportes
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CONFIG } from "./config.js";
import { copyDirSync, removeDirSync } from "./utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Rutas
const centralReportsDir = CONFIG.REPORTS_DIR;
const publicReportsDir = path.join(__dirname, "..", "public", "cypress", "reports");
const srcDataDir = path.join(__dirname, "..", "src", "data");
const publicDataDir = path.join(__dirname, "..", "public", "data");
const reportsDataFile = path.join(srcDataDir, "reports-data.js");
const publicReportsDataFile = path.join(publicDataDir, "reports-data.js");

console.log("Sincronizando reportes para desarrollo...");
console.log("Desde:", centralReportsDir);
console.log("Hacia:", publicReportsDir);

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

    // Asegurar que el directorio src/data existe
    fs.mkdirSync(srcDataDir, { recursive: true });

    // Escribir el archivo JS
    fs.writeFileSync(reportsDataFile, jsContent);
    console.log("Archivo reports-data.js creado en src/data/");

    // Tambien crear version en public/data para desarrollo
    fs.mkdirSync(publicDataDir, { recursive: true });
    fs.writeFileSync(publicReportsDataFile, jsContent);
    console.log("Archivo reports-data.js creado en public/data/");
  }

  console.log("Sincronizacion completada exitosamente!");
} else {
  console.error("Error: Directorio de reportes centralizado no existe:", centralReportsDir);
  console.log("Asegurate de configurar REPORTS_DIR correctamente en tu .env");
  process.exit(1);
}
