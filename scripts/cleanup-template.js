#!/usr/bin/env node
/**
 * Script de limpieza del template
 * Elimina archivos de ejemplo y prepara el proyecto para uso en producción
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function cleanupTemplate() {
  console.log('🧹 Limpiando archivos del template...\n');

  try {
    // Leer configuración actual
    const envPath = path.join(__dirname, '..', '.env');
    let appPrefix = 'app';

    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const prefixLine = envContent.split('\n').find(line => line.startsWith('APP_PREFIX='));
      if (prefixLine) {
        appPrefix = prefixLine.split('=')[1].replace(/"/g, '');
      }
    }

    // Archivos a eliminar (archivos de ejemplo del template original)
    const filesToDelete = [
      'cypress/e2e/core/nuevaLey.cy.js',
      'cypress/e2e/features/nuevaLeyFeatures.cy.js',
      'README-PROJECT.md' // Este se recreará con setup:app
    ];

    // Directorios a limpiar
    const dirsToClean = [
      'cypress/reports/mocha',
      'cypress/screenshots',
      'cypress/videos',
      'docs/reports',
      'public/cypress/reports',
      'public/docs/reports',
      'public/reports'
    ];

    console.log('Eliminando archivos de ejemplo...');

    filesToDelete.forEach(file => {
      const fullPath = path.join(__dirname, '..', file);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log(`Eliminado: ${file}`);
      }
    });

    console.log('\nLimpiando directorios temporales...');

    dirsToClean.forEach(dir => {
      const fullPath = path.join(__dirname, '..', dir);
      if (fs.existsSync(fullPath)) {
        // Limpiar contenido pero mantener directorio
        const items = fs.readdirSync(fullPath);
        items.forEach(item => {
          const itemPath = path.join(fullPath, item);
          try {
            if (fs.statSync(itemPath).isDirectory()) {
              fs.rmSync(itemPath, { recursive: true, force: true });
            } else {
              fs.unlinkSync(itemPath);
            }
            console.log(`Limpiado: ${dir}/${item}`);
          } catch (error) {
            console.log(`⚠️  No se pudo eliminar: ${dir}/${item}`);
          }
        });
      }
    });

    // Crear archivos .gitkeep en directorios vacíos
    const keepDirs = [
      'cypress/reports/mocha',
      'cypress/screenshots',
      'cypress/videos',
      'docs/reports',
      'public/reports'
    ];

    keepDirs.forEach(dir => {
      const fullPath = path.join(__dirname, '..', dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      const gitkeepPath = path.join(fullPath, '.gitkeep');
      if (!fs.existsSync(gitkeepPath)) {
        fs.writeFileSync(gitkeepPath, '');
        console.log(`.gitkeep creado en: ${dir}`);
      }
    });

    // Actualizar .gitignore si es necesario
    const gitignorePath = path.join(__dirname, '..', '.gitignore');
    if (fs.existsSync(gitignorePath)) {
      let gitignore = fs.readFileSync(gitignorePath, 'utf8');

      // Asegurar que se ignoren los archivos de configuración específicos
      const ignoresToAdd = [
        '.env',
        'cypress/screenshots/',
        'cypress/videos/',
        'cypress/reports/mocha/',
        'docs/reports/',
        'public/reports/'
      ];

      ignoresToAdd.forEach(ignore => {
        if (!gitignore.includes(ignore)) {
          gitignore += `\n${ignore}`;
        }
      });

      fs.writeFileSync(gitignorePath, gitignore);
      console.log('.gitignore actualizado');
    }

    // Crear archivo de estado del proyecto
    const statusPath = path.join(__dirname, '..', '.project-status.json');
    const projectStatus = {
      setupCompleted: true,
      appPrefix: appPrefix,
      setupDate: new Date().toISOString(),
      version: '1.0.0',
      templateVersion: '4.2'
    };

    fs.writeFileSync(statusPath, JSON.stringify(projectStatus, null, 2));
    console.log('Estado del proyecto guardado');

    console.log('\n¡Limpieza completada!');
    console.log('\nEl proyecto está listo para:');
    console.log(`   - Desarrollo de tests para ${appPrefix}`);
    console.log('   - Configuración específica de la aplicación');
    console.log('   - Ejecución de tests personalizados');

    console.log('\nRecomendaciones:');
    console.log('   - Configura tus credenciales en .env');
    console.log('   - Personaliza los selectores según tu aplicación');
    console.log('   - Actualiza las constantes en src/constants/');

  } catch (error) {
    console.error('Error durante la limpieza:', error.message);
    process.exit(1);
  }
}

cleanupTemplate();