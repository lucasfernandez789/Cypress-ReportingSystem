# Cypress Testing & Reporting System

> Sistema profesional de testing automatizado con Cypress y reportes organizados para el proyecto de Leyes.

## Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar tests con reportes timestamped
npm run test:timestamped

# Sincronizar reportes para GitHub Pages
npm run docs:sync

# Abrir Cypress en modo interactivo
npm run cypress:open
```

## Estructura del Proyecto

```
cypress/
├── e2e/
│   ├── core/                    # Funcionalidades base del sistema
│   └── features/               # Cards específicas para automatizar
├── fixtures/                   # Datos de prueba
├── reports/                    # Reportes técnicos (fuente única)
├── screenshots/                # Capturas de errores
└── support/                    # Comandos y configuraciones

docs/                           # GitHub Pages
├── assets/                     # CSS, JS, imágenes organizados
├── reports/                    # Índice que apunta a cypress/reports
└── index.html                  # Página principal

scripts/                        # Utilitarios
└── sync-reports-to-docs.js     # Sincronización de reportes
```

## Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Credenciales para testing
USER=tu_usuario_real
PASS=tu_password_real

# URL base de la aplicación
CYPRESS_BASE_URL=https://testing.hlt.gob:3007
```

> **Seguridad:** El archivo `.env` está en `.gitignore` para evitar subir credenciales al repositorio.

### 2. GitHub Pages (Opcional)

Para publicar reportes online:

1. Ir a **Settings** → **Pages** en GitHub
2. Seleccionar **Deploy from branch**
3. Elegir **main** y carpeta **docs/**
4. Los reportes estarán disponibles en: `https://tu-usuario.github.io/tu-repo/`

## Comandos de Testing

### Ejecución de Pruebas

| Comando | Descripción |
|---------|-------------|
| `npm run test:timestamped` | Ejecuta tests y genera reportes con timestamp |
| `npm run test` | Pruebas básicas con reporte automático |
| `npm run cypress:open` | Abre Cypress en modo interactivo |
| `npm run cypress:run` | Ejecuta tests en modo headless |

### Gestión de Reportes

| Comando | Descripción |
|---------|-------------|
| `npm run report:index` | Genera índice en cypress/reports/ |
| `npm run report:sync-docs` | Sincroniza reportes a docs/ |
| `npm run docs:sync` | Genera índice + sincroniza (recomendado) |
| `npm run report:history` | Ver historial de reportes locales |
| `npm run clean-reports` | Limpiar archivos temporales |

## Sistema de Reportes

### Principio: Fuente Única de Verdad

- **`cypress/reports/`** = Fuente única donde Cypress genera reportes
- **`docs/reports/`** = Solo índice/navegador que apunta a cypress/reports

### Flujo de Trabajo

```bash
# 1. Ejecutar tests
npm run test:timestamped

# 2. Sincronizar para GitHub Pages
npm run docs:sync

# 3. Subir cambios (opcional)
git add docs/
git commit -m "Update test reports - $(date +%Y-%m-%d)"
git push
```

### Organización de Reportes

Los reportes se organizan automáticamente por fecha:

```
cypress/reports/
├── index.html              # Índice principal
├── 2025-09-29/
│   ├── report-2025-09-29T10-30-15.html
│   └── assets/
└── 2025-09-30/
    ├── report-2025-09-30T09-45-22.html
    └── assets/
```

## Organización de Tests

### `cypress/e2e/core/`
Funcionalidades base y estables del sistema:
- Tests de login
- Funcionalidades principales
- Flujos críticos del sistema

### `cypress/e2e/features/`
Cases específicos y nuevos desarrollos:
- Cards de desarrollo específicas
- Features en desarrollo
- Tests de regresión específicos

### Ejemplo de Uso

```javascript
// En cypress/support/commands.js
Cypress.Commands.add('login', () => {
  const username = Cypress.env('USER');
  const password = Cypress.env('PASS');
  
  cy.get('[data-cy=username]').type(username);
  cy.get('[data-cy=password]').type(password);
  cy.get('[data-cy=login-btn]').click();
});

// En cypress/e2e/core/auth.cy.js
describe('Authentication Core', () => {
  it('should login successfully', () => {
    cy.login();
    cy.url().should('include', '/dashboard');
  });
});
```

## Scripts Personalizados

### `scripts/sync-reports-to-docs.js`
Sincroniza reportes desde `cypress/reports/` hacia `docs/reports/`, manteniendo enlaces en lugar de duplicar archivos.

### `generate-report-index.js`
Genera el índice HTML en `cypress/reports/` que lista todos los reportes disponibles organizados por fecha.

## Mejores Prácticas Aplicadas

- [x] **Separación de concerns**: cypress/ vs docs/
- [x] **Fuente única de verdad**: sin duplicación de reportes
- [x] **Assets organizados**: estructura estándar de carpetas  
- [x] **Automatización**: scripts para sincronización
- [x] **Seguridad**: variables de entorno para credenciales
- [x] **GitHub Pages ready**: estructura optimizada
- [x] **Organización de tests**: core/ vs features/

## Troubleshooting

### Tests Fallan por Credenciales
```bash
# Verificar que las variables de entorno están cargadas
echo $USER $PASS  # Linux/Mac
echo $env:USER $env:PASS  # Windows PowerShell
```

### Reportes No Se Generan
```bash
# Limpiar archivos temporales y regenerar
npm run clean-reports
npm run test:timestamped
```

### GitHub Pages No Muestra Reportes
```bash
# Verificar que la sincronización se ejecutó
npm run docs:sync

# Verificar que los archivos están en docs/
ls -la docs/reports/
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature/core (`git checkout -b feature/nueva-funcionalidad`)
3. Añade tests en `cypress/e2e/features/` para nuevas funcionalidades
4. Ejecuta `npm run test:timestamped` para verificar que todo pasa
5. Commit tus cambios (`git commit -m 'Add nueva funcionalidad'`)
6. Push a la rama (`git push origin feature/nueva-funcionalidad`)
7. Abre un Pull Request

---

## Documentación Adicional

- **Estructura detallada**: Ver [STRUCTURE.md](./STRUCTURE.md) para más detalles sobre la organización
- **Configuración de Cypress**: Ver [cypress.config.js](./cypress.config.js)
- **Configuración de reportes**: Ver [reporter-config.json](./reporter-config.json)

---

**Última actualización:** Septiembre 2025  
**Versión:** 1.0.0