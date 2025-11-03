#  Estructura del Proyecto

##  Arquitectura General

```
cypress-leyes/
├── src/                    # Aplicación React
│   ├── components/         # Componentes modulares
│   │   ├── common/        # Compartidos (ErrorBoundary, LoadingSpinner)
│   │   ├── reports/       # Específicos de reportes
│   │   └── Layout.jsx     # Layout principal
│   ├── hooks/             # Custom hooks reutilizables
│   │   ├── useReports.js  # Hook principal
│   │   └── reports/       # Hooks especializados
│   ├── utils/             # Utilidades compartidas
│   └── constants/         # Configuración centralizada
├── cypress/               # Tests automatizados
│   ├── e2e/
│   │   ├── core/          # Tests de funcionalidades base
│   │   └── features/      # Tests de features específicas
│   └── reports/           # Reportes generados
├── docs/                  # Build de producción (GitHub Pages)
├── scripts/               # Automatización
└── public/                # Assets estáticos
```

##  Componentes Principales

### Frontend React
- **Layout.jsx**: Navegación y estructura base
- **ErrorBoundary.jsx**: Captura de errores
- **LoadingSpinner.jsx**: Indicador de carga
- **ReportsPage.jsx**: Layout base para páginas de reportes

### Custom Hooks
- **useReports.js**: Gestión completa del estado de reportes
- **useReportsActions.js**: Acciones (eliminar reportes)
- **useReportsData.js**: Carga y procesamiento de datos
- **useReportsFilters.js**: Sistema de filtros
- **useReportsPagination.js**: Paginación inteligente
- **useReportsExpansion.js**: Expansión/colapso de secciones

### Utilidades
- **apiUtils.js**: Funciones para llamadas API
- **dateUtils.js**: Formateo de fechas
- **generalUtils.js**: Utilidades generales (debounce, range, etc.)

##  Scripts de Automatización

### API y Backend
- **api-server.js**: Servidor Express para eliminación de reportes
- **delete-report.js**: Eliminación desde terminal

### Procesamiento de Reportes
- **generate-reports-json.js**: Procesamiento JSON con categorización
- **sync-reports-to-docs.js**: Sincronización automática

##  Sistema de Categorización

### Categorías Automáticas
- **Core**: Funcionalidades críticas (`cypress/e2e/core/`)
- **Features**: Funcionalidades específicas (`cypress/e2e/features/`)
- **Mixed**: Combinación de ambas categorías

### Navegación
- **Home** (`/`): Tarjetas de acceso a Core/Features
- **Páginas dedicadas**: `/core`, `/features`, `/mixed`
- **Filtros inteligentes**: Incluyen reportes mixtos automáticamente

## 🚀 Flujo de Trabajo

### Desarrollo
1. `npm start` - Servidor de desarrollo
2. Modificar código en `src/`
3. `npm run lint` - Verificar calidad

### Testing
1. `npm run test:core` - Tests de funcionalidades base
2. `npm run test:features` - Tests de features específicas
3. `npm run test` - Testing completo

### Producción
1. `npm run build` - Compilar aplicación
2. Archivos generados en `docs/`
3. Desplegar desde carpeta `docs/`

##  Referencias

- **README.md**: Inicio rápido y características
- **COMANDOS.md**: Guía completa de comandos npm

---

**Versión:** 4.2 | **Actualizado:** Octubre 2025

## Análisis Detallado de la Organización

### `src/` -  Aplicación Web React

Contiene el código fuente de la aplicación React para visualización de reportes:

```
src/
├── components/                 #  Arquitectura modular de componentes
│   ├── common/                # Componentes compartidos y reutilizables
│   │   └── Footer.jsx         # Footer común a toda la aplicación
│   ├── home/                  # Componentes específicos de la página Home
│   │   ├── SeccionPrincipal.jsx   # Sección principal con logo y título
│   │   └── TarjetasAcceso.jsx     #  Tarjetas Core/Features con Material Symbols
│   ├── reports/               # Componentes específicos de reportes
│   │   ├── EstadisticasReportes.jsx  # Dashboard de estadísticas
│   │   ├── FiltrosReportes.jsx       # Sistema de filtros avanzado
│   │   ├── PaginacionReportes.jsx    # Paginación inteligente
│   │   ├── ReporteFecha.jsx          # Sección desplegable por fecha
│   │   ├── ReporteItem.jsx           # Item individual de ejecución
│   │   └── BotonesAccion.jsx         # Botones de acción (ver/eliminar)
│   └── Layout.jsx             # Layout principal con navegación
├── hooks/                     # Custom hooks para lógica reutilizable
│   └── useReports.js          # Hook principal para gestión de reportes
├── pages/                     # Páginas principales (vistas limpias)
│   ├── Home.jsx               # Página de inicio con tarjetas Core/Features
│   ├── CoreReports.jsx        # Reportes dedicados para funcionalidades Core
│   ├── FeatureReports.jsx     # Reportes dedicados para funcionalidades Features
│   └── Reports.jsx            # Interfaz avanzada de reportes (legacy)
├── App.jsx                    # Configuración de rutas (React Router)
├── main.jsx                   # Punto de entrada de la aplicación
└── index.css                  # Estilos globales y Tailwind
```

**Características principales de la arquitectura:**
- **Componentes modulares**: Separación por funcionalidad (home/, common/, reports/)
- **Single Responsibility**: Cada componente tiene una única responsabilidad
- **Custom hooks**: Lógica de negocio centralizada en `useReports.js`
- **Composition pattern**: Componentes compuestos para funcionalidad compleja
- **Reutilización**: Componentes diseñados para ser reutilizables
- **Mantenibilidad**: Código fácil de localizar y modificar

**Flujo de composición:**
```
Reports.jsx (Vista)
├── useReports.js (Lógica centralizada)
├── EstadisticasReportes.jsx (UI - Estadísticas)
├── FiltrosReportes.jsx (UI - Filtros)
├── ReporteFecha.jsx (UI - Fecha desplegable)
│   ├── ReporteItem.jsx (UI - Item individual)
│   │   └── BotonesAccion.jsx (UI - Botones)
└── PaginacionReportes.jsx (UI - Paginación)
```

### `cypress/` - Sistema de Testing

Contiene toda la configuración y artefactos relacionados con testing:

```
cypress/
├── e2e/
│   ├── core/                   # Funcionalidades base del sistema
│   │   └── nuevaLey.cy.js      # Tests de funcionalidades principales
│   └── features/               # Cards específicas para automatizar
│       └── (tests futuros)     # Tests para casos específicos/features
├── fixtures/                   # Datos de prueba
├── reports/                    # Reportes técnicos (fuente única)
├── screenshots/                # Capturas de errores
└── support/                    # Comandos y configuraciones
```

### `docs/` - GitHub Pages + Aplicación Build

Contiene la aplicación React compilada y reportes para publicación web:

```
docs/
├── assets/                     #  Assets organizados de la aplicación
│   ├── css/                    # Estilos compilados
│   ├── js/                     # Scripts compilados
│   └── images/                 # Imágenes y logos
├── reports/                    # Reportes para visualización web
│   ├── index.html              # Navegador React de reportes
│   ├── report.json             # Datos JSON consolidados
│   ├── 2025-09-29/             # Reportes organizados por fecha
│   │   ├── report-2025-09-29T10-30-15.html
│   │   └── assets/             # CSS, JS, fonts del reporte
│   └── 2025-09-30/             # Más fechas...
└── index.html                  # Aplicación React compilada
```

**Funciones:**
- **Aplicación web**: Build de React para visualización de reportes
- **GitHub Pages**: Publicación automática desde esta carpeta
- **Assets organizados**: Estructura optimizada para web
- **Reportes históricos**: Acceso a todos los reportes por fecha

### `scripts/` - Utilitarios de Automatización

Scripts personalizados para gestión automatizada del proyecto:

```
scripts/
├── generate-reports-json.js     # Procesa y consolida datos JSON con categorización automática
└── sync-reports-to-docs.js      # Sincronización automática cypress/ → docs/
```

**Funciones de cada script:**
- **generate-reports-json.js**: Procesa datos JSON de múltiples fuentes
- **sync-reports-to-docs.js**: Copia reportes para publicación web

### `public/` - Assets Estáticos

Assets públicos servidos directamente por Vite:

```
public/
├── assets/                     # Assets organizados
│   ├── css/                    # Estilos adicionales
│   ├── js/                     # Scripts adicionales
│   ├── images/                 # Imágenes y logos
│   │   ├── logo-legis-act-D-yCoXSC.png
│   │   └── bug_report.svg
│   └── js/                     # Scripts públicos
└── reports/                    # Reportes timestamped (opcional)
```

**Características:**
- **Assets globales**: Disponibles en toda la aplicación
- **Rutas directas**: `/assets/images/logo.png`
- **Vite integration**: Copiados automáticamente al build

## Flujo de Reportes Actualizado

### Principio: Automatización Completa
- **`cypress/reports/`** = Fuente única donde Cypress genera reportes
- **`docs/reports/`** = Copia automática para aplicación web
- **`src/pages/Reports.jsx`** = Interfaz React para visualización

### Scripts Disponibles v3.0

| Script | Propósito | Cuándo Usarlo |
|--------|-----------|---------------|
| `npm run test` | **FLUJO COMPLETO**: Tests + reportes + limpieza + sincronización | **Diariamente** |
| `npm run api-server` |  Servidor API para eliminación web | **Desarrollo con eliminación** |
| `npm run delete-report` |  Eliminar ejecución desde terminal | **Alternativa manual** |
| `npm run report:merge` | Combinar JSONs individuales | Post-test automático |
| `npm run report:generate` | Generar HTML con timestamp | Post-test automático |
| `npm run report:sync-docs` | Sincronizar a docs/ y public/ | Post-test automático |
| `npm run clean-reports` | Limpiar JSONs acumulados | Automático en `npm test` |

> ** Flujo recomendado:** Solo `npm run test` + `npm start` + `npm run api-server` para experiencia completa

##  Sistema de Categorización Automática Core/Features

### Cómo Funciona la Inteligencia Artificial de Categorización
El sistema utiliza análisis de contenido HTML para categorizar automáticamente cada reporte:

**Algoritmo de Detección:**
1. **Análisis HTML**: Examina el contenido completo del reporte generado
2. **Detección de Rutas**: Busca patrones `cypress\\e2e\\core\\` y `cypress\\e2e\\features\\`
3. **Clasificación**: Asigna categoría basada en las rutas encontradas
4. **Metadata Enriquecida**: Agrega información de categoría al JSON del reporte

**Categorías del Sistema:**
- **Core** : Funcionalidades básicas y críticas del sistema
- **Features** : Funcionalidades específicas y avanzadas
- **Mixed** : Reportes que combinan ambas categorías

### Navegación por Categorías Dedicadas
- **Home Page**: Tarjetas con Material Symbols para acceso directo
- **Páginas Especializadas**: `/core` y `/features` con filtros específicos
- **Filtros Inteligentes**: Incluyen reportes mixtos cuando corresponde

### Material Symbols Integration
```html
<!-- index.html -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />

<!-- En componentes React -->
<span className="material-symbols-outlined text-6xl text-gray-400">science</span>     <!-- Core -->
<span className="material-symbols-outlined text-6xl text-gray-400">extension</span>  <!-- Features -->
```

## Beneficios de esta Organización v4.0

### 1. **Aplicación Web Moderna**
- Interfaz React con desplegables animados por fecha
- Paginación automática (5 fechas por página)
- Eliminación directa desde la web (sin terminal)
- Diseño responsive con Tailwind CSS
- Navegación SPA fluida con React Router

### 2. **API Backend Avanzada**
- Servidor Express.js con endpoints REST
- Eliminación de reportes vía API (DELETE /api/delete-report)
- CORS configurado para desarrollo local
- Regeneración automática de índices JSON

### 3. **Automatización Completa**
- `npm run test` genera todo automáticamente + limpieza
- Copia automática a `docs/` y `public/` para web
- Build optimizado para GitHub Pages
- Scripts npm corregidos para Windows PowerShell

### 4. **Gestión Inteligente de Reportes**
- Limpieza automática de JSONs acumulados
- Eliminación selectiva por ejecución específica
- Historial organizado por fechas con navegación intuitiva
- Sincronización automática entre carpetas

## Uso Recomendado

### Para Desarrollo Diario:
```bash
npm run test:timestamped  # Ejecuta tests y genera todo
```

### Para Actualizar GitHub Pages:
```bash
npm run docs:sync         # Sincroniza reportes para documentación
```

### Para Debugging:
```bash
npm run cypress:open      # Abrir Cypress en modo interactivo
```

## Checklist de Buenas Prácticas Aplicadas

- [x] **Separación de concerns**: cypress/ vs docs/
- [x] **Assets organizados**: css/, js/, images/
- [x] **Fuente única**: cypress/reports/ como verdad
- [x] **No duplicación**: docs/reports/ solo enlaza
- [x] **Nomenclatura clara**: core/ vs features/
- [x] **Scripts automatizados**: Sincronización automática
- [x] **GitHub Pages ready**: Rutas y estructura optimizada
- [x] **Documentación**: README principal + técnica detallada

## Detalles de Implementación

### Manejo de Assets en docs/
```
docs/assets/
├── css/           # Estilos CSS organizados
├── js/            # Scripts JavaScript (si los hay)
└── images/        # Todas las imágenes (logos, iconos, etc.)
```

**Beneficios:**
- URLs predecibles: `/assets/images/logo.png`
- Separación por tipo de archivo
- Fácil mantenimiento y versionado

### Sincronización de Reportes
El script `scripts/sync-reports-to-docs.js`:
1. **Lee** todos los reportes de `cypress/reports/`
2. **Genera** un índice HTML en `docs/reports/index.html`  
3. **Crea enlaces** relativos hacia `../../cypress/reports/`
4. **NO copia** archivos, solo crea referencias

**Ventajas:**
- Sin duplicación de archivos
- `cypress/reports/` es la única fuente de verdad
- `docs/reports/` es solo una vista/navegador



### 🆕 Estructura Actual Completa v4.0
```
cypress-leyes/
├── src/                   #  Aplicación React moderna
│   ├── components/        # Componentes reutilizables
│   ├── pages/             # Páginas de la aplicación
│   │   ├── Home.jsx       # Página de inicio con tarjetas Core/Features
│   │   ├── CoreReports.jsx    #  Reportes dedicados Core
│   │   ├── FeatureReports.jsx #  Reportes dedicados Features
│   │   └── Reports.jsx    # Interfaz avanzada (legacy)
│   ├── App.jsx            # Enrutamiento React Router
│   └── main.jsx           # Punto de entrada Vite
├── cypress/               # Tests automatizados
│   ├── e2e/               # Casos de test
│   │   ├── core/          # Categoría Core (funcionalidades base)
│   │   └── features/      # Categoría Features (funcionalidades específicas)
│   ├── reports/           # Reportes técnicos (fuente única)
│   └── support/           # Configuración y comandos
├── docs/                  # Build + GitHub Pages
│   ├── assets/            # Assets compilados
│   └── reports/           # Reportes para visualización web
├── scripts/               # Utilitarios automatizados v4.0
│   ├── api-server.js      # Servidor Express API
│   ├── delete-report.js   # Eliminación desde terminal
│   ├── generate-reports-json.js # Categorización automática inteligente
│   └── sync-reports-to-docs.js  # Sincronización automática
├── .vscode/               # Configuración VS Code
│   └── settings.json      # Configuración Tailwind CSS
├── eslint.config.js       # ESLint v9 con plugin Tailwind
├── public/                # Assets estáticos
└── package.json           # Dependencias actualizadas

# Documentación consolidada v4.1
├── README.md              # Guía principal completa
└── STRUCTURE.md           # Detalles técnicos actualizados
```

## 🆕 Características Técnicas v4.1

### **Arquitectura Modular React**
- **Componentes Modulares**: Separación por funcionalidad (home/, common/, reports/)
- **Single Responsibility**: Cada componente tiene una única responsabilidad
- **Custom Hooks**: Lógica de negocio centralizada en `useReports.js`
- **Composition Pattern**: Componentes compuestos para funcionalidad compleja
- **Reutilización**: Componentes diseñados para ser reutilizables
- **Mantenibilidad**: Código fácil de localizar y modificar

### **Interfaz React Avanzada**
- **Desplegables Animados**: Secciones por fecha con transiciones suaves
- **Paginación Mejorada**: Siempre visible, 5 fechas por página, flechas rojas consistentes
- **Eliminación Directa**: Botones de eliminación con confirmación modal
- **Responsive Design**: Adaptable a móviles y tablets
- **Estados de Carga**: Indicadores visuales durante operaciones

### **API Backend Express.js**
- **DELETE /api/delete-report**: Endpoint para eliminación de reportes
- **CORS Configurado**: Para desarrollo local con React
- **Manejo de Errores**: Respuestas estructuradas con códigos HTTP
- **Regeneración Automática**: Actualización de índices JSON post-eliminación

### **Automatización Mejorada**
- **Limpieza Automática**: JSONs acumulados eliminados entre tests
- **Sincronización Multi-carpeta**: `docs/` y `public/` actualizados automáticamente
- **Scripts Paralelos**: API server + aplicación React simultáneos
- **Gestión de Procesos**: Background processes con control de estado

### **Gestión de Estado React**
- **useState Hooks**: Para expandedDates, currentPage, loading states
- **useEffect**: Para carga inicial de datos y sincronización
- **Fetch API**: Comunicación con backend para operaciones CRUD
- **Error Boundaries**: Manejo robusto de errores en UI

### **Mejoras v4.1 - Pipeline Completamente Automatizado**
- **Scripts ES Modules**: Convertidos de CommonJS para compatibilidad moderna
- **Eliminación Carpetas Redundantes**: reports/ raíz eliminada para evitar inconsistencias
- **Sincronización Perfecta**: Pipeline cypress/ → docs/ → public/ sin fallos
- **npm run test**: Crea carpeta del día actual automáticamente
- **Paginación Siempre Visible**: Muestra "1" incluso con una sola página
- **Flechas Rojas Consistentes**: Color igual que SVG del home para coherencia visual

## Checklist de Nuevas Funcionalidades v4.1

- [x] **Categorización Automática**: Sistema de IA que analiza HTML para clasificar Core/Features
- [x] **Material Symbols Icons**: Iconografía consistente con Google Fonts (science/extension)
- [x] **Páginas Dedicadas**: `/core` y `/features` con navegación especializada
- [x] **ESLint Configurado**: Plugin Tailwind CSS resuelve problemas de linting
- [x] **Configuración VS Code**: Settings.json para reconocimiento de Tailwind
- [x] **Iconos Gris Claro**: Mejor apariencia visual y consistencia
- [x] **Arquitectura Modular**: Componentes organizados por funcionalidad
- [x] **Custom Hooks**: Lógica de negocio centralizada en `useReports.js`
- [x] **Separación de Responsabilidades**: UI vs lógica vs estado claramente separados
- [x] **Componentes Reutilizables**: Diseño para máxima reutilización
- [x] **Código Ultra-Limpio**: Páginas súper concisas (82-83 líneas)
- [x] **Mantenibilidad Mejorada**: Fácil localizar y modificar componentes
- [x] **API Backend**: Servidor Express con endpoints REST
- [x] **Eliminación Web**: Sin necesidad de comandos terminal
- [x] **UI Desplegable**: Secciones colapsables por fecha con animaciones
- [x] **Paginación Mejorada**: Siempre visible, 5 fechas/página, flechas rojas
- [x] **Responsive Design**: Adaptable a móviles y tablets
- [x] **Estados de Carga**: UX mejorada con indicadores visuales
- [x] **Scripts ES Modules**: Convertidos para compatibilidad moderna
- [x] **Pipeline Automatizado**: npm run test crea carpeta del día sin fallos
- [x] **Eliminación Carpetas Redundantes**: reports/ raíz eliminada
- [x] **Sincronización Perfecta**: cypress/ → docs/ → public/ automática
- [x] **Documentación Completa**: README y STRUCTURE actualizados
- [x] **Scripts npm**: Nuevos comandos para API y eliminación
- [x] **Responsive Design**: Interfaz adaptable a diferentes dispositivos
- [x] **Estados de Carga**: UX mejorada con indicadores visuales