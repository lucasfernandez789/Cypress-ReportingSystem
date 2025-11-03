# Guía de Setup para Forks

Esta guía explica cómo configurar un nuevo fork del template Cypress-ReportingSystem para una aplicación específica.

## Configuración Rápida

```bash
# 1. Hacer fork del repositorio original
# 2. Clonar tu fork
git clone https://github.com/TU-USUARIO/Cypress-NuevaApp.git
cd Cypress-NuevaApp

# 3. Instalar dependencias
npm install

# 4. Configuración automática completa
npm run setup

# 5. Verificar configuración
npm run verify

# 6. ¡Listo para desarrollar!
npm start
```

## Configuración Paso a Paso

### Paso 1: Configuración Básica
```bash
npm run setup:app
```
**Pregunta por:**
- Nombre de la aplicación
- Prefijo para archivos (ej: "compras", "ventas")
- URL base de la aplicación

**Crea:**
- `package.json` personalizado
- Archivo `.env` básico
- Estructura de carpetas
- Archivo de configuración específico

### Paso 2: Variables de Entorno
```bash
npm run setup:env
```
**Configura:**
- Credenciales de testing
- URLs de diferentes entornos (dev, qa, prod)
- Timeouts y configuraciones de Cypress
- Directorios de reportes y assets

### Paso 3: Estructura de Tests
```bash
npm run setup:tests
```
**Crea:**
- Tests básicos de login y navegación
- Estructura de carpetas `core/` y `features/`
- Fixtures de datos de prueba
- Constantes específicas de la aplicación

### Paso 4: Limpieza
```bash
npm run cleanup
```
**Elimina:**
- Archivos de ejemplo del template
- Reportes antiguos
- Configuraciones temporales

### Paso 5: Verificación
```bash
npm run verify
```
**Verifica:**
- Configuración completa
- Archivos necesarios creados
- Estructura de proyecto correcta

## 🏗️ Estructura Resultante

Después del setup, tu proyecto tendrá:

```
cypress-nueva-app/
├── cypress/e2e/
│   ├── nueva-app-core/     # Tests de funcionalidades base
│   └── nueva-app-features/ # Tests de características específicas
├── cypress/fixtures/nueva-app/
├── src/constants/nueva-app-constants.js
├── .env                    # Configuración específica
└── cypress-nueva-app.config.js
```

## Personalización

### 1. Actualizar Selectores
Edita `cypress/support/selectors.js` para agregar selectores específicos de tu aplicación:

```javascript
// Selectores para Nueva App
export const nuevaAppMenu = '[data-cy="menu-principal"]';
export const nuevaAppForm = '#formulario-principal';
```

### 2. Configurar Comandos Personalizados
Edita `cypress/support/commands.js` para agregar comandos específicos:

```javascript
Cypress.Commands.add('loginNuevaApp', () => {
  cy.visit('/login');
  cy.get('#usuario').type(Cypress.env('USER'));
  cy.get('#password').type(Cypress.env('PASS'));
  cy.get('[type="submit"]').click();
});
```

### 3. Crear Tests Específicos
Reemplaza los tests de ejemplo en:
- `cypress/e2e/[prefijo]-core/` - Tests de funcionalidades críticas
- `cypress/e2e/[prefijo]-features/` - Tests de características específicas

### 4. Actualizar Constantes
Modifica `src/constants/[prefijo]-constants.js` con:
- URLs de API específicas
- Datos de prueba
- Configuraciones de la aplicación

## Próximos Pasos

1. **Configurar credenciales reales** en `.env`
2. **Actualizar URLs** según entornos reales
3. **Personalizar tests** según funcionalidades de tu app
4. **Configurar CI/CD** si es necesario
5. **Documentar** procesos específicos de tu aplicación

## 🔍 Verificación Final

Antes de empezar a desarrollar:

```bash
# Verificar configuración
npm run verify

# Ejecutar tests básicos
npm run test:core

# Ver reportes
npm start
```

## 🆘 Solución de Problemas

### Error: "Archivo .env no encontrado"
```bash
npm run setup:app  # Crear configuración básica
```

### Error: "Directorio de tests no encontrado"
```bash
npm run setup:tests  # Crear estructura de tests
```

### Error: "Configuración incompleta"
```bash
npm run setup  # Configuración completa automática
npm run verify  # Verificar estado
```

## 📞 Soporte

Si encuentras problemas:
1. Ejecuta `npm run verify` para diagnosticar
2. Revisa los logs de error
3. Verifica que todas las variables de entorno estén configuradas
4. Consulta la documentación del template original

---

**Recuerda**: Este es un fork independiente. Los cambios que hagas aquí no afectan otros proyectos basados en el mismo template.