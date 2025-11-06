#!/usr/bin/env node
/**
 * Script para crear una versión template del proyecto optimizada para forks
 * Esta versión incluye solo Cypress + scripts de reportes, sin el frontend completo
 * Permite que los forks se enfoquen únicamente en tests mientras usan un frontend separado
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE_FILES = [
  'package.json',
  'package-lock.json',
  'cypress/',
  'cypress.config.js',
  'scripts/',
  'reporter-config.json',
  '.env.example',
  '.gitignore',
  'ARCHITECTURE.md',
  'FORK-SETUP.md'
];

const FRONTEND_ONLY_FILES = [
  'src/',
  'public/',
  'index.html',
  'vite.config.mjs',
  'postcss.config.cjs',
  'tailwind.config.js',
  'docs/',
  'README.md' // El README completo incluye docs del frontend
];

/**
 * Crea una versión template del proyecto
 */
function createTemplateVersion() {
  const templateDir = path.join(__dirname, '..', 'cypress-template');

  console.log(' Creando versión template del proyecto...');
  console.log(` Directorio destino: ${templateDir}`);

  // Crear directorio si no existe
  if (!fs.existsSync(templateDir)) {
    fs.mkdirSync(templateDir, { recursive: true });
    console.log(' Directorio creado');
  } else {
    console.log('  Directorio ya existe');
  }

  // Copiar archivos del template
  console.log(' Copiando archivos del template...');
  for (const file of TEMPLATE_FILES) {
    const sourcePath = path.join(__dirname, '..', file);
    const targetPath = path.join(templateDir, file);

    if (fs.existsSync(sourcePath)) {
      copyFileOrDir(sourcePath, targetPath);
      console.log(`   ${file}`);
    } else {
      console.log(`    ${file} no encontrado`);
    }
  }

  // Crear README específico para template
  createTemplateREADME(templateDir);

  // Crear script de configuración para template
  createTemplateSetupScript(templateDir);

  console.log(' Versión template creada exitosamente!');
  console.log('');
  console.log(' Instrucciones para usar el template:');
  console.log(`   cd ${path.relative(process.cwd(), templateDir)}`);
  console.log('   npm install');
  console.log('   npm run setup');
  console.log('   # Configurar VITE_REPORTS_BASE_URL apuntando a tu frontend');
}

/**
 * Copia archivo o directorio recursivamente
 */
function copyFileOrDir(source, target) {
  const stat = fs.statSync(source);

  if (stat.isDirectory()) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }

    const files = fs.readdirSync(source);
    for (const file of files) {
      const sourcePath = path.join(source, file);
      const targetPath = path.join(target, file);
      copyFileOrDir(sourcePath, targetPath);
    }
  } else {
    // Copiar archivo
    const targetDir = path.dirname(target);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.copyFileSync(source, target);
  }
}

/**
 * Crea README específico para la versión template
 */
function createTemplateREADME(templateDir) {
  const readmeContent = `# Cypress Testing Template

> Template optimizado para testing automatizado con Cypress. Enfocado únicamente en tests y generación de reportes.

[![Cypress](https://img.shields.io/badge/Cypress-15.3.0-04C38E.svg)](https://www.cypress.io/)

##  Inicio Rápido

\`\`\`bash
# Instalar dependencias
npm install

# Configurar automáticamente
npm run setup

# Ejecutar tests
npm run test
\`\`\`

##  Configuración

### Variables de Entorno

Configura \`.env\` para apuntar a tu frontend de reportes:

\`\`\`bash
# URL del frontend que consumirá los reportes
VITE_REPORTS_BASE_URL=https://tu-frontend.vercel.app

# Información de tu repo
VITE_REPORTS_REPO_OWNER=tu-usuario
VITE_REPORTS_REPO_NAME=tu-repo
\`\`\`

### Publicación de Reportes

Los reportes se generan automáticamente después de cada test. Para publicarlos:

\`\`\`bash
# Publicar a GitHub Pages (incluido en el repo)
npm run report:publish

# O configurar destino personalizado
REPORTS_PUBLISH_TARGET=s3 npm run report:publish
\`\`\`

##  Estructura

\`\`\`
cypress-template/
├── cypress/                 # Tus tests van aquí
├── scripts/                 # Generación de reportes
├── .env                     # Configuración
└── package.json            # Scripts de automatización
\`\`\`

##  Arquitectura Desacoplada

Este template funciona con un **frontend separado** que consume los reportes dinámicamente:

1. **Tests** → Generan reportes JSON/HTML
2. **Publicación** → Reportes se suben a almacenamiento
3. **Frontend** → Consume reportes desde URL configurable

### Beneficios

-  **Enfoque en tests**: Solo mantener lógica de testing
-  **Frontend compartido**: Reutilizar UI entre proyectos
-  **Actualizaciones independientes**: Cambios en UI no afectan tests
-  **Flexibilidad**: Diferentes estrategias de publicación

##  Documentación

- [Arquitectura Completa](ARCHITECTURE.md)
- [Documentación de Cypress](https://docs.cypress.io/)

---

*Generado desde Cypress-ReportingSystem template*
`;

  const readmePath = path.join(templateDir, 'README.md');
  fs.writeFileSync(readmePath, readmeContent);
}

/**
 * Crea script de configuración específico para template
 */
function createTemplateSetupScript(templateDir) {
  const setupScript = `#!/usr/bin/env node
/**
 * Script de configuración para versión template
 * Configuración simplificada enfocada solo en Cypress
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function setupTemplate() {
  console.log(' Configurando Cypress Template...');

  // Copiar .env.example a .env si no existe
  const envExample = path.join(__dirname, '.env.example');
  const envFile = path.join(__dirname, '.env');

  if (fs.existsSync(envExample) && !fs.existsSync(envFile)) {
    fs.copyFileSync(envExample, envFile);
    console.log(' Archivo .env creado desde .env.example');
    console.log('  RECUERDA configurar VITE_REPORTS_BASE_URL con la URL de tu frontend');
  }

  console.log(' Configuración completada!');
  console.log('');
  console.log(' Próximos pasos:');
  console.log('1. Editar .env con tus configuraciones');
  console.log('2. Agregar tus tests en cypress/e2e/');
  console.log('3. Ejecutar: npm run test');
}

// Ejecutar configuración
setupTemplate().catch(console.error);
`;

  const setupPath = path.join(templateDir, 'scripts', 'setup-template.js');
  fs.writeFileSync(setupPath, setupScript);
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  createTemplateVersion();
}

export { createTemplateVersion };