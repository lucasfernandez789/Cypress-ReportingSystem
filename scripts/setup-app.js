#!/usr/bin/env node
/**
 * Script de configuración inicial para adaptar el template a una nueva aplicación
 * Configura automáticamente el proyecto para una aplicación específica
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

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setupApp() {
  console.log('Configuracion inicial del template Cypress-ReportingSystem\n');

  try {
    // Preguntar información básica
    const appName = await askQuestion('Nombre de la aplicación (ej: Sistema de Compras): ');
    const appPrefix = await askQuestion('Prefijo para archivos (ej: compras): ');
    const baseUrl = await askQuestion('URL base de la aplicación: ');
    const description = await askQuestion('Descripción del proyecto: ');

    if (!appName || !appPrefix || !baseUrl) {
      console.error('Todos los campos son obligatorios');
      process.exit(1);
    }

    console.log('\nConfigurando proyecto...\n');

    // 1. Actualizar package.json
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    packageJson.name = `cypress-${appPrefix.toLowerCase()}`;
    packageJson.description = description || `Sistema de testing automatizado para ${appName}`;

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('package.json actualizado');

    // 2. Crear archivo .env
    const envContent = `# Configuración para ${appName}
APP_NAME="${appName}"
APP_PREFIX="${appPrefix}"

# URLs de la aplicación
CYPRESS_BASE_URL="${baseUrl}"
DEV_URL="${baseUrl.replace('://', '://dev-').replace(':3007', ':3008')}"
QA_URL="${baseUrl.replace('://', '://qa-').replace(':3007', ':3009')}"

# Credenciales de testing (configurar después)
USER=tester_${appPrefix}
PASS=password_temporal

# Configuración de reportes
REPORTS_TITLE="Reportes - ${appName}"
REPORTS_AUTHOR="${appName} Testing Team"

# Configuración adicional
NODE_ENV=development
`;

    const envPath = path.join(__dirname, '..', '.env');
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Archivo .env creado');

    // 3. Crear estructura de carpetas para tests
    const testDirs = [
      `cypress/e2e/${appPrefix}-core`,
      `cypress/e2e/${appPrefix}-features`,
      `cypress/fixtures/${appPrefix}`,
      `cypress/screenshots/${appPrefix}`,
      `reports/${appPrefix}`
    ];

    testDirs.forEach(dir => {
      const fullPath = path.join(__dirname, '..', dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`✅ Carpeta creada: ${dir}`);
      }
    });

    // 4. Crear archivo de configuración específico
    const configPath = path.join(__dirname, '..', `cypress-${appPrefix}.config.js`);
    const configContent = `// Configuración específica para ${appName}
export const appConfig = {
  name: '${appName}',
  prefix: '${appPrefix}',
  baseUrl: '${baseUrl}',
  testDirs: {
    core: 'cypress/e2e/${appPrefix}-core',
    features: 'cypress/e2e/${appPrefix}-features'
  },
  selectors: {
    loginForm: '#login-form',
    usernameInput: '#username',
    passwordInput: '#password',
    submitButton: '[type="submit"]'
  }
};

export default appConfig;
`;

    fs.writeFileSync(configPath, configContent);
    console.log(`✅ Archivo de configuración creado: cypress-${appPrefix}.config.js`);

    // 5. Crear README específico
    const readmePath = path.join(__dirname, '..', 'README-PROJECT.md');
    const readmeContent = `# Testing Automatizado - ${appName}

Sistema de testing automatizado desarrollado con Cypress para ${appName}.

## Configuración Específica

- **Aplicación**: ${appName}
- **URL Base**: ${baseUrl}
- **Prefijo**: ${appPrefix}
- **Fecha de creación**: ${new Date().toLocaleDateString('es-ES')}

## Estructura de Tests

\`\`\`
cypress/e2e/${appPrefix}-core/     # Tests de funcionalidades core
cypress/e2e/${appPrefix}-features/ # Tests de características específicas
cypress/fixtures/${appPrefix}/     # Datos de prueba específicos
\`\`\`

## Próximos Pasos

1. Configurar credenciales en \`.env\`
2. Crear tests básicos en las carpetas correspondientes
3. Ejecutar \`npm run test\` para verificar funcionamiento
4. Personalizar selectores según la aplicación

## Comandos Disponibles

- \`npm run test\` - Ejecutar todos los tests
- \`npm run test:core\` - Solo tests core
- \`npm run test:features\` - Solo tests features
- \`npm start\` - Ver reportes en interfaz web
`;

    fs.writeFileSync(readmePath, readmeContent);
    console.log('✅ README específico creado');

    console.log('\n🎉 ¡Configuración completada exitosamente!');
    console.log('\n📋 Próximos pasos recomendados:');
    console.log('1. Revisar y actualizar las credenciales en .env');
    console.log('2. Ejecutar: npm run setup:tests');
    console.log('3. Crear tus primeros tests');
    console.log('4. Probar con: npm run test');

  } catch (error) {
    console.error('❌ Error durante la configuración:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

setupApp();