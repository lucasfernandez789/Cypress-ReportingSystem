#!/usr/bin/env node
/**
 * Script de verificación de configuración
 * Valida que el setup esté completo y funcional
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function verifySetup() {
  console.log('🔍 Verificando configuración del proyecto...\n');

  const checks = {
    env: false,
    package: false,
    cypressConfig: false,
    testStructure: false,
    fixtures: false,
    selectors: false,
    constants: false
  };

  let errors = [];

  try {
    // 1. Verificar archivo .env
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const requiredVars = ['APP_NAME', 'APP_PREFIX', 'CYPRESS_BASE_URL', 'USER', 'PASS'];

      const missingVars = requiredVars.filter(varName => !envContent.includes(`${varName}=`));
      if (missingVars.length === 0) {
        checks.env = true;
        console.log('Archivo .env configurado correctamente');
      } else {
        errors.push(`Variables faltantes en .env: ${missingVars.join(', ')}`);
      }
    } else {
      errors.push('Archivo .env no encontrado');
    }

    // 2. Verificar package.json
    const packagePath = path.join(__dirname, '..', 'package.json');
    if (fs.existsSync(packagePath)) {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      if (packageJson.name && packageJson.name !== 'cypress-leyes') {
        checks.package = true;
        console.log('package.json configurado correctamente');
      } else {
        errors.push('package.json no tiene nombre personalizado');
      }
    } else {
      errors.push('Archivo package.json no encontrado');
    }

    // 3. Verificar configuración de Cypress
    const cypressConfigPath = path.join(__dirname, '..', 'cypress.config.js');
    if (fs.existsSync(cypressConfigPath)) {
      checks.cypressConfig = true;
      console.log('Configuración de Cypress encontrada');
    } else {
      errors.push('Archivo cypress.config.js no encontrado');
    }

    // 4. Verificar estructura de tests
    const envContent = fs.readFileSync(envPath, 'utf8');
    const appPrefix = envContent.split('\n').find(line => line.startsWith('APP_PREFIX='))?.split('=')[1]?.replace(/"/g, '') || 'app';

    const testDirs = [
      `cypress/e2e/${appPrefix}-core`,
      `cypress/e2e/${appPrefix}-features`
    ];

    let testDirsExist = true;
    testDirs.forEach(dir => {
      const fullPath = path.join(__dirname, '..', dir);
      if (!fs.existsSync(fullPath)) {
        testDirsExist = false;
        errors.push(`Directorio de tests no encontrado: ${dir}`);
      }
    });

    if (testDirsExist) {
      checks.testStructure = true;
      console.log('Estructura de tests creada correctamente');
    }

    // 5. Verificar fixtures
    const fixturesDir = path.join(__dirname, '..', `cypress/fixtures/${appPrefix}`);
    if (fs.existsSync(fixturesDir)) {
      const fixtureFiles = fs.readdirSync(fixturesDir);
      if (fixtureFiles.length > 0) {
        checks.fixtures = true;
        console.log('Fixtures configurados correctamente');
      } else {
        errors.push('No se encontraron archivos de fixtures');
      }
    } else {
      errors.push(`Directorio de fixtures no encontrado: cypress/fixtures/${appPrefix}`);
    }

    // 6. Verificar selectores actualizados
    const selectorsPath = path.join(__dirname, '..', 'cypress/support/selectors.js');
    if (fs.existsSync(selectorsPath)) {
      const selectorsContent = fs.readFileSync(selectorsPath, 'utf8');
      if (selectorsContent.includes(appPrefix)) {
        checks.selectors = true;
        console.log('Selectores actualizados correctamente');
      } else {
        errors.push('Selectores no actualizados para la aplicación');
      }
    } else {
      errors.push('Archivo de selectores no encontrado');
    }

    // 7. Verificar constantes
    const constantsPath = path.join(__dirname, '..', `src/constants/${appPrefix}-constants.js`);
    if (fs.existsSync(constantsPath)) {
      checks.constants = true;
      console.log('Constantes de aplicación creadas correctamente');
    } else {
      errors.push(`Archivo de constantes no encontrado: src/constants/${appPrefix}-constants.js`);
    }

    // Resumen
    console.log('\nResumen de verificación:');
    const totalChecks = Object.keys(checks).length;
    const passedChecks = Object.values(checks).filter(Boolean).length;

    Object.entries(checks).forEach(([check, passed]) => {
      const status = passed ? 'OK' : 'FAIL';
      console.log(`${status} ${check}`);
    });

    console.log(`\nResultado: ${passedChecks}/${totalChecks} verificaciones pasaron`);

    if (errors.length > 0) {
      console.log('\n⚠️  Errores encontrados:');
      errors.forEach(error => console.log(`   - ${error}`));
    }

    if (passedChecks === totalChecks) {
      console.log('\n¡Configuración completa y válida!');
      console.log('\nPuedes ejecutar:');
      console.log('   npm run test    # Ejecutar tests');
      console.log('   npm start       # Ver reportes');
    } else {
      console.log('\n⚠️  Configuración incompleta. Ejecuta los scripts faltantes:');
      if (!checks.env) console.log('   npm run setup:env');
      if (!checks.testStructure || !checks.fixtures) console.log('   npm run setup:tests');
    }

  } catch (error) {
    console.error('Error durante la verificación:', error.message);
    process.exit(1);
  }
}

verifySetup();