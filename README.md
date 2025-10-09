# Cypress Testing & Reporting System
## Sistema Completo de Testing Automatizado con Interfaz Web Moderna

> **Versión 3.0** - Testing automatizado con Cypress, reportes organizados por fecha, interfaz web React con eliminación directa, desplegables y paginación.

## Inicio Rápido

```bash
# Instalar dependencias
npm install

# EJECUTAR TESTS (con reportes automáticos)
npm run test

# VER REPORTES EN APLICACIÓN WEB
npm start

# INICIAR SERVIDOR API (para eliminación directa)
npm run api-server

# ABRIR CYPRESS EN MODO INTERACTIVO
npm run cypress:open
```

## Características Principales

### Testing Automatizado
- **Cypress 15.3.0** con configuración multi-reporter
- **Limpieza automática** de archivos JSON entre ejecuciones
- **Reportes Mochawesome** organizados por fecha y timestamp
- **Screenshots automáticos** en caso de fallos

### Interfaz Web Moderna
- **React 18.3.1** con Vite 7.1.9 para desarrollo rápido
- **Tailwind CSS 3.4.18** para diseño responsive
- **Eliminación directa** desde la web (sin terminal)
- **Desplegables por fecha** con animaciones
- **Paginación inteligente** (5 fechas por página)
- **Filtros avanzados** por fecha específica o rangos

### Sistema de Reportes
- **Generación automática** después de cada test
- **Historial completo** de todas las ejecuciones
- **Organización por fecha** con múltiples ejecuciones por día
- **Sincronización automática** entre desarrollo y producción
- **API REST** para operaciones avanzadas

## Estructura del Proyecto

```
cypress-leyes/
├── src/                           # Aplicación React moderna
│   ├── components/
│   │   └── Layout.jsx            # Layout con navegación
│   ├── pages/
│   │   ├── Home.jsx              # Página de inicio
│   │   └── Reports.jsx           # Interfaz avanzada de reportes
│   ├── App.jsx                   # Enrutamiento React Router
│   ├── main.jsx                  # Punto de entrada
│   └── index.css                 # Estilos Tailwind
├── cypress/                       # Tests automatizados
│   ├── e2e/
│   │   ├── core/                 # Funcionalidades base
│   │   └── features/             # Features específicas
│   ├── fixtures/                 # Datos de prueba
│   ├── reports/                  # Reportes técnicos (fuente única)
│   ├── screenshots/              # Capturas de errores
│   └── support/                  # Comandos y configuración
├── docs/                         # GitHub Pages + app build
│   ├── assets/                   # Assets organizados
│   ├── reports/                  # Reportes web + JSON índice
│   └── index.html                # App React compilada
├── scripts/                      # Automatización avanzada
│   ├── api-server.js             # Servidor API para eliminación
│   ├── delete-report.js          # Eliminación desde terminal
│   ├── generate-reports-json.js  # Procesamiento JSON
│   └── sync-reports-to-docs.js   # Sincronización automática
├── public/                       # Assets estáticos desarrollo
│   └── reports/                  # Copia automática para dev
├── package.json                  # Dependencias y scripts
├── vite.config.js               # Configuración Vite
├── cypress.config.js            # Configuración Cypress
├── README.md                     # Esta documentación
└── STRUCTURE.md                  # Documentación técnica
```

## Comandos Disponibles

### Desarrollo y Build
| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia servidor de desarrollo (Vite) |
| `npm run build` | Compila aplicación para producción |
| `npm run preview` | Vista previa del build |

### Testing con Cypress
| Comando | Descripción |
|---------|-------------|
| `npm run test` | **PRINCIPAL**: Tests + reportes automáticos + limpieza |
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

### Sistema de Testing Cypress
- **Cypress**: 15.3.0 con configuración multi-reporter
- **Reportes**: Mochawesome con organización automática
- **Screenshots**: Capturas automáticas en fallos

### API Backend Express
- **Framework**: Express.js con CORS
- **Endpoints**: RESTful para operaciones de reportes
- **Puerto**: 3001 (configurable)
- **Funciones**: Eliminación, health check, consulta de reportes

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
**Versión:** 3.0.0
**Novedades:** API Server, eliminación web, desplegables, paginación, limpieza automática