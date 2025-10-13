# Estructura del Proyecto - Documentación Técnica Detallada

> Esta es la documentación técnica detallada de la **Versión 3.1** del sistema Cypress Testing & Reporting con interfaz web React moderna, arquitectura modular, custom hooks, API backend, eliminación directa, desplegables y paginación.

## 🆕 Arquitectura Actualizada v3.1

### **Aplicación Web React + Sistema de Testing + API Backend**

- **Frontend**: React 18.3.1 con Vite 7.1.9
- **Testing**: Cypress 15.3.0 con Mochawesome
- **Backend**: Express.js API para operaciones avanzadas
- **Styling**: Tailwind CSS 3.4.18
- **Arquitectura**: Componentes modulares con custom hooks
- **Build**: Automatización completa con scripts npm

## Análisis Detallado de la Organización

### `src/` -  Aplicación Web React

Contiene el código fuente de la aplicación React para visualización de reportes:

```
src/
├── components/                 # 🆕 Arquitectura modular de componentes
│   ├── common/                # Componentes compartidos y reutilizables
│   │   └── Footer.jsx         # Footer común a toda la aplicación
│   ├── home/                  # Componentes específicos de la página Home
│   │   ├── SeccionPrincipal.jsx   # Sección principal con logo y título
│   │   └── TarjetaReportes.jsx    # Tarjeta de navegación a reportes
│   ├── reports/               # Componentes específicos de reportes
│   │   ├── EstadisticasReportes.jsx  # Dashboard de estadísticas
│   │   ├── FiltrosReportes.jsx       # Sistema de filtros avanzado
│   │   ├── PaginacionReportes.jsx    # Paginación inteligente
│   │   ├── ReporteFecha.jsx          # Sección desplegable por fecha
│   │   ├── ReporteItem.jsx           # Item individual de ejecución
│   │   └── BotonesAccion.jsx         # Botones de acción (ver/eliminar)
│   └── Layout.jsx             # Layout principal con navegación
├── hooks/                     # 🆕 Custom hooks para lógica reutilizable
│   └── useReports.js          # Hook principal para gestión de reportes
├── pages/                     # Páginas principales (vistas limpias)
│   ├── Home.jsx               # Página de inicio (82 líneas - súper limpia)
│   └── Reports.jsx            # Visualización de reportes (83 líneas - súper limpia)
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
└── index.html                  # 🆕 Aplicación React compilada
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
├── generate-report-index.js     # Genera índices HTML de reportes
├── generate-reports-json.js     # Procesa y consolida datos JSON
└── sync-reports-to-docs.js      # Sincronización automática cypress/ → docs/
```

**Funciones de cada script:**
- **generate-report-index.js**: Crea páginas HTML navegables
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

## 🆕 Flujo de Reportes Actualizado

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

## Beneficios de esta Organización v3.0

### 1. **Aplicación Web Moderna**
- 🆕 Interfaz React con desplegables animados por fecha
- 🆕 Paginación automática (5 fechas por página)
- 🆕 Eliminación directa desde la web (sin terminal)
- Diseño responsive con Tailwind CSS
- Navegación SPA fluida con React Router

### 2. **API Backend Avanzada**
- 🆕 Servidor Express.js con endpoints REST
- 🆕 Eliminación de reportes vía API (DELETE /api/delete-report)
- 🆕 CORS configurado para desarrollo local
- 🆕 Regeneración automática de índices JSON

### 3. **Automatización Completa**
- `npm run test` genera todo automáticamente + limpieza
- Copia automática a `docs/` y `public/` para web
- Build optimizado para GitHub Pages
- Scripts npm corregidos para Windows PowerShell

### 4. **Gestión Inteligente de Reportes**
- 🆕 Limpieza automática de JSONs acumulados
- 🆕 Eliminación selectiva por ejecución específica
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



### 🆕 Estructura Actual Completa v3.0
```
cypress-leyes/
├── src/                    # 🆕 Aplicación React moderna
│   ├── components/         # Componentes reutilizables
│   ├── pages/             # Páginas de la aplicación
│   │   ├── Home.jsx       # Página de inicio
│   │   └── Reports.jsx    # 🆕 Interfaz avanzada con desplegables/paginación
│   ├── App.jsx            # Enrutamiento React Router
│   └── main.jsx           # Punto de entrada Vite
├── cypress/               # Tests automatizados
│   ├── e2e/               # Casos de test
│   │   ├── core/          # Funcionalidades base
│   │   └── features/      # Tests específicos
│   ├── reports/           # Reportes técnicos (fuente única)
│   └── support/           # Configuración y comandos
├── docs/                  # Build + GitHub Pages
│   ├── assets/            # Assets compilados
│   └── reports/           # Reportes para visualización web
├── scripts/               # 🆕 Utilitarios automatizados v3.0
│   ├── api-server.js      # 🆕 Servidor Express API
│   ├── delete-report.js   # 🆕 Eliminación desde terminal
│   └── ...                # Scripts existentes
├── public/                # Assets estáticos
└── package.json           # Dependencias actualizadas

# Documentación consolidada v3.0
├── README.md              # ✅ Guía principal completa
└── STRUCTURE.md           # ✅ Detalles técnicos actualizados
```

## 🆕 Características Técnicas v3.1

### **Arquitectura Modular React**
- **Componentes Modulares**: Separación por funcionalidad (home/, common/, reports/)
- **Single Responsibility**: Cada componente tiene una única responsabilidad
- **Custom Hooks**: Lógica de negocio centralizada en `useReports.js`
- **Composition Pattern**: Componentes compuestos para funcionalidad compleja
- **Reutilización**: Componentes diseñados para ser reutilizables
- **Mantenibilidad**: Código fácil de localizar y modificar

### **Interfaz React Avanzada**
- **Desplegables Animados**: Secciones por fecha con transiciones suaves
- **Paginación Inteligente**: 5 fechas por página con navegación intuitiva
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

## Checklist de Nuevas Funcionalidades v3.1

- [x] **Arquitectura Modular**: Componentes organizados por funcionalidad
- [x] **Custom Hooks**: Lógica de negocio centralizada en `useReports.js`
- [x] **Separación de Responsabilidades**: UI vs lógica vs estado claramente separados
- [x] **Componentes Reutilizables**: Diseño para máxima reutilización
- [x] **Código Ultra-Limpio**: Páginas súper concisas (82-83 líneas)
- [x] **Mantenibilidad Mejorada**: Fácil localizar y modificar componentes
- [x] **API Backend**: Servidor Express con endpoints REST
- [x] **Eliminación Web**: Sin necesidad de comandos terminal
- [x] **UI Desplegable**: Secciones colapsables por fecha con animaciones
- [x] **Paginación**: Sistema de páginas para navegación eficiente
- [x] **Limpieza Automática**: JSONs acumulados eliminados automáticamente
- [x] **Sincronización Mejorada**: Múltiples carpetas actualizadas
- [x] **Documentación Completa**: README y STRUCTURE actualizados
- [x] **Scripts npm**: Nuevos comandos para API y eliminación
- [x] **Responsive Design**: Interfaz adaptable a diferentes dispositivos
- [x] **Estados de Carga**: UX mejorada con indicadores visuales