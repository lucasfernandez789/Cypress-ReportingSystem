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

### Arquitectura Desacoplada 

**Nueva en v2.0**: Implementamos una **arquitectura desacoplada** que separa el frontend del sistema de reportes, permitiendo:

- **Frontend reutilizable**: Interfaz común para múltiples proyectos
- **Configuración dinámica**: Cada fork apunta a sus propios reportes
- **Mantenimiento simplificado**: Actualizaciones del UI sin afectar tests
- **Flexibilidad de deployment**: Reportes pueden alojarse en diferentes servicios

#### Para Nuevos Forks

1. **Hacer Fork** del repositorio
2. **Configurar** automáticamente con `npm run setup`
3. **Personalizar** tests para tu aplicación
4. **Configurar fuente de reportes** (ver [Arquitectura Desacoplada](ARCHITECTURE.md))

#### Variables de Entorno para Forks

```bash
# .env
VITE_REPORTS_BASE_URL=https://tu-usuario.github.io/tu-repo
VITE_REPORTS_REPO_OWNER=tu-usuario
VITE_REPORTS_REPO_NAME=tu-repo
```

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

## Template Cypress Ligero

Para proyectos que solo necesitan **testing automatizado sin frontend**, hemos creado un template optimizado:

```bash
# Crear versión template (solo Cypress + reportes)
npm run create:template

# Usar el template generado
cd cypress-template
npm install
npm run setup
```

### ¿Qué incluye el template?

- ✓ **Cypress 15.3.0** completamente configurado
- ✓ **Scripts de reportes** automatizados
- ✓ **Configuración multi-reporter** (Mochawesome + JSON)
- ✓ **Variables de entorno** para apuntar a frontend externo
- ✓ **Scripts de publicación** de reportes
- ✓ **Filtrado por sistema** (APP_NAME en .env)
- ✗ **Sin frontend React** (consume reportes de URL externa)

### Caso de uso ideal

Perfecto para **equipos que ya tienen un frontend** y solo necesitan:
- Sistema de testing automatizado
- Generación y publicación de reportes
- Integración con frontend existente

```bash
# Configurar para usar tu frontend existente
echo "VITE_REPORTS_BASE_URL=https://tu-frontend.vercel.app" > .env
```

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
│   │       ├── SystemSelector.jsx      # Selector de sistema/fork
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
| `npm run dev` | **RECOMENDADO**: Desarrollo con sincronización inicial |
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
| `npm run report:merge` | Unir reportes JSON de Mochawesome |
| `npm run report:generate` | Generar reportes HTML con timestamp |
| `npm run report:sync-docs` | Sincronizar reportes a docs/ |
| `npm run report:publish` | Publicar reportes a destino externo |

### Setup y Configuración
| Comando | Descripción |
|---------|-------------|
| `npm run setup` | **CONFIGURACIÓN COMPLETA** automática |
| `npm run setup:env local` | Configurar entorno local |
| `npm run setup:env prod` | Configurar entorno producción |
| `npm run setup:tests` | Crear estructura básica de tests |
| `npm run setup:app` | Configurar aplicación y constantes |
| `npm run cleanup` | Limpiar archivos del template |
| `npm run verify` | Verificar configuración completa |
| `npm run create:template` | Crear template Cypress ligero |

### CLI Avanzado
```bash
# Configuración completa
npm run setup -- --all

# Configurar entorno específico
npm run setup -- --env local
npm run setup -- --env prod

# Configuración específica
npm run setup -- --tests
npm run setup -- --app

# Ver ayuda
npm run setup -- --help
```

> **Para explicaciones detalladas consulta [COMANDOS.md](COMANDOS.md)**

## Sistema de Watchers Automáticos

### ¿Qué es y por qué existe?

**El problema:** Cuando ejecutas tests de Cypress, los reportes se generan en un directorio externo (fuera del proyecto web). Para ver estos reportes en la aplicación web, normalmente tendrías que:

1. Ejecutar tests → reportes se generan
2. Copiar manualmente los reportes al proyecto web
3. Recargar la página para verlos

**La solución:** El watcher automático monitorea el directorio de reportes y copia los archivos automáticamente cada vez que detecta cambios.

### Mejoras que brinda

- **Ahorra tiempo:** No necesitas copiar reportes manualmente
- **Actualización manual:** Botón "Actualizar" en la interfaz para refrescar cuando necesites
- **Sin sobrecarga:** No hay polling automático que consuma recursos
- **Comodidad:** Especialmente útil cuando desarrollas la interfaz de reportes mientras pruebas

### ¿Cuándo usarlo?

- ✅ Cuando desarrollas la interfaz de reportes y necesitas ver cambios inmediatamente
- ✅ Cuando ejecutas muchos tests y quieres ver resultados en tiempo real
- ❌ Para desarrollo normal de la aplicación (no es necesario)
- ❌ Para producción (no se usa en producción)

### Comandos

```bash
# Desarrollo normal (recomendado - SIN watcher)
npm run dev

# Watcher independiente (solo cuando lo necesites)
npm run watch-reports
```

**Nota:** El watcher consume recursos del sistema. Úsalo solo cuando realmente necesites sincronización automática.

## Flujo de Trabajo

### Desarrollo Diario (Simple)

```bash
# 1. Iniciar desarrollo
npm run dev

# 2. Abrir http://localhost:5173 en el navegador

# 3. Desarrollar normalmente - los cambios se ven automáticamente
```

### Desarrollo con Reportes en Tiempo Real (Avanzado)

```bash
# Terminal 1: Servidor de desarrollo
npm start

# Terminal 2: Watcher de reportes (opcional)
npm run watch-reports

# Ahora cuando ejecutes tests, los reportes se sincronizan automáticamente.
# Para verlos en la web, haz clic en "Actualizar" en la interfaz.
```
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

# O usando el CLI avanzado:
node scripts/setup.js --all

# O configuración paso a paso:
npm run setup:env local    # Configurar entorno local
npm run setup:tests        # Crear estructura de tests
npm run setup:app          # Configurar aplicación
npm run cleanup            # Limpiar archivos del template
npm run verify             # Verificar configuración
```

### Configuración por Entorno

```bash
# Desarrollo local
node scripts/setup.js --env local

# Producción
node scripts/setup.js --env prod
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

**Configuración del Sistema**

El nombre del sistema se configura mediante la variable `APP_NAME` en el archivo `.env`. Cada fork debe tener su propio `APP_NAME` único:

```bash
# .env
APP_NAME="Mi Sistema Único"
```

Esto permite que múltiples forks del mismo repositorio tengan reportes separados configurando diferentes `APP_NAME` en sus respectivos archivos `.env`.

## Configuración Avanzada

### Variables de Entorno Completas

El sistema utiliza un sistema completo de variables de entorno para máxima configurabilidad. Todas las variables tienen valores por defecto, pero puedes personalizarlas según tus necesidades.

#### Archivo `.env` - Variables Principales

```bash
# ===========================================
# CONFIGURACIÓN DE AUTENTICACIÓN
# ===========================================
USER=tu_usuario                    # Usuario para tests autenticados
PASS=tu_password                   # Password para tests autenticados

# ===========================================
# CONFIGURACIÓN DE CYPRESS
# ===========================================
CYPRESS_BASE_URL=http://localhost:3000  # URL de la aplicación a testear
CYPRESS_VIEWPORT_WIDTH=1280             # Ancho del viewport (opcional)
CYPRESS_VIEWPORT_HEIGHT=720             # Alto del viewport (opcional)
CYPRESS_DEFAULT_COMMAND_TIMEOUT=4000    # Timeout por defecto en ms (opcional)
CYPRESS_REQUEST_TIMEOUT=5000            # Timeout de requests en ms (opcional)

# ===========================================
# CONFIGURACIÓN DEL SISTEMA DE REPORTES
# ===========================================
APP_NAME=Cypress-ReportingSystem        # Nombre único del sistema/aplicación
APP_PREFIX=CYPRESS                      # Prefijo para identificar el sistema
REPORTS_DIR=cypress/reports             # Directorio de reportes (absoluto o relativo)
REPORTS_BASE_URL=                       # URL base para reportes en producción

# ===========================================
# CONFIGURACIÓN DE GITHUB (PARA FORKS)
# ===========================================
VITE_REPO_NAME=Cypress-ReportingSystem  # Nombre del repo en GitHub
VITE_REPORTS_REPO_OWNER=tu_usuario       # Owner del repo en GitHub
VITE_REPORTS_REPO_NAME=tu_repo           # Nombre del repo (opcional si es igual)

# ===========================================
# RUTAS DE SPECS DE CYPRESS (OPCIONAL)
# ===========================================
CYPRESS_CORE_SPECS=cypress/e2e/core/*.cy.js        # Patrón para tests core
CYPRESS_FEATURES_SPECS=cypress/e2e/features/*.cy.js # Patrón para tests features
CYPRESS_ALL_SPECS=cypress/e2e/**/*.cy.js           # Patrón para todos los tests

# ===========================================
# CONFIGURACIÓN AVANZADA (OPCIONAL)
# ===========================================
REPORTS_RETENTION_DAYS=30               # Días para retener reportes
REPORTS_MAX_FILES_PER_DATE=50           # Máximo archivos por fecha
```

#### Variables de Entorno por Categoría

**🔐 Autenticación:**
- `USER`, `PASS`: Credenciales para tests que requieren login

**🧪 Cypress:**
- `CYPRESS_BASE_URL`: URL de la aplicación objetivo
- `CYPRESS_VIEWPORT_*`: Dimensiones del navegador de testing
- `CYPRESS_*_TIMEOUT`: Configuración de timeouts

**📊 Reportes:**
- `APP_NAME`: Identificador único del sistema (CRÍTICO para multi-sistema)
- `REPORTS_DIR`: Ubicación centralizada de todos los reportes
- `REPORTS_BASE_URL`: URL para compartir reportes entre sistemas

**🔗 GitHub:**
- `VITE_REPORTS_REPO_*`: Configuración para forks y deployments

**📁 Rutas:**
- `CYPRESS_*_SPECS`: Patrones de archivos para diferentes tipos de tests

### Ejemplos de Configuración

#### Para Desarrollo Local
```bash
# .env
CYPRESS_BASE_URL=http://localhost:3000
REPORTS_DIR=C:\Users\dev\Desktop\shared-reports
APP_NAME=MiApp-Dev
```

#### Para Sistema de Producción
```bash
# .env
CYPRESS_BASE_URL=https://mi-app.com
REPORTS_DIR=/opt/shared-reports
APP_NAME=MiApp-Prod
VITE_REPORTS_BASE_URL=https://reports.mi-app.com
```

#### Para Fork de GitHub
```bash
# .env
APP_NAME=SistemaContable
VITE_REPORTS_REPO_OWNER=miempresa
VITE_REPORTS_REPO_NAME=sistema-contable-testing
REPORTS_DIR=C:\Users\tester\Desktop\empresa-reports
```

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
- **Filtros avanzados** por fecha específica, rangos, categorías y sistema
- **Sistema multi-fork** con filtrado por APP_NAME (Sistema por Defecto, Cypress-ReportingSystem, etc.)
- **Indicador visual** cuando filtro específico está aplicado

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
| `npm run test:core` | Ejecuta solo tests Core (`cypress/e2e/core/*.cy.js`) |
| `npm run test:features` | Ejecuta solo tests Features (`cypress/e2e/features/*.cy.js`) |
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
components/
├── common/     # Componentes compartidos (Footer)
├── home/       # Componentes específicos de Home
├── reports/    # Componentes específicos de reportes
└── Layout.jsx     # Layout principal
```

### Custom Hooks
```
hooks/
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
