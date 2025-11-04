# Cypress Testing & Reporting System

> Sistema completo de testing automatizado con interfaz web moderna para visualización y gestión de reportes

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Cypress](https://img.shields.io/badge/Cypress-15.3.0-04C38E.svg)](https://www.cypress.io/)
[![Vite](https://img.shields.io/badge/Vite-7.1.9-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.18-38B2AC.svg)](https://tailwindcss.com/)

## Tabla de Contenidos

- [Inicio Rápido](#inicio-rápido)
- [Características](#características-principales)
- [Instalación y Configuración](#configuración-inicial)
- [Comandos Disponibles](#comandos-disponibles)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración Avanzada](#configuración-avanzada)
- [Documentación Adicional](#documentación-adicional)
- [Contribución](#contribución)

##  Uso como Template

Este proyecto está diseñado para ser usado como **template base** para sistemas de testing automatizados. Cada fork representa una aplicación diferente.

### Para Nuevos Forks

1. **Hacer Fork** del repositorio
2. **Configurar** automáticamente con `npm run setup`
3. **Personalizar** tests para tu aplicación
4. **Desarrollar** y mantener tests específicos

### Estructura por Aplicación

Cada fork tendrá:
- **Frontend común**: Interfaz React para reportes
- **Tests específicos**: Cypress adaptado a cada app
- **Configuración propia**: Variables de entorno específicas
- **Reportes independientes**: Historial separado por aplicación

##  Inicio Rápido

```bash
# Instalar dependencias
npm install

# ⚠️ IMPORTANTE: Asegúrate de que tu aplicación esté corriendo
# Los tests necesitan acceder a CYPRESS_BASE_URL (configurado en .env)

# EJECUTAR TESTS (con reportes automáticos categorizados)
npm run test

# VER REPORTES EN APLICACIÓN WEB
npm start

# INICIAR SERVIDOR API (para eliminación directa)
npm run api-server
```

## Características Principales

### Testing Automatizado Inteligente
- **Cypress 15.3.0** con configuración multi-reporter
- **Categorización por comandos** (`test:core` y `test:features`)
- **Reportes Mochawesome** organizados por fecha
- **Pipeline completamente automatizado**
- **Estructura organizada** en carpetas core/ y features/

### Interfaz Web Moderna
- **React 18.3.1** con Vite 7.1.9 para desarrollo rápido
- **Tailwind CSS 3.4.18** con ESLint configurado
- **Material Symbols** para iconografía consistente
- **Arquitectura modular** con componentes reutilizables
- **Paginación inteligente** (5 fechas por página)
- **Filtros avanzados** por fecha y categorías
- **Eliminación directa** desde la web

## Estructura del Proyecto

```
cypress-leyes/
├── .github/                      # Configuración de GitHub Actions
│   └── workflows/                # Workflows de CI/CD
│       └── deploy.yml            # Despliegue automático a GitHub Pages
├── .vscode/                      # Configuración de VS Code
├── assets/                       # Recursos estáticos adicionales
├── cypress/                      # Tests automatizados
│   ├── e2e/                      # Tests end-to-end
│   │   ├── core/                 # Tests de funcionalidades base
│   │   └── features/             # Tests de características específicas
│   ├── fixtures/                 # Datos de prueba
│   │   └── usuario.json
│   ├── support/                  # Configuración de tests
│   │   ├── commands.js           # Comandos personalizados
│   │   ├── e2e.js                # Configuración principal
│   │   └── selectors.js          # Selectores centralizados
│   ├── reports/                  # Reportes generados
│   │   ├── mocha/                # JSONs de Mochawesome
│   │   └── [fecha]/              # Reportes HTML por fecha
│   └── screenshots/              # Capturas de fallos
├── docs/                         # Build de producción (GitHub Pages)
│   ├── index.html                # Aplicación compilada
│   ├── assets/                   # Recursos compilados
│   └── reports/                  # Reportes sincronizados
├── node_modules/                 # Dependencias instaladas
├── public/                       # Assets públicos
│   ├── assets/                   # Recursos estáticos
│   │   ├── images/               # Imágenes e iconos
│   │   └── fonts/                # Fuentes
│   └── reports/                  # Reportes publicados
├── reports/                      # Reportes de desarrollo
├── scripts/                      # Scripts de automatización
│   ├── utils/                    # Utilidades compartidas
│   │   └── categorize-tests.js   # Categorización de tests
│   ├── api-server.js             # Servidor API para eliminación web
│   ├── clean-reports.js          # Limpieza de archivos JSON acumulados
│   ├── cleanup-template.js       # Limpieza de archivos del template original
│   ├── delete-report.js          # Eliminación de ejecuciones específicas
│   ├── generate-reports-json.js  # Generación de índice de reportes
│   ├── generate-timestamped-report.js # Generación de reportes con timestamp
│   ├── setup-app.js              # Configuración inicial de la aplicación
│   ├── setup-env.js              # Configuración de variables de entorno
│   ├── setup-tests.js            # Creación de estructura básica de tests
│   ├── sync-reports-to-docs.js   # Sincronización de reportes a docs/
│   └── verify-setup.js           # Verificación completa de configuración
├── src/                       # Aplicación React
│   ├── components/              # Componentes de la interfaz
│   │   ├── common/               # Componentes comunes
│   │   │   ├── Button.jsx         # Botón reutilizable
│   │   │   ├── Card.jsx           # Tarjeta base
│   │   │   ├── ErrorBoundary.jsx  # Manejo de errores
│   │   │   ├── Footer.jsx         # Pie de página
│   │   │   ├── Icon.jsx           # Iconos Material Symbols
│   │   │   ├── Input.jsx          # Input reutilizable
│   │   │   └── LoadingCard.jsx    # Estados de carga
│   │   ├── home/                # Componentes de la página principal
│   │   │   ├── AccessCard.jsx     # Tarjetas de acceso
│   │   │   ├── SeccionPrincipal.jsx # Sección principal
│   │   │   └── TarjetasAcceso.jsx # Navegación principal
│   │   └── reports/             # Componentes de reportes
│   │       ├── base/              # Componentes base de reportes
│   │       │   └── ReportsPage.jsx      # Layout base de reportes
│   │       ├── BotonesAccion.jsx       # Botones de acción
│   │       ├── EstadisticasReportes.jsx # Estadísticas
│   │       ├── FiltrosReportes.jsx     # Filtros de búsqueda
│   │       ├── PaginacionReportes.jsx  # Paginación
│   │       ├── ReporteFecha.jsx        # Sección de fecha
│   │       ├── ReporteItem.jsx         # Item individual
│   │       └── ReporteItemSkeleton.jsx # Loading skeleton
│   ├── constants/              # Constantes centralizadas
│   │   └── constants.js          # Configuración y mensajes
│   ├── hooks/                  # Custom hooks
│   │   ├── reports/              # Hooks específicos de reportes
│   │   │   ├── useReportsActions.js     # Gestión de acciones (eliminar ejecuciones)
│   │   │   ├── useReportsData.js        # Carga y procesamiento de datos de reportes
│   │   │   ├── useReportsExpansion.js   # Expansión/colapso de secciones de fechas
│   │   │   ├── useReportsFilters.js     # Filtros de fechas y rangos
│   │   │   └── useReportsPagination.js  # Paginación de reportes
│   │   └── useReports.js                # Hook principal que combina todos los hooks de reportes
│   ├── pages/                   # Páginas principales
│   │   ├── CoreReports.jsx       # Vista de reportes Core
│   │   ├── FeatureReports.jsx    # Vista de reportes Features
│   │   ├── Home.jsx              # Página principal
│   │   ├── MixedReports.jsx      # Vista de reportes Mixtos
│   │   └── Reports.jsx           # Página base de reportes
│   ├── App.jsx                  # Componente principal
│   ├── index.css                # Estilos globales
│   └── main.jsx                 # Punto de entrada React
├── .env                          # Variables de entorno
├── .gitignore                    # Exclusiones de Git
├── COMANDOS.md                   # Documentación completa de comandos
├── cypress.config.js             # Configuración de Cypress
├── eslint.config.js              # Configuración de ESLint
├── FORK-SETUP.md                 # Guía completa para configurar forks
├── index.html                    # HTML de desarrollo
├── logo-legis-act-D-yCoXSC.png   # Logo de la aplicación
├── package.json                  # Dependencias y scripts
├── postcss.config.cjs            # Configuración de PostCSS
├── README.md                     # Este archivo
├── reporter-config.json          # Configuración de reportes
├── STRUCTURE.md                  # Documentación técnica de arquitectura
├── tailwind.config.js            # Configuración de Tailwind CSS
└── vite.config.mjs               # Configuración de Vite
```

## Comandos Disponibles

### Desarrollo
| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo (Vite) |
| `npm run build` | Compilar para producción |
| `npm run lint` | Verificar código con ESLint |

### Testing
| Comando | Descripción |
|---------|-------------|
| `npm run test` | **PRINCIPAL**: Ejecuta todos los tests y genera reportes |
| `npm run test:core` | Ejecuta y reporta solo tests Core |
| `npm run test:features` | Ejecuta y reporta solo tests Features |
| `npm run cypress:open` | Cypress en modo interactivo |

> **Nota**: Los comandos `test:core` y `test:features` ejecutan y reportan automáticamente solo los tests de su categoría respectiva.

### Gestión de Reportes
| Comando | Descripción |
|---------|-------------|
| `npm run api-server` | Servidor API para eliminación web |
| `npm run clean-reports` | Limpiar archivos JSON acumulados |
| `npm run delete-report` | Eliminar ejecución específica |

### Setup y Configuración
| Comando | Descripción |
|---------|-------------|
| `npm run setup` | **CONFIGURACIÓN COMPLETA** automática |
| `npm run setup:app` | Configurar nombre y URLs de la aplicación |
| `npm run setup:env` | Configurar variables de entorno avanzadas |
| `npm run setup:tests` | Crear estructura básica de tests |
| `npm run cleanup` | Limpiar archivos del template |
| `npm run verify` | Verificar configuración completa |

> **Para explicaciones detalladas consulta [COMANDOS.md](COMANDOS.md)**

## Flujo de Trabajo

### Trabajo Diario
```bash
# Desarrollar con hot reload
npm start

# Ejecutar tests cuando sea necesario
npm run test

# Ver reportes en http://localhost:5173
```

### Ejecutando Tests por Categoría
```bash
# Ejecutar solo tests Core
npm run test:core

# Ejecutar solo tests Features
npm run test:features

# Ejecutar todos los tests
npm run test

# Ver reportes generados
npm start

# Terminal 2: Servidor API
npm run api-server

# Ahora puedes eliminar reportes desde la web
```

## Configuración Inicial

### Requisitos Previos
- Node.js 16.x o superior
- npm 8.x o superior
- Git (opcional, para control de versiones)

### Setup Automatizado (Recomendado)

Para configurar rápidamente un nuevo fork para una aplicación específica:

```bash
# Configuración completa automática
npm run setup

# O configuración paso a paso:
npm run setup:app    # Configurar nombre y URLs
npm run setup:env    # Variables de entorno avanzadas
npm run setup:tests  # Estructura de tests básica
npm run cleanup      # Limpiar archivos del template
npm run verify       # Verificar configuración
```

### Configuración Manual

Si prefieres configurar manualmente:

1. **Instalación**:
```bash
git clone https://github.com/lucasfernandez789/Cypress-ReportingSystem.git
cd Cypress-ReportingSystem
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:
```bash
# Crear archivo .env
cp .env.example .env

# Editar con tus configuraciones
APP_NAME="Mi Aplicación"
APP_PREFIX="miapp"
CYPRESS_BASE_URL="https://mi-app.com"
USER="tester"
PASS="password"
```

## Configuración Avanzada

### Personalización de Reportes
El sistema permite personalizar la generación de reportes a través de `reporter-config.json`:

```json
{
  "reporterEnabled": "mochawesome",
  "mochawesomeReporterOptions": {
    "reportDir": "cypress/reports/mocha",
    "quite": true,
    "overwrite": false,
    "html": false,
    "json": true
  }
}
```

### Configuración de ESLint
El proyecto utiliza una configuración estricta de ESLint para mantener la calidad del código:
- Reglas de React
- Integración con Tailwind
- Formateo automático

##  Documentación Adicional

- [Comandos Detallados](COMANDOS.md)
- [Guía de Setup para Forks](FORK-SETUP.md)
- [Guía de Contribución](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## Agradecimientos

- [Cypress](https://www.cypress.io/) por su excelente framework de testing
- [Mochawesome](https://github.com/adamgruber/mochawesome) por el sistema de reportes
- La comunidad de React por sus contribuciones

### GitHub Pages (Opcional)
1. Ve a **Settings** → **Pages** en GitHub
2. Selecciona **Deploy from branch**
3. Elige rama **main** y carpeta **docs/**
4. Los reportes estarán en: `https://tu-usuario.github.io/tu-repo/`

## Sistema de Categorización

### Categorías Automáticas
- **Core**: Funcionalidades básicas y críticas
- **Features**: Funcionalidades específicas y avanzadas
- **Mixed**: Combinación de ambas categorías

### Navegación
- **Home**: Tarjetas para acceder a Core/Features
- **Páginas dedicadas**: `/core`, `/features`, `/mixed`
- **Filtros inteligentes**: Incluyen reportes mixtos automáticamente

## Troubleshooting

### Tests fallan por URL no accesible
```bash
# Error: "cy.visit() failed trying to load [URL]"
# SOLUCIÓN: Asegúrate de que tu aplicación esté corriendo

# 1. Verificar configuración de URL
cat .env | grep CYPRESS_BASE_URL

# 2. Ejecutar tu aplicación en otra terminal
npm run dev  # o el comando que uses para tu app

# 3. Si necesitas cambiar la URL, edita .env
# CYPRESS_BASE_URL=http://localhost:3000
```

### Tests fallan por credenciales
```bash
# Verificar variables de entorno
echo $env:USER $env:PASS
```

### Reportes no se generan
```bash
npm run clean-reports
npm run test
```

### API Server no responde
```bash
npm run api-server
# Verificar en http://localhost:3001/api/health
```

## Documentación Adicional

- **Comandos detallados**: [COMANDOS.md](./COMANDOS.md)
- **Estructura técnica**: [STRUCTURE.md](./STRUCTURE.md)

---

**Versión:** 4.2.0 | **Última actualización:** Octubre 2025

## Características Principales

### Testing Automatizado Inteligente
- **Cypress 15.3.0** con configuración multi-reporter
- **Categorización automática** Core vs Features basada en contenido HTML
- **Limpieza automática** de archivos JSON entre ejecuciones
- **Reportes Mochawesome** organizados por fecha, timestamp y categoría
- **Screenshots automáticos** en caso de fallos
- **Pipeline completamente automatizado** con sincronización a docs/ y public/

### Interfaz Web Moderna con Material Symbols
- **React 18.3.1** con Vite 7.1.9 para desarrollo rápido
- **Tailwind CSS 3.4.18** con ESLint configurado
- **Material Symbols** de Google Fonts para iconografía consistente
- **Arquitectura modular** con componentes reutilizables
- **Custom hooks** para lógica de negocio centralizada
- **Categorización visual** Core/Features con iconos diferenciados
- **Eliminación directa** desde la web (sin terminal)
- **Desplegables por fecha** con animaciones
- **Paginación inteligente** (5 fechas por página, siempre visible)
- **Filtros avanzados** por fecha específica, rangos y categorías

### Sistema de Reportes Inteligente
- **Categorización automática** basada en rutas de archivos (`cypress/e2e/core/` vs `cypress/e2e/features/`)
- **Generación automática** después de cada test con metadata enriquecida
- **Historial completo** de todas las ejecuciones por categoría
- **Organización por fecha** con múltiples ejecuciones por día
- **Sincronización automática** entre desarrollo y producción
- **API REST** para operaciones avanzadas
- **Filtros por categoría** Core/Features/Mixed

## Estructura del Proyecto

```
cypress-leyes/
├── src/                           # Aplicación React moderna
│   ├── assets/                    # Assets importados (imágenes, etc.)
│   │   └── images/               # Imágenes optimizadas para build
│   ├── components/                # Componentes modulares organizados
│   │   ├── common/               # Componentes compartidos
│   │   │   └── Footer.jsx        # Footer reutilizable
│   │   ├── home/                 # Componentes específicos de Home
│   │   │   └── SeccionPrincipal.jsx  # Sección principal con logo
│   │   ├── reports/              # Componentes específicos de reportes
│   │   │   ├── EstadisticasReportes.jsx  # Estadísticas de reportes
│   │   │   ├── FiltrosReportes.jsx       # Sistema de filtros
│   │   │   ├── PaginacionReportes.jsx    # Paginación inteligente
│   │   │   ├── ReporteFecha.jsx          # Sección desplegable por fecha
│   │   │   ├── ReporteItem.jsx           # Item individual de reporte
│   │   │   └── BotonesAccion.jsx         # Botones de acción (ver/eliminar)
│   │   └── Layout.jsx            # Layout con navegación
│   ├── hooks/                   # Custom hooks para lógica reutilizable
│   │   └── useReports.js        # Hook principal para gestión de reportes
│   ├── pages/                   # Páginas principales (vistas)
│   │   ├── Home.jsx             # Página de inicio con tarjetas Core/Features
│   │   ├── CoreReports.jsx      #  Reportes de funcionalidades Core
│   │   ├── FeatureReports.jsx   #  Reportes de funcionalidades Features
│   │   ├── MixedReports.jsx     #  Reportes combinados (Core + Features)
│   │   └── Reports.jsx          # Interfaz avanzada de reportes (legacy)
│   ├── App.jsx                  # Enrutamiento React Router
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Estilos Tailwind
├── cypress/                      # Tests automatizados
│   ├── e2e/
│   │   ├── core/                # Funcionalidades base (categoría Core)
│   │   │   └── nuevaLey.cy.js   # Tests de funcionalidades principales
│   │   └── features/            # Features específicas (categoría Features)
│   ├── fixtures/                # Datos de prueba
│   ├── reports/                 # Reportes técnicos (fuente única)
│   ├── screenshots/             # Capturas de errores
│   └── support/                 # Comandos y configuración
├── docs/                        # GitHub Pages + app build
│   ├── assets/                  # Assets organizados
│   ├── reports/                 # Reportes web + JSON índice
│   └── index.html               # App React compilada
├── scripts/                     # Automatización avanzada
│   ├── api-server.js            # Servidor API para eliminación
│   ├── delete-report.js         # Eliminación desde terminal
│   ├── generate-reports-json.js # Procesamiento JSON con categorización automática
│   └── sync-reports-to-docs.js  # Sincronización automática
├── public/                      # Assets estáticos desarrollo
│   └── reports/                 # Copia automática para dev
├── package.json                 # Dependencias y scripts
├── vite.config.js               # Configuración Vite
├── cypress.config.js            # Configuración Cypress
├── README.md                    # Esta documentación
├── COMANDOS.md                  # Guía completa de comandos npm
└── STRUCTURE.md                 # Documentación técnica
```

## Comandos Disponibles

>  **Para explicaciones detalladas de cuándo y cómo usar cada comando, consulta [COMANDOS.md](COMANDOS.md)**

### Desarrollo y Build
| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia servidor de desarrollo (Vite) |
| `npm run build` | Compila aplicación para producción |
| `npm run lint` | Verifica código con ESLint + Tailwind |
| `npm run lint:fix` | Corrige automáticamente problemas de código |
| `npm run preview` | Vista previa del build |

### Testing con Cypress
| Comando | Descripción |
|---------|-------------|
| `npm run test` | **PRINCIPAL**: Tests completos + reportes automáticos + limpieza |
| `npm run test:core` | Ejecuta solo tests Core (`cypress/e2e/core/**/*`) |
| `npm run test:features` | Ejecuta solo tests Features (`cypress/e2e/features/**/*`) |
| `npm run cypress:open` | Abre Cypress en modo interactivo |
| `npm run cypress:run` | Ejecuta tests en modo headless |
| `npm run cypress:run-reports` | Tests con configuración multi-reporter |

### Gestión de Reportes
| Comando | Descripción |
|---------|-------------|
| `npm run report:merge` | Combina reportes JSON individuales |
| `npm run report:generate` | Genera reporte HTML con timestamp |
| `npm run report:sync-docs` | Sincroniza reportes a docs/ y public/ |
| `npm run clean-reports` | Limpia archivos JSON acumulados |
| `npm run clean-generated` | Limpia TODOS archivos generados automáticamente |
| `npm run delete-report` | Elimina ejecución específica desde terminal |

### Servidores y API
| Comando | Descripción |
|---------|-------------|
| `npm run api-server` | **NUEVO**: Servidor API para eliminación web |
| `npm run posttest` | **Automático**: Se ejecuta después de `npm test` |

## Flujo de Trabajo Completo

### Flujo Automático Principal
```bash
# EJECUTAR TESTS (aconsejado diariamente)
npm run test

# Resultado automático:
# Tests ejecutados
# Reportes generados con timestamp
# Archivos JSON limpiados
# Sincronización a web completada
# Aplicación actualizada
```

### Para Desarrollo Completo
```bash
# Terminal 1: Aplicación web
npm start
# URL: http://localhost:5175

# Terminal 2: Servidor API (para eliminación)
npm run api-server
# URL: http://localhost:3001

# Terminal 3: Ejecutar tests cuando sea necesario
npm run test
```

## Interfaz Web - Características Avanzadas

### Página de Reportes (`/reports`)

#### Desplegables por Fecha
- Cada fecha es un **botón desplegable**
- **Flecha animada** que rota al expandir/colapsar
- **Transiciones suaves** para mejor UX

#### Paginación Inteligente
- **5 fechas por página** para mejor performance
- **Siempre visible** (muestra "1" incluso con una sola página)
- **Flechas de navegación** con color rojo consistente
- **Controles de navegación** (Anterior/Siguiente)
- **Indicador de página** actual
- **Compatible con filtros**

#### Eliminación Directa
- **Botón "Eliminar"** en cada ejecución
- **Confirmación** antes de eliminar
- **Eliminación instantánea** vía API
- **Actualización automática** de la interfaz

#### Filtros Avanzados
- **Fecha específica**
- **Rango de fechas** (desde/hasta)
- **Limpieza de filtros**
- **Estados visuales** claros

### Ejemplo de Uso de la API

```javascript
// Eliminar una ejecución específica
fetch('http://localhost:3001/api/delete-report', {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    date: '2025-10-09',
    filePath: '2025-10-09/report-2025-10-09T14-30-21.html'
  })
});
```

## Arquitectura del Sistema

### Aplicación Web React + Vite
- **Framework**: React 18.3.1 con hooks modernos
- **Build Tool**: Vite 7.1.9 (desarrollo rápido)
- **Styling**: Tailwind CSS 3.4.18
- **Routing**: React Router DOM 6.30.1
- **Arquitectura**: Componentes modulares con separación de responsabilidades
- **Custom Hooks**: Lógica de negocio centralizada y reutilizable

### Estructura de Componentes
```
📁 components/
├── 📁 common/     # Componentes compartidos (Footer)
├── 📁 home/       # Componentes específicos de Home
├── 📁 reports/    # Componentes específicos de reportes
└── Layout.jsx     # Layout principal
```

### Custom Hooks
```
📁 hooks/
└── useReports.js  # Gestión completa del estado de reportes
```

### Patrón de Diseño Implementado
- **Single Responsibility**: Cada componente tiene una función específica
- **Composition over Inheritance**: Componentes compuestos para funcionalidad compleja
- **Custom Hooks**: Lógica reutilizable separada de la UI
- **Props Interface**: Comunicación clara entre componentes padre-hijo

## Configuración Inicial

### 1. Variables de Entorno
Crea un archivo `.env` en la raíz:

```env
# Credenciales para testing
USER=tu_usuario_real
PASS=tu_password_real

# URL base de la aplicación
CYPRESS_BASE_URL=https://testing.hlt.gob:3007
```

### 2. GitHub Pages (Opcional)
Para publicar reportes online:

1. Ir a **Settings** → **Pages** en GitHub
2. Seleccionar **Deploy from branch**
3. Elegir **main** y carpeta **docs/**
4. Los reportes estarán disponibles en: `https://tu-usuario.github.io/tu-repo/`

## Scripts de Automatización

### `scripts/api-server.js`
Servidor Express que maneja operaciones de reportes vía API REST.

**Características:**
- Endpoint `DELETE /api/delete-report` para eliminación
- Endpoint `GET /api/reports` para consultar reportes
- Endpoint `GET /api/health` para verificar estado
- CORS habilitado para frontend

### `scripts/delete-report.js`
Script para eliminar ejecuciones específicas desde terminal.

**Uso:**
```bash
npm run delete-report "2025-10-09" "2025-10-09/report-2025-10-09T14-30-21.html"
```

### `scripts/sync-reports-to-docs.js`
Sincroniza reportes desde `cypress/reports/` hacia `docs/reports/` y `public/reports/`.

**Funciones:**
- Copia archivos HTML organizados por fecha
- Genera archivo `report.json` para la aplicación React
- Mantiene estructura optimizada para web

## Mejores Prácticas Implementadas

### Arquitectura de Software
- **Componentes modulares**: Separación clara por funcionalidad (home/, common/, reports/)
- **Single Responsibility Principle**: Cada componente tiene una única responsabilidad
- **Custom hooks**: Lógica de negocio centralizada y reutilizable
- **Composition pattern**: Componentes compuestos para funcionalidad compleja

### Desarrollo Frontend
- **Separación de concerns**: UI vs lógica de negocio vs estado
- **Props interface**: Comunicación clara y tipada entre componentes
- **Reutilización**: Componentes diseñados para ser reutilizables
- **Mantenibilidad**: Código fácil de modificar y extender

### Automatización y Testing
- **Separación de concerns**: cypress/ vs docs/ vs public/
- **Fuente única de verdad**: `cypress/reports/` como origen
- **Automatización completa**: Flujo `npm run test` → reportes listos
- **Limpieza automática**: Archivos JSON no se acumulan
- **API RESTful**: Operaciones backend para frontend
- **Interfaz moderna**: UX avanzada con React
- **Responsive design**: Funciona en todos los dispositivos
- **GitHub Pages ready**: Estructura optimizada para deployment

## Troubleshooting

### Tests Fallan por Credenciales
```bash
# Verificar variables de entorno
echo $env:USER $env:PASS  # PowerShell
```

### Reportes No Se Generan
```bash
# Limpiar y regenerar
npm run clean-reports
npm run test
```

### API Server No Responde
```bash
# Verificar que esté corriendo
npm run api-server

# Health check
curl http://localhost:3001/api/health
```

### Eliminación No Funciona
```bash
# Verificar servidor API activo
# Intentar desde terminal primero
npm run delete-report "fecha" "archivo"
```

##  Sistema de Categorización Automática

### Cómo Funciona la Categorización
El sistema analiza automáticamente el contenido HTML de cada reporte generado para determinar su categoría:

- **Core**: Tests de funcionalidades básicas y críticas del sistema
  - Detecta rutas: `cypress/e2e/core/`
  - Icono:  (science) - Material Symbol
  
- **Features**: Tests de funcionalidades específicas y avanzadas
  - Detecta rutas: `cypress/e2e/features/`
  - Icono:  (extension) - Material Symbol
  
- **Mixed**: Tests que combinan ambas categorías
  - Contiene ambas rutas en el mismo reporte

### Navegación por Categorías
- **Página Home**: Tarjetas con Material Symbols para acceder a Core/Features
- **Páginas Dedicadas**: `/core` y `/features` con filtros específicos
- **Filtros Inteligentes**: Incluyen reportes mixtos cuando corresponde

### Configuración ESLint + Tailwind CSS
```json
// eslint.config.js - Configuración moderna ESLint v9
import js from '@eslint/js';
import tsparser from '@typescript-eslint/parser';
import tailwind from 'eslint-plugin-tailwindcss';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: { tailwindcss: tailwind },
    rules: {
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'warn'
    }
  }
];
```

**Comandos de linting:**
- `npm run lint` - Verificar código
- `npm run lint:fix` - Corregir automáticamente

## Contribución

1. Fork el proyecto
2. Crea rama: `git checkout -b feature/nueva-funcionalidad`
3. Añade tests en `cypress/e2e/features/`
4. Ejecuta: `npm run test`
5. Commit: `git commit -m 'Add nueva funcionalidad'`
6. Push: `git push origin feature/nueva-funcionalidad`
7. Abre Pull Request

## Documentación Adicional

- **Estructura técnica**: Ver [STRUCTURE.md](./STRUCTURE.md)
- **Configuración Cypress**: Ver [cypress.config.js](./cypress.config.js)
- **Configuración reportes**: Ver [reporter-config.json](./reporter-config.json)

---

**Última actualización:** Octubre 2025
**Versión:** 4.1.0
**Novedades:** Paginación siempre visible con 5 fechas/página, flechas rojas consistentes, pipeline completamente automatizado, scripts convertidos a ES modules, eliminación de carpetas redundantes
