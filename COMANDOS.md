# 📋 Guía Completa de Comandos npm

## Sistema de Testing Automatizado con Cypress - Comandos Detallados

> **Versión 4.2** - Documentación completa de todos los scripts npm disponibles, cuándo usarlos y para qué sirven cada uno.

## 🎯 Resumen Ejecutivo

Esta guía explica detalladamente **todos los comandos npm** del proyecto, organizados por categorías con información sobre:
- **Cuándo usar** cada comando
- **Para qué sirve** específicamente
- **Situaciones de uso** prácticas
- **Flujo de trabajo** recomendado

---

## 🎨 Desarrollo y Build

### `npm start` → `"vite"`
**Cuándo usar:**
- Durante el desarrollo diario
- Para probar cambios en tiempo real
- Cuando necesitas ver la aplicación en el navegador

**Para qué sirve:**
- Inicia el servidor de desarrollo con hot reload
- Abre la aplicación en `http://localhost:5173`
- Actualiza automáticamente cuando modificas archivos
- Incluye herramientas de desarrollo de Vite

### `npm run build` → `"vite build"`
**Cuándo usar:**
- Antes de desplegar a producción
- Para verificar que el código compila correctamente
- Cuando necesitas optimizar el bundle final

**Para qué sirve:**
- Compila la aplicación React para producción
- Optimiza y minifica el código JavaScript/CSS
- Genera archivos estáticos en la carpeta `docs/`
- Crea el bundle optimizado para despliegue

---

## 🔍 Análisis de Código

### `npm run lint` → `"eslint src --ext .js,.jsx,.ts,.tsx"`
**Cuándo usar:**
- Para verificar calidad del código antes de commits
- Durante desarrollo para mantener estándares
- Antes de hacer pull requests

**Para qué sirve:**
- Revisa el código en busca de errores de sintaxis
- Verifica cumplimiento de reglas de estilo
- Detecta problemas potenciales de código
- Usa configuración de ESLint + Tailwind CSS

### `npm run lint:fix` → `"eslint src --ext .js,.jsx,.ts,.tsx --fix"`
**Cuándo usar:**
- Después de ejecutar `lint` y ver errores corregibles
- Para formatear automáticamente el código
- Antes de commits para mantener consistencia

**Para qué sirve:**
- Corrige automáticamente problemas de formato
- Alinea clases de Tailwind CSS
- Arregla espaciado e indentación
- Soluciona la mayoría de problemas de estilo

---

## 🧪 Testing con Cypress

### `npm run test` → `"npm run clean-reports && cypress run"`
**Cuándo usar:**
- Para ejecutar TODOS los tests de manera automatizada
- En pipelines de CI/CD
- Para testing completo antes de releases
- Cuando necesitas reportes mixtos (Core + Features)

**Para qué sirve:**
- Comando principal para testing completo
- Limpia reportes anteriores automáticamente
- Ejecuta todos los tests (core + features)
- Genera reportes categorizados como "Mixed"
- Sincroniza automáticamente con la web app

### `npm run test:core` → `"npm run clean-reports && cypress run --spec 'cypress/e2e/core/**/*'"`
**Cuándo usar:**
- Para probar solo funcionalidades básicas/core
- Durante desarrollo de features principales
- Para testing específico de lógica de negocio base
- Cuando quieres reportes separados por categoría

**Para qué sirve:**
- Ejecuta únicamente tests en `cypress/e2e/core/`
- Genera reportes categorizados como "Core"
- Reportes aparecen en la página `/core` de la web app
- Ideal para testing de funcionalidades críticas

### `npm run test:features` → `"npm run clean-reports && cypress run --spec 'cypress/e2e/features/**/*'"`
**Cuándo usar:**
- Para probar solo funcionalidades específicas/features
- Durante desarrollo de nuevas características
- Para testing de casos de uso particulares
- Cuando quieres reportes separados por categoría

**Para qué sirve:**
- Ejecuta únicamente tests en `cypress/e2e/features/`
- Genera reportes categorizados como "Features"
- Reportes aparecen en la página `/features` de la web app
- Útil para testing de funcionalidades opcionales

### `npm run cypress:open` → `"cypress open"`
**Cuándo usar:**
- Durante escritura de nuevos tests
- Para debugging de tests que fallan
- Desarrollo interactivo de tests
- Cuando necesitas ver ejecución paso a paso

**Para qué sirve:**
- Abre interfaz gráfica de Cypress Test Runner
- Permite ejecutar tests individualmente
- Muestra ejecución en tiempo real en navegador
- Herramientas de debugging y desarrollo

### `npm run cypress:run` → `"cypress run"`
**Cuándo usar:**
- Testing básico sin configuración especial
- CI/CD simple sin reportes avanzados
- Ejecución rápida de tests

**Para qué sirve:**
- Ejecuta todos los tests en modo headless
- Sin interfaz gráfica, solo consola
- Reportes básicos de Cypress
- Más rápido que con configuración completa

### `npm run cypress:run-reports` → `"cypress run --reporter cypress-multi-reporters --reporter-options configFile=reporter-config.json"`
**Cuándo usar:**
- Para testing con múltiples formatos de reporte
- Cuando necesitas reportes en diferentes formatos
- Configuraciones de reporting avanzadas

**Para qué sirve:**
- Ejecuta tests con configuración multi-reporter
- Genera reportes en varios formatos según `reporter-config.json`
- Útil para integraciones con otras herramientas

---

## 📊 Hooks Automáticos (Post-test)

### `posttest`, `posttest:core`, `posttest:features`
**Cuándo usar:**
- Se ejecutan automáticamente (no manualmente)
- Después de comandos `test`, `test:core`, `test:features`

**Para qué sirven:**
- Procesamiento automático de reportes post-ejecución
- Combinan archivos JSON de Mocha
- Generan reportes HTML con timestamp
- Sincronizan reportes con carpetas `docs/` y `public/`

---

## 🛠️ Gestión Manual de Reportes

### `npm run report:merge` → `"mochawesome-merge cypress/reports/mocha/*.json > cypress/reports/report.json"`
**Cuándo usar:**
- Si necesitas combinar reportes manualmente
- Después de ejecuciones de test separadas
- Para debugging de reportes

**Para qué sirve:**
- Une todos los archivos JSON individuales de Mocha
- Crea un reporte consolidado único
- Prepara datos para generación de HTML

### `npm run report:generate` → `"npm run report:generate-timestamped"`
**Cuándo usar:**
- Para generar reportes HTML manualmente
- Después de combinar reportes
- Cuando el proceso automático falla

**Para qué sirve:**
- Ejecuta el script de generación con timestamp
- Crea carpeta con fecha actual
- Genera reporte HTML completo con assets

### `npm run report:sync-docs` → `"node scripts/sync-reports-to-docs.js"`
**Cuándo usar:**
- Después de generar reportes manualmente
- Para actualizar la web app con nuevos reportes
- Cuando reportes no aparecen en la interfaz

**Para qué sirve:**
- Copia reportes a carpetas `docs/` y `public/`
- Actualiza archivos JSON de índice
- Hace que reportes aparezcan en la aplicación web

### `npm run report:generate-timestamped`
**Cuándo usar:**
- Parte del proceso automático (rara vez manual)
- Para generación avanzada con timestamp preciso

**Para qué sirve:**
- Crea estructura de carpetas con fecha/hora
- Genera nombre de archivo con timestamp completo
- Copia assets necesarios para el reporte

---

## 🧹 Limpieza y Utilidades

### `npm run clean-generated`
**Cuándo usar:**
- Después de sesiones de testing intensivas
- Para limpiar archivos generados antes de commits
- Mantenimiento regular del repositorio
- Cuando el .gitignore no funcione correctamente

**Para qué sirve:**
- Elimina TODOS los archivos generados automáticamente
- Limpia reportes en `docs/reports/` y `public/reports/`
- Remueve assets generados en `docs/assets/` y `public/assets/`
- Deja el repositorio limpio con solo código fuente
- Útil para mantener el repo organizado

### `npm run delete-report` → `"node scripts/delete-report.js"`
**Cuándo usar:**
- Para eliminar reportes específicos desde terminal
- Limpieza manual de reportes antiguos
- Mantenimiento del historial

**Para qué sirve:**
- Borra reportes específicos por nombre/ruta
- Interfaz de línea de comandos para eliminación
- Complemento al borrado desde web app

### `npm run api-server` → `"node scripts/api-server.js"`
**Cuándo usar:**
- Para habilitar eliminación desde web app
- Durante desarrollo con interfaz completa
- Para testing de funcionalidades de borrado

**Para qué sirve:**
- Inicia servidor Express en puerto específico
- Proporciona API REST para operaciones de reportes
- Habilita eliminación desde la interfaz web

### `npm run report:history`
**Cuándo usar:**
- Para ver historial reciente de reportes
- Debugging de reportes generados
- Verificación de ejecuciones recientes

**Para qué sirve:**
- Lista los 20 reportes más recientes
- Ordenados por fecha de modificación
- Vista rápida del historial de testing

---

## 🎯 Flujo de Trabajo Recomendado

### Desarrollo Diario:
1. `npm start` - Iniciar desarrollo
2. `npm run cypress:open` - Escribir/debug tests
3. `npm run lint` - Verificar código

### Testing por Categorías:
1. `npm run test:core` - Probar funcionalidades base
2. `npm run test:features` - Probar features específicas
3. `npm run test` - Testing completo

### Pre-Commit/Release:
1. `npm run lint:fix` - Corregir código
2. `npm run test` - Testing completo
3. `npm run build` - Verificar compilación

### CI/CD Pipeline:
1. `npm run clean-reports` - Limpiar
2. `npm run test` - Ejecutar completo
3. `npm run build` - Compilar

---

## 📖 Referencias Cruzadas

- **README.md**: Información general del proyecto
- **STRUCTURE.md**: Arquitectura técnica detallada
- **reporter-config.json**: Configuración de reportes múltiples

---

*Esta documentación se mantiene actualizada con cada versión del proyecto.*