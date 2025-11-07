# Guía de Setup para Forks - Cypress Testing System

Esta guía explica cómo configurar un nuevo fork del template **Cypress-ReportingSystem** para testing automatizado. Ahora tienes **dos opciones** según tus necesidades:

##  Elige tu enfoque

### Opción A: Proyecto Completo (Frontend + Testing)
**Para:** Equipos que necesitan interfaz web + sistema de testing completo
- Frontend React moderno con Vite
- Sistema de testing Cypress completo
- Interfaz para visualizar reportes
- Gestion completa de reportes

### Opción B: Template Cypress Ligero (Solo Testing)
**Para:** Equipos que ya tienen frontend y solo necesitan testing automatizado
- Solo Cypress + scripts de reportes
- Sin frontend React (consume de URL externa)
- Configurable para apuntar a cualquier frontend
- Enfoque exclusivo en testing

##  Proceso de Fork - Opción A: Proyecto Completo

### Paso 1: Crear y clonar el fork
```bash
# 1. Hacer fork en GitHub del repositorio original
# 2. Clonar tu fork
git clone https://github.com/TU-USUARIO/Cypress-NuevaApp.git
cd Cypress-NuevaApp

# 3. Instalar dependencias
npm install
```

### Paso 2: Configuración automática completa
```bash
# Configuración completa automática con CLI unificado
npm run setup

# Opciones avanzadas del CLI
npm run setup -- --env prod --components reports,frontend

# Verificar que todo esté correcto
npm run verify
```

### Paso 3: Configurar variables de entorno
Edita el archivo `.env` generado:
```env
# URL de tu aplicación a testear
CYPRESS_BASE_URL=http://localhost:3000

# Credenciales de testing
CYPRESS_USER=usuario_test
CYPRESS_PASS=password_test

# Nombre de tu aplicación (para filtrado por sistema)
APP_NAME=MiAplicacion

# Configuración de reportes (opcional, usa defaults)
VITE_REPORTS_BASE_URL=https://tu-usuario.github.io/Cypress-NuevaApp
VITE_REPORTS_REPO_OWNER=tu-usuario
VITE_REPORTS_REPO_NAME=Cypress-NuevaApp
```

### Paso 4: Personalizar para tu aplicación
```bash
# Crear estructura de tests específica
npm run setup:tests

# Configurar constantes de tu aplicación
npm run setup:app
```

### Paso 5: Ejecutar tests y verificar
```bash
# Asegúrate de que tu aplicación esté corriendo en CYPRESS_BASE_URL

# Ejecutar tests básicos
npm run test:core

# Ver reportes en la interfaz web
npm start
```

### Sistema de Filtrado por Sistema

El sistema incluye **filtrado inteligente por aplicación/fork**:

- **APP_NAME** en `.env` determina cómo se nombran las carpetas de reportes
- **Carpetas generadas**: `YYYY-MM-DD_APP_NAME` (ej: `2025-11-07_MiAplicacion`)
- **Filtrado visual**: Selector en la interfaz para filtrar por sistema
- **Sistema por Defecto**: Reportes sin APP_NAME aparecen como "Sistema por Defecto"
- **Todos los sistemas**: Opción para ver reportes de todas las aplicaciones

**Ejemplo de uso multi-fork:**
```
cypress/reports/
├── 2025-11-07/                    # Sistema por Defecto
├── 2025-11-07_MiAplicacion/       # MiAplicacion
└── 2025-11-07_OtraApp/           # OtraApp
```






##  Proceso de Fork - Opción B: Template Cypress Ligero

### Paso 1: Crear el template
```bash
# 1. Hacer fork del repositorio original
# 2. Clonar tu fork
git clone https://github.com/TU-USUARIO/Cypress-NuevaApp.git
cd Cypress-NuevaApp

# 3. Instalar dependencias del proyecto completo
npm install

# 4. Generar versión template ligera
npm run create:template
```

### Paso 2: Configurar el template generado
```bash
# Moverse al template generado
cd ../cypress-template  # o el directorio que elegiste

# Instalar dependencias del template
npm install

# Configuración automática del template con CLI unificado
npm run setup
```

### Paso 3: Configurar fuente de reportes
Edita el archivo `.env` en el template:
```env
# URL de tu aplicación a testear
CYPRESS_BASE_URL=http://localhost:3000

# URL del frontend que consumirá los reportes
VITE_REPORTS_BASE_URL=https://tu-frontend.vercel.app

# Información de tu repo para reportes
VITE_REPORTS_REPO_OWNER=tu-usuario
VITE_REPORTS_REPO_NAME=Cypress-NuevaApp

# Credenciales de testing
CYPRESS_USER=usuario_test
CYPRESS_PASS=password_test
```

### Paso 4: Personalizar tests
```bash
# Crear estructura de tests específica
npm run setup:tests

# Configurar constantes de tu aplicación
npm run setup:app
```

### Paso 5: Ejecutar tests y publicar reportes
```bash
# Asegúrate de que tu aplicación esté corriendo

# Ejecutar tests
npm run test

# Publicar reportes al destino configurado
npm run report:publish
```

##  Configuración Detallada - Ambos Enfoques

### Variables de Entorno Esenciales

#### Para Testing (Ambos enfoques)
```env
# URL de la aplicación a testear
CYPRESS_BASE_URL=http://localhost:3000

# Credenciales para tests
CYPRESS_USER=test_user
CYPRESS_PASS=test_pass

# Configuración de Cypress
CYPRESS_VIEWPORT_WIDTH=1280
CYPRESS_VIEWPORT_HEIGHT=720
```

#### Para Reportes (Opción A - Proyecto Completo)
```env
# URL donde se publicarán los reportes (GitHub Pages por defecto)
VITE_REPORTS_BASE_URL=https://tu-usuario.github.io/tu-repo

# Información del repositorio
VITE_REPORTS_REPO_OWNER=tu-usuario
VITE_REPORTS_REPO_NAME=tu-repo
```

#### Para Reportes (Opción B - Template Ligero)
```env
# URL del frontend existente que consumirá los reportes
VITE_REPORTS_BASE_URL=https://tu-frontend.vercel.app

# Información del repositorio donde se publicarán los reportes
VITE_REPORTS_REPO_OWNER=tu-usuario
VITE_REPORTS_REPO_NAME=tu-repo-reportes
```

### Configuración de URLs Base

**Importante:** Los tests necesitan que tu aplicación esté ejecutándose.

#### Desarrollo Local
```env
CYPRESS_BASE_URL=http://localhost:3000
```

#### Producción (¡Cuidado!)
```env
CYPRESS_BASE_URL=https://tu-app.com
```

### Publicación de Reportes

#### Opción A: GitHub Pages (Incluido)
```bash
# Publicar reportes automáticamente
npm run report:publish
```

#### Opción B: Destinos Personalizados
```bash
# Publicar a diferentes destinos
REPORTS_PUBLISH_TARGET=s3 npm run report:publish
REPORTS_PUBLISH_TARGET=vercel npm run report:publish
```

##  Personalización Avanzada

### 1. Selectores Específicos
Edita `cypress/support/selectors.js`:
```javascript
// Selectores para tu aplicación
export const miAppLogin = '[data-cy="login-form"]';
export const miAppMenu = '#menu-principal';
export const miAppBotonCrear = '[aria-label="Crear nuevo"]';
```

### 2. Comandos Personalizados
Edita `cypress/support/commands.js`:
```javascript
Cypress.Commands.add('loginMiApp', () => {
  cy.visit('/login');
  cy.get(miAppLogin).should('be.visible');
  cy.get('#usuario').type(Cypress.env('CYPRESS_USER'));
  cy.get('#password').type(Cypress.env('CYPRESS_PASS'));
  cy.get('[type="submit"]').click();
  cy.url().should('not.include', '/login');
});
```

### 3. Tests Específicos
Crea tests en:
- `cypress/e2e/core/` - Funcionalidades críticas
- `cypress/e2e/features/` - Características específicas

### 4. Constantes de Aplicación
Modifica constantes según tu app:
```javascript
// URLs de API
export const API_BASE_URL = 'https://api.tu-app.com';

// Datos de prueba
export const TEST_USERS = {
  admin: { user: 'admin@test.com', pass: 'admin123' },
  user: { user: 'user@test.com', pass: 'user123' }
};
```

##  Verificación y Testing

### Verificar Configuración
```bash
npm run verify
```

### Ejecutar Tests por Categorías
```bash
# Tests críticos
npm run test:core

# Tests de características
npm run test:features

# Todos los tests
npm run test
```

### Ver Reportes
```bash
# Opción A: Interfaz web incluida
npm start

# Opción B: Ver en tu frontend externo
# Los reportes estarán disponibles en VITE_REPORTS_BASE_URL
```

##  Solución de Problemas

### Error: "cy.visit() failed trying to load [URL]"
- Verifica que tu aplicacion este ejecutandose en `CYPRESS_BASE_URL`
- Confirma que no haya firewall bloqueando
- Para HTTPS, verifica certificados

### Error: "Cannot find module" o dependencias faltantes
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Archivo .env no encontrado"
```bash
npm run setup:app  # Crear configuración básica
```

### Error: Reportes no se publican
- ✅ Verifica `VITE_REPORTS_BASE_URL` correcta
- ✅ Confirma credenciales de GitHub (para GitHub Pages)
- ✅ Revisa configuración de destino personalizado

### Error: Template no se crea
```bash
# Asegúrate de estar en el directorio raíz
pwd  # Debe ser el directorio del proyecto completo
npm run create:template
```

##  Estructura Resultante

### Opción A: Proyecto Completo
```
cypress-nueva-app/
├── cypress/e2e/
│   ├── core/          # Tests críticos
│   └── features/      # Tests específicos
├── src/               # Frontend React
├── public/            # Assets estáticos
├── reports/           # Reportes generados
├── .env              # Configuración
└── package.json      # Dependencias completas
```

### Opción B: Template Ligero
```
cypress-template/
├── cypress/e2e/
│   ├── core/          # Tests críticos
│   └── features/      # Tests específicos
├── scripts/           # Scripts de reportes
├── .env              # Configuración
├── package.json      # Solo dependencias de testing
└── README.md         # Documentación específica
```

##  Próximos Pasos Recomendados

1. **Configurar CI/CD** para ejecución automática de tests
2. **Documentar** procesos específicos de tu aplicación
3. **Crear** tests para funcionalidades críticas primero
4. **Configurar** notificaciones de fallos de tests
5. **Integrar** con herramientas de monitoreo

##  Soporte

Si encuentras problemas:
1. Ejecuta `npm run verify` para diagnóstico automático
2. Revisa logs de error detallados
3. Verifica todas las variables de entorno
4. Consulta [ARCHITECTURE.md](ARCHITECTURE.md) para detalles técnicos
5. Revisa la documentación del template original

---

**Recuerda**: Cada fork es independiente. Los cambios que hagas aquí no afectan otros proyectos basados en el mismo template.