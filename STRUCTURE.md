# Estructura del Proyecto - Documentación Técnica Detallada

> Esta es la documentación técnica detallada de la estructura. Para inicio rápido, ver [README.md](./README.md)

## Análisis Detallado de la Organización

### `cypress/`
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

### `docs/`
Documentación pública organizada para GitHub Pages:

```
docs/
├── assets/                     # Assets organizados
│   ├── css/                    # Estilos
│   ├── js/                     # Scripts
│   └── images/                 # Imágenes y logos
├── reports/                    # Solo índice que apunta a cypress/reports
│   └── index.html              # Navegador de reportes para docs
└── index.html                  # Página principal
```

### `scripts/`
Scripts utilitarios para automatización:

```
scripts/
└── sync-reports-to-docs.js     # Sincroniza reportes para GitHub Pages
```

## Flujo de Reportes

### Principio: Fuente Única de Verdad
- **`cypress/reports/`** = Fuente única donde Cypress genera reportes
- **`docs/reports/`** = Solo índice/navegador que apunta a cypress/reports

### Scripts Disponibles

| Script | Propósito | Cuándo Usarlo |
|--------|-----------|---------------|
| `npm run test:timestamped` | Ejecuta tests y genera reportes con timestamp | Testing diario |
| `npm run report:index` | Genera índice en cypress/reports/ | Después de ejecutar tests |
| `npm run report:sync-docs` | Sincroniza reportes para docs/ | Para GitHub Pages |
| `npm run docs:sync` | Ejecuta ambos: index + sync | Flujo completo recomendado |

> **Tip:** Para uso diario, solo necesitas `npm run test:timestamped` seguido de `npm run docs:sync`

## Beneficios de esta Organización

### 1. **Separación Clara de Responsabilidades**
- `core/` = Funcionalidades base estables
- `features/` = Casos específicos y nuevos desarrollos
- `cypress/reports/` = Reportes técnicos
- `docs/reports/` = Presentación pública

### 2. **Sin Duplicación**
- Los archivos HTML de reportes solo existen en `cypress/reports/`
- `docs/reports/` solo contiene enlaces, no archivos duplicados

### 3. **GitHub Pages Ready**
- `docs/` está optimizado para GitHub Pages
- Assets organizados en subcarpetas
- Rutas relativas correctas

### 4. **Escalabilidad**
- Fácil añadir nuevos tests en `features/`
- Reportes históricos organizados por fecha
- Scripts reutilizables

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



### Estructura Actual 
```
docs/
├── assets/              # ✅ Assets organizados
│   ├── css/
│   ├── js/
│   └── images/
└── reports/             # ✅ Solo índice/navegador
    └── index.html       # ✅ Enlaces, no duplicación

# Documentación consolidada
├── README.md            # ✅ Punto de entrada único
└── STRUCTURE.md         # ✅ Detalles técnicos
```

## Escalabilidad y Mantenimiento

### Para Nuevos Tests
```bash

# 1. Crear archivo en la carpeta apropiada
cypress/e2e/core/nueva-funcionalidad.cy.js      # Para funcionalidades base
cypress/e2e/features/nueva-card.cy.js           # Para cards específicas

# 2. Ejecutar para generar reportes
npm run test:timestamped

# 3. Sincronizar para docs (opcional)
npm run docs:sync
```

### Para Nuevos Assets en docs/
```bash
# Seguir la estructura organizada
docs/assets/css/nuevo-estilo.css
docs/assets/js/nuevo-script.js
docs/assets/images/nueva-imagen.png
```

### Para Nuevos Scripts
```bash
# Añadir en scripts/ y registrar en package.json
scripts/nueva-utilidad.js
```