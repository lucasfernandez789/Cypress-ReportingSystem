#!/usr/bin/env node
/**
 * Script para configurar variables de entorno específicas de la aplicación
 * Complementa el setup inicial con configuraciones avanzadas
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question, defaultValue = '') {
  return new Promise((resolve) => {
    const prompt = defaultValue ? `${question} [${defaultValue}]: ` : `${question}: `;
    rl.question(prompt, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

async function setupEnvironment() {
  console.log('Configuración avanzada de variables de entorno\n');

  try {
    // Leer configuración existente si existe
    const envPath = path.join(__dirname, '..', '.env');
    let existingEnv = {};

    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      envContent.split('\n').forEach(line => {
        if (line.includes('=')) {
          const [key, ...valueParts] = line.split('=');
          existingEnv[key.trim()] = valueParts.join('=').trim().replace(/"/g, '');
        }
      });
    }

    console.log('Configurando credenciales y entornos...\n');

    // Credenciales
    const user = await askQuestion('Usuario de testing', existingEnv.USER || 'tester');
    const pass = await askQuestion('Password de testing', existingEnv.PASS || 'password');

    // URLs adicionales
    const devUrl = await askQuestion('URL de desarrollo', existingEnv.DEV_URL || existingEnv.CYPRESS_BASE_URL?.replace('://', '://dev-'));
    const prodUrl = await askQuestion('URL de producción', existingEnv.PROD_URL || existingEnv.CYPRESS_BASE_URL);

    // Configuración de timeouts
    const defaultTimeout = await askQuestion('Timeout por defecto (ms)', existingEnv.CYPRESS_DEFAULT_COMMAND_TIMEOUT || '10000');
    const pageLoadTimeout = await askQuestion('Timeout de carga de página (ms)', existingEnv.CYPRESS_PAGE_LOAD_TIMEOUT || '60000');

    // Configuración de reportes
    const reportsDir = await askQuestion('Directorio de reportes', existingEnv.CYPRESS_REPORTS_DIR || 'cypress/reports');
    const screenshotsDir = await askQuestion('Directorio de screenshots', existingEnv.CYPRESS_SCREENSHOTS_DIR || 'cypress/screenshots');
    const videosDir = await askQuestion('Directorio de videos', existingEnv.CYPRESS_VIDEOS_DIR || 'cypress/videos');

    // Configuración adicional
    const headless = await askQuestion('Ejecutar en modo headless (true/false)', existingEnv.CYPRESS_HEADLESS || 'true');
    const browser = await askQuestion('Browser por defecto', existingEnv.CYPRESS_BROWSER || 'chrome');
    const retries = await askQuestion('Número de reintentos', existingEnv.CYPRESS_RETRIES || '2');

    // Generar contenido del .env
    const envContent = `# Configuración para ${existingEnv.APP_NAME || 'Aplicación'}
APP_NAME="${existingEnv.APP_NAME || 'Nueva Aplicación'}"
APP_PREFIX="${existingEnv.APP_PREFIX || 'app'}"

# URLs de la aplicación
CYPRESS_BASE_URL="${existingEnv.CYPRESS_BASE_URL || 'http://localhost:3000'}"
DEV_URL="${devUrl}"
PROD_URL="${prodUrl}"

# Credenciales de testing
USER="${user}"
PASS="${pass}"

# Configuración de Cypress
CYPRESS_DEFAULT_COMMAND_TIMEOUT="${defaultTimeout}"
CYPRESS_PAGE_LOAD_TIMEOUT="${pageLoadTimeout}"
CYPRESS_REQUEST_TIMEOUT="15000"
CYPRESS_RESPONSE_TIMEOUT="15000"

# Directorios
CYPRESS_REPORTS_DIR="${reportsDir}"
CYPRESS_SCREENSHOTS_DIR="${screenshotsDir}"
CYPRESS_VIDEOS_DIR="${videosDir}"

# Configuración de ejecución
CYPRESS_HEADLESS="${headless}"
CYPRESS_BROWSER="${browser}"
CYPRESS_RETRIES="${retries}"

# Configuración de reportes
REPORTS_TITLE="Reportes - ${existingEnv.APP_NAME || 'Aplicación'}"
REPORTS_AUTHOR="${existingEnv.APP_NAME || 'Aplicación'} Testing Team"

# Variables de entorno
NODE_ENV="development"
CI="${process.env.CI || 'false'}"

# Configuración adicional
LOG_LEVEL="info"
SCREENSHOT_ON_FAILURE="true"
VIDEO_ON_FAILURE="false"
`;

    fs.writeFileSync(envPath, envContent);
    console.log('Archivo .env actualizado con configuración avanzada');

    // Crear archivo .env.example como template
    const exampleEnvPath = path.join(__dirname, '..', '.env.example');
    const exampleContent = `# Ejemplo de configuración - Copiar a .env y completar
APP_NAME="Nombre de tu aplicación"
APP_PREFIX="prefijo_para_archivos"

# URLs de la aplicación
CYPRESS_BASE_URL="https://tu-app.com"
DEV_URL="https://dev-tu-app.com"
PROD_URL="https://tu-app.com"

# Credenciales de testing
USER="tu_usuario"
PASS="tu_password"

# Configuración de Cypress (opcional)
CYPRESS_DEFAULT_COMMAND_TIMEOUT="10000"
CYPRESS_PAGE_LOAD_TIMEOUT="60000"

# Directorios (opcional)
CYPRESS_REPORTS_DIR="cypress/reports"
CYPRESS_SCREENSHOTS_DIR="cypress/screenshots"

# Configuración de ejecución (opcional)
CYPRESS_HEADLESS="true"
CYPRESS_BROWSER="chrome"
CYPRESS_RETRIES="2"
`;

    fs.writeFileSync(exampleEnvPath, exampleContent);
    console.log('Archivo .env.example creado como template');

    console.log('\n¡Configuración de entorno completada!');
    console.log('\nVerifica tu configuración:');
    console.log('- Archivo .env actualizado');
    console.log('- Template .env.example creado');
    console.log('- Ejecuta: npm run verify para validar');

  } catch (error) {
    console.error('Error durante la configuración:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

setupEnvironment();