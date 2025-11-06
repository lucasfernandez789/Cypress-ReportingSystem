#!/usr/bin/env node
/**
 * CLI unificado para configuración del proyecto Cypress-ReportingSystem
 * Reemplaza los scripts individuales setup-app.js, setup-env.js, etc.
 *
 * Uso:
 *   node scripts/setup.js --help
 *   node scripts/setup.js --env local
 *   node scripts/setup.js --env prod
 *   node scripts/setup.js --tests
 *   node scripts/setup.js --app
 *   node scripts/setup.js --all
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  PATHS,
  copyFileSync,
  readJsonFile,
  writeJsonFile,
  writeFile,
  fileExists,
  getTimestamp,
  promptUser,
  validateSetup,
  printBanner,
  printResult,
  handleError
} from './utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Configuración de entornos
 */
const ENVIRONMENTS = {
  local: {
    CYPRESS_BASE_URL: 'http://localhost:3000',
    VITE_REPORTS_BASE_URL: 'http://localhost:5173',
    description: 'Desarrollo local'
  },
  prod: {
    CYPRESS_BASE_URL: 'https://tu-app.com',
    VITE_REPORTS_BASE_URL: 'https://tu-usuario.github.io/tu-repo/',
    description: 'Producción'
  },
};

/**
 * Parsea argumentos de línea de comandos
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    env: null,
    tests: false,
    app: false,
    all: false,
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--env' && args[i + 1]) {
      options.env = args[i + 1];
      i++;
    } else if (arg === '--tests') {
      options.tests = true;
    } else if (arg === '--app') {
      options.app = true;
    } else if (arg === '--all') {
      options.all = true;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  }

  return options;
}

/**
 * Muestra ayuda
 */
function showHelp() {
  console.log(`
CLI de Setup - Cypress Testing System

Uso:
  node scripts/setup.js [opciones]

Opciones:
  --env <environment>    Configurar entorno (local, prod)
  --tests               Configurar estructura de tests
  --app                 Configurar aplicación y constantes
  --all                 Ejecutar configuración completa
  --help, -h           Mostrar esta ayuda

Entornos disponibles:
  local                 Desarrollo local
  prod                  Producción

Ejemplos:
  node scripts/setup.js --env local
  node scripts/setup.js --tests
  node scripts/setup.js --all
  node scripts/setup.js --env prod --tests
`);
}

/**
 * Configura variables de entorno
 */
async function setupEnvironment(envName) {
  printBanner('Configuración de Entorno', `Configurando entorno: ${envName}`);

  if (!ENVIRONMENTS[envName]) {
    console.error(` Entorno desconocido: ${envName}`);
    console.log('Entornos disponibles:', Object.keys(ENVIRONMENTS).join(', '));
    return false;
  }

  const env = ENVIRONMENTS[envName];
  console.log(` ${env.description}`);

  // Leer .env actual o crear uno nuevo
  let envContent = '';
  if (fileExists(PATHS.ENV_FILE)) {
    envContent = fs.readFileSync(PATHS.ENV_FILE, 'utf8');
  }

  // Actualizar variables
  const updates = {
    'CYPRESS_BASE_URL': env.CYPRESS_BASE_URL,
    'VITE_REPORTS_BASE_URL': env.VITE_REPORTS_BASE_URL
  };

  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      envContent += `\n${key}=${value}`;
    }
  }

  writeFile(PATHS.ENV_FILE, envContent.trim());
  printResult(true, `Entorno ${envName} configurado en .env`);

  return true;
}

/**
 * Configura estructura de tests
 */
async function setupTests() {
  printBanner('Configuración de Tests', 'Creando estructura de tests Cypress');

  const testsDir = path.join(PATHS.CYPRESS, 'e2e');
  const coreDir = path.join(testsDir, 'core');
  const featuresDir = path.join(testsDir, 'features');
  const fixturesDir = path.join(PATHS.CYPRESS, 'fixtures');

  // Crear directorios
  [coreDir, featuresDir, fixturesDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      printResult(true, `Directorio creado: ${path.relative(PATHS.ROOT, dir)}`);
    }
  });

  // Crear tests básicos si no existen
  const coreTestFile = path.join(coreDir, 'login.cy.js');
  if (!fileExists(coreTestFile)) {
    const coreTestContent = `describe('Funcionalidades Core', () => {
  beforeEach(() => {
    cy.visit('/');
    // Configurar login si es necesario
  });

  it('debería cargar la página principal', () => {
    cy.contains('h1').should('be.visible');
  });
});`;
    writeFile(coreTestFile, coreTestContent);
    printResult(true, 'Test básico core creado');
  }

  const featuresTestFile = path.join(featuresDir, 'navigation.cy.js');
  if (!fileExists(featuresTestFile)) {
    const featuresTestContent = `describe('Navegación', () => {
  it('debería navegar entre páginas', () => {
    cy.visit('/');
    // Tests de navegación específicos de tu aplicación
  });
});`;
    writeFile(featuresTestFile, featuresTestContent);
    printResult(true, 'Test básico features creado');
  }

  // Crear fixtures básicos
  const usersFixture = path.join(fixturesDir, 'users.json');
  if (!fileExists(usersFixture)) {
    const usersData = {
      admin: {
        username: 'admin',
        password: 'admin123',
        role: 'administrator'
      },
      user: {
        username: 'user',
        password: 'user123',
        role: 'user'
      }
    };
    writeJsonFile(usersFixture, usersData);
    printResult(true, 'Fixtures de usuarios creados');
  }

  return true;
}

/**
 * Configura aplicación y constantes
 */
async function setupApp() {
  printBanner('Configuración de Aplicación', 'Configurando aplicación y constantes');

  // Preguntar por información de la aplicación
  const appName = await promptUser('Nombre de la aplicación (ej: Mi App): ') || 'Mi Aplicación';
  const appPrefix = await promptUser('Prefijo para archivos (ej: miapp): ') || 'miapp';

  console.log(` Configurando aplicación: ${appName} (${appPrefix})`);

  // Crear directorio de constantes si no existe
  const constantsDir = path.join(PATHS.ROOT, 'src', 'constants');
  if (!fs.existsSync(constantsDir)) {
    fs.mkdirSync(constantsDir, { recursive: true });
  }

  // Crear archivo de constantes
  const constantsFile = path.join(constantsDir, `${appPrefix}-constants.js`);
  const constantsContent = `/**
 * Constantes para ${appName}
 */

export const APP_CONFIG = {
  NAME: '${appName}',
  PREFIX: '${appPrefix}',
  VERSION: '1.0.0'
};

// URLs de API
export const API_ENDPOINTS = {
  BASE_URL: process.env.API_BASE_URL || 'https://api.example.com',
  USERS: '/users',
  PRODUCTS: '/products'
};

// Selectores comunes
export const SELECTORS = {
  LOGIN_FORM: '[data-cy="login-form"]',
  USER_MENU: '[data-cy="user-menu"]',
  MAIN_CONTENT: '[data-cy="main-content"]'
};

// Datos de prueba
export const TEST_DATA = {
  VALID_USER: {
    username: 'test@example.com',
    password: 'password123'
  }
};`;

  writeFile(constantsFile, constantsContent);
  printResult(true, `Constantes creadas: ${appPrefix}-constants.js`);

  // Actualizar package.json con nombre personalizado
  const packageJson = readJsonFile(PATHS.PACKAGE_JSON);
  if (packageJson) {
    packageJson.name = `${appPrefix}-testing`;
    packageJson.description = `Sistema de testing para ${appName}`;
    writeJsonFile(PATHS.PACKAGE_JSON, packageJson);
    printResult(true, 'package.json actualizado');
  }

  return true;
}

/**
 * Ejecuta configuración completa
 */
async function setupAll() {
  printBanner('Configuración Completa', 'Ejecutando setup completo del proyecto');

  const envName = await promptUser('Entorno a configurar (local/prod) [local]: ') || 'local';

  if (!(await setupEnvironment(envName))) return false;
  if (!(await setupTests())) return false;
  if (!(await setupApp())) return false;

  printResult(true, 'Configuración completa finalizada');
  console.log('\n Próximos pasos:');
  console.log('1. Revisar y ajustar variables en .env');
  console.log('2. Personalizar tests en cypress/e2e/');
  console.log('3. Ejecutar: npm run test:core');

  return true;
}

/**
 * Función principal
 */
async function main() {
  try {
    const options = parseArgs();

    if (options.help) {
      showHelp();
      return;
    }

    // Validar setup inicial
    const { errors, warnings } = validateSetup();
    if (errors.length > 0) {
      console.error(' Errores de configuración:');
      errors.forEach(error => console.error(`  - ${error}`));
      process.exit(1);
    }

    if (warnings.length > 0) {
      console.warn('  Advertencias:');
      warnings.forEach(warning => console.warn(`  - ${warning}`));
    }

    // Ejecutar opciones
    let success = true;

    if (options.all) {
      success = await setupAll();
    } else {
      if (options.env) {
        success = await setupEnvironment(options.env) && success;
      }
      if (options.tests) {
        success = await setupTests() && success;
      }
      if (options.app) {
        success = await setupApp() && success;
      }

      // Si no se especificó ninguna opción, mostrar ayuda
      if (!options.env && !options.tests && !options.app && !options.all) {
        console.log('No se especificaron opciones. Use --help para ver ayuda.');
        showHelp();
        return;
      }
    }

    if (success) {
      console.log('\n Setup completado exitosamente!');
    } else {
      console.error('\n Setup falló');
      process.exit(1);
    }

  } catch (error) {
    handleError(error, 'setup CLI');
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  main();
}