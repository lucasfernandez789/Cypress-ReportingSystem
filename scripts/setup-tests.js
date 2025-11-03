#!/usr/bin/env node
/**
 * Script para configurar la estructura básica de tests
 * Crea archivos de test template y actualiza configuraciones
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function setupTests() {
  console.log('Configurando estructura de tests...\n');

  try {
    // Leer configuración de la app
    const envPath = path.join(__dirname, '..', '.env');
    if (!fs.existsSync(envPath)) {
      console.error('Archivo .env no encontrado. Ejecuta primero: npm run setup:app');
      process.exit(1);
    }

    const envContent = fs.readFileSync(envPath, 'utf8');
    const appConfig = {};

    envContent.split('\n').forEach(line => {
      if (line.includes('=')) {
        const [key, ...valueParts] = line.split('=');
        appConfig[key.trim()] = valueParts.join('=').trim().replace(/"/g, '');
      }
    });

    const appName = appConfig.APP_NAME || 'Aplicación';
    const appPrefix = appConfig.APP_PREFIX || 'app';
    const baseUrl = appConfig.CYPRESS_BASE_URL || 'http://localhost:3000';

    console.log(`Configurando tests para: ${appName} (${appPrefix})`);

    // 1. Crear estructura de directorios
    const testDirs = [
      `cypress/e2e/${appPrefix}-core`,
      `cypress/e2e/${appPrefix}-features`,
      `cypress/fixtures/${appPrefix}`,
      `cypress/support/${appPrefix}`
    ];

    testDirs.forEach(dir => {
      const fullPath = path.join(__dirname, '..', dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`Carpeta creada: ${dir}`);
      }
    });

    // 2. Crear test básico de login (core)
    const loginTestPath = path.join(__dirname, '..', `cypress/e2e/${appPrefix}-core/login.cy.js`);
    const loginTestContent = `import "../../support/commands";
import { loginForm, usernameInput, passwordInput, submitButton } from "../../support/selectors";

describe("Login - ${appName}", () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("Debería mostrar formulario de login", () => {
    cy.get(loginForm).should('exist').and('be.visible');
    cy.get(usernameInput).should('exist');
    cy.get(passwordInput).should('exist');
    cy.get(submitButton).should('exist');
  });

  it("Debería hacer login exitosamente", () => {
    cy.login();
    // Verificar que el login fue exitoso
    cy.url().should('not.include', '/login');
  });

  it("Debería mostrar error con credenciales inválidas", () => {
    cy.get(usernameInput).type('usuario_invalido');
    cy.get(passwordInput).type('password_invalido');
    cy.get(submitButton).click();

    // Verificar mensaje de error
    cy.contains('Usuario o contraseña incorrectos').should('be.visible');
  });

  it("Debería validar campos requeridos", () => {
    cy.get(submitButton).click();

    // Verificar validaciones
    cy.get(usernameInput).should('have.class', 'error');
    cy.get(passwordInput).should('have.class', 'error');
  });
});
`;

    fs.writeFileSync(loginTestPath, loginTestContent);
    console.log(`Test de login creado: cypress/e2e/${appPrefix}-core/login.cy.js`);

    // 3. Crear test básico de navegación (core)
    const navigationTestPath = path.join(__dirname, '..', `cypress/e2e/${appPrefix}-core/navigation.cy.js`);
    const navigationTestContent = `import "../../support/commands";

describe("Navegación - ${appName}", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Debería cargar la página principal", () => {
    cy.visit('/');
    cy.contains('${appName}').should('be.visible');
  });

  it("Debería navegar entre secciones principales", () => {
    // Implementar navegación básica según la aplicación
    cy.get('[data-cy="menu-principal"]').should('exist');
  });

  it("Debería mantener la sesión activa", () => {
    cy.reload();
    cy.url().should('not.include', '/login');
  });

  it("Debería hacer logout correctamente", () => {
    cy.logout();
    cy.url().should('include', '/login');
  });
});
`;

    fs.writeFileSync(navigationTestPath, navigationTestContent);
    console.log(`Test de navegación creado: cypress/e2e/${appPrefix}-core/navigation.cy.js`);

    // 4. Crear test de ejemplo de features
    const featureTestPath = path.join(__dirname, '..', `cypress/e2e/${appPrefix}-features/ejemplo-feature.cy.js`);
    const featureTestContent = `import "../../support/commands";

describe("Feature Ejemplo - ${appName}", () => {
  beforeEach(() => {
    cy.login();
    // Navegar a la sección de la feature
  });

  it("Debería crear un nuevo elemento", () => {
    // Implementar test de creación
    cy.contains('Nuevo').click();

    // Llenar formulario
    cy.get('[data-cy="nombre"]').type('Elemento de prueba');
    cy.get('[data-cy="descripcion"]').type('Descripción de prueba');

    // Guardar
    cy.get('[data-cy="guardar"]').click();

    // Verificar creación
    cy.contains('Elemento creado exitosamente').should('be.visible');
  });

  it("Debería listar elementos existentes", () => {
    // Verificar que se muestre la lista
    cy.get('[data-cy="lista-elementos"]').should('exist');
    cy.get('[data-cy="elemento-item"]').should('have.length.greaterThan', 0);
  });

  it("Debería editar un elemento", () => {
    // Seleccionar primer elemento
    cy.get('[data-cy="elemento-item"]').first().click();

    // Editar
    cy.get('[data-cy="editar"]').click();
    cy.get('[data-cy="nombre"]').clear().type('Elemento editado');
    cy.get('[data-cy="guardar"]').click();

    // Verificar edición
    cy.contains('Elemento actualizado exitosamente').should('be.visible');
  });

  it("Debería eliminar un elemento", () => {
    // Seleccionar elemento
    cy.get('[data-cy="elemento-item"]').first().within(() => {
      cy.get('[data-cy="eliminar"]').click();
    });

    // Confirmar eliminación
    cy.get('[data-cy="confirmar-eliminar"]').click();

    // Verificar eliminación
    cy.contains('Elemento eliminado exitosamente').should('be.visible');
  });
});
`;

    fs.writeFileSync(featureTestPath, featureTestContent);
    console.log(`Test de feature creado: cypress/e2e/${appPrefix}-features/ejemplo-feature.cy.js`);

    // 5. Crear fixtures básicos
    const userFixturePath = path.join(__dirname, '..', `cypress/fixtures/${appPrefix}/usuario.json`);
    const userFixtureContent = {
      username: appConfig.USER || 'tester',
      password: appConfig.PASS || 'password',
      email: 'tester@example.com',
      role: 'admin',
      permissions: ['read', 'write', 'delete']
    };

    fs.writeFileSync(userFixturePath, JSON.stringify(userFixtureContent, null, 2));
    console.log(`Fixture de usuario creado: cypress/fixtures/${appPrefix}/usuario.json`);

    // 6. Actualizar selectores
    const selectorsPath = path.join(__dirname, '..', 'cypress/support/selectors.js');
    let selectorsContent = fs.readFileSync(selectorsPath, 'utf8');

    // Agregar selectores específicos de la app
    const appSelectors = `
// Selectores para ${appName}
export const ${appPrefix}LoginForm = '#login-form';
export const ${appPrefix}UsernameInput = '#username';
export const ${appPrefix}PasswordInput = '#password';
export const ${appPrefix}SubmitButton = '[type="submit"]';
export const ${appPrefix}MenuPrincipal = '[data-cy="menu-principal"]';
export const ${appPrefix}LogoutButton = '[data-cy="logout"]';
`;

    selectorsContent += appSelectors;
    fs.writeFileSync(selectorsPath, selectorsContent);
    console.log('Selectores actualizados');

    // 7. Crear archivo de constantes de la app
    const constantsPath = path.join(__dirname, '..', `src/constants/${appPrefix}-constants.js`);
    const constantsContent = `// Constantes específicas para ${appName}

export const APP_CONFIG = {
  name: '${appName}',
  prefix: '${appPrefix}',
  baseUrl: '${baseUrl}',
  version: '1.0.0'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  REPORTS: '/reports'
};

export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  USERS: '/api/users',
  REPORTS: '/api/reports'
};

export const TEST_DATA = {
  VALID_USER: {
    username: '${appConfig.USER || 'tester'}',
    password: '${appConfig.PASS || 'password'}'
  },
  INVALID_USER: {
    username: 'invalid_user',
    password: 'invalid_pass'
  }
};
`;

    fs.writeFileSync(constantsPath, constantsContent);
    console.log(`Constantes creadas: src/constants/${appPrefix}-constants.js`);

    console.log('\n¡Estructura de tests configurada!');
    console.log('\nArchivos creados:');
    console.log(`- Tests core: cypress/e2e/${appPrefix}-core/`);
    console.log(`- Tests features: cypress/e2e/${appPrefix}-features/`);
    console.log(`- Fixtures: cypress/fixtures/${appPrefix}/`);
    console.log(`- Constantes: src/constants/${appPrefix}-constants.js`);

    console.log('\nPróximos pasos:');
    console.log('1. Personalizar los tests según tu aplicación');
    console.log('2. Actualizar selectores en cypress/support/selectors.js');
    console.log('3. Ejecutar: npm run test para verificar');

  } catch (error) {
    console.error('Error durante la configuración de tests:', error.message);
    process.exit(1);
  }
}

setupTests();