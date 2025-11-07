# Arquitectura Desacoplada - Cypress Reporting System

##  Visión General

Este proyecto implementa una **arquitectura desacoplada** que separa el frontend del sistema de generación de reportes, permitiendo que cada fork se enfoque únicamente en sus tests mientras reutiliza un frontend común.

##  Arquitectura

### Componentes Separados

1. **Frontend (este repo)**: Interfaz de usuario React que consume reportes dinámicamente
2. **Sistema de Reportes**: Scripts y configuración de Cypress para generar reportes
3. **Almacenamiento de Reportes**: GitHub Pages u otro servicio que aloja los reportes JSON/HTML

### Flujo de Datos

```
Tests Cypress → Generación de Reportes → Publicación → Frontend → Usuario
     ↓              ↓                      ↓            ↓
  cypress/      scripts/               GitHub       src/
  e2e/          generate-*.js           Pages        components/
```

##  Configuración

### Sistema CLI Unificado

El proyecto incluye un sistema CLI unificado para facilitar la configuración y gestión:

```bash
# Configurar entorno completo
npm run setup

# Configurar componentes específicos
npm run setup -- --env prod
npm run setup -- --components reports,frontend
```

### Variables de Entorno

Cada fork puede configurar su propia fuente de reportes mediante variables de entorno:

```bash
# .env
VITE_REPORTS_BASE_URL=https://tu-usuario.github.io/tu-repo
VITE_REPORTS_REPO_OWNER=tu-usuario
VITE_REPORTS_REPO_NAME=tu-repo
```

### Módulos de Utilidades

El sistema incluye módulos de utilidades comunes para operaciones de archivos y sistema:

- `scripts/utils.js`: Funciones comunes para manejo de archivos, paths y comandos del sistema
- Procesamiento de carpetas temporales para reportes
- Sincronización automática entre carpetas de reportes

### Configuración por Defecto

Si no se configuran las variables, el sistema usa rutas locales para desarrollo:

- **Desarrollo**: `http://localhost:5173/reports/`
- **Producción**: `/Cypress-ReportingSystem/reports/` (GitHub Pages)

##  Para Forks

### 1. Configuración Básica

```bash
# Clonar el template
git clone https://github.com/lucasfernandez789/cypress-reporting-template.git mi-proyecto

# Instalar dependencias
npm install

# Configurar entorno con CLI unificado
npm run setup

# Configurar variables de entorno específicas
cp .env.example .env
# Editar .env con tus URLs de reportes
```

### 2. Desarrollo de Tests

```bash
# Agregar tus tests en cypress/e2e/
# Los scripts existentes generarán reportes automáticamente

# Ejecutar tests
npm run test
npm run test:core
npm run test:features
```

### 3. Publicación de Reportes

```bash
# Los scripts post-test publican automáticamente a docs/
# El sistema procesa carpetas temporales y sincroniza reportes
# Configurar GitHub Pages para servir desde docs/
```

### 4. Configurar Frontend

Si quieres usar un frontend separado:

```bash
# Configurar VITE_REPORTS_BASE_URL apuntando a tus reportes publicados
VITE_REPORTS_BASE_URL=https://tu-usuario.github.io/mi-proyecto
```

##  Estructura del Template

```
cypress-reporting-template/
├── cypress/                 # Tests de Cypress
│   ├── e2e/                # Especificaciones de tests
│   ├── fixtures/           # Datos de prueba
│   ├── reports/            # Reportes generados
│   └── support/            # Comandos y utilidades de Cypress
├── scripts/                 # Scripts de automatización
│   ├── setup.js            # CLI unificado para configuración
│   ├── utils.js            # Utilidades comunes
│   ├── generate-report-index.js    # Generación de índices
│   └── sync-reports-to-docs.js     # Sincronización de reportes
├── docs/                    # Build output para GitHub Pages
├── public/                  # Assets estáticos
├── .env                     # Configuración de entorno
├── .env.example            # Ejemplo de configuración
├── cypress.config.js       # Configuración de Cypress
├── package.json            # Dependencias y scripts
└── README.md               # Documentación del proyecto
```

##  Beneficios

### Para Forks
- Enfoque en tests: Solo mantener logica de negocio
- Frontend actualizable: Actualizaciones del UI sin conflictos
- Configuracion simple: Variables de entorno para personalizacion
- Reutilizacion: Frontend comun reduce duplicacion

### Para el Proyecto Base
- Mantenibilidad: Separacion clara de responsabilidades
- Escalabilidad: Frontend puede servir multiples repositorios
- Flexibilidad: Diferentes estrategias de almacenamiento de reportes

##  Desarrollo Avanzado

### Sistema de Reportes Mejorado

El sistema incluye procesamiento avanzado de reportes:

- **Carpetas Temporales**: Procesamiento automático de reportes en carpetas temporales
- **Sincronización**: Sincronización automática entre `cypress/reports/` y `docs/reports/`
- **Generación de Índices**: Creación automática de índices HTML para navegación
- **Limpieza**: Eliminación automática de archivos temporales y obsoletos
- **Filtrado Multi-Sistema**: Sistema inteligente que discrimina reportes por APP_NAME
  - Carpetas `YYYY-MM-DD_APP_NAME` para sistemas específicos
  - Carpetas `YYYY-MM-DD` para "Sistema por Defecto"
  - Interfaz con selector visual para filtrar por sistema/fork

### Frontend Independiente

Para crear un frontend completamente separado:

1. Extraer `src/`, `public/`, `vite.config.mjs`, etc.
2. Crear repo separado `cypress-reporting-frontend`
3. Configurar como módulo npm o subrepo

### Estrategias de Almacenamiento

- **GitHub Pages**: Simple, gratuito, integrado con Git
- **AWS S3**: Escalable, configurable
- **Vercel/Netlify**: Deploy automático con previews
- **API Backend**: Para reportes con autenticación

##  Referencias

- [Documentación de Cypress](https://docs.cypress.io/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [GitHub Pages Deployment](https://docs.github.com/en/pages)