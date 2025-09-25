# Cypress Reportes - Sin CI/CD

## Flujo de Trabajo con GitHub

### Paso 1: Ejecutar Pruebas
```bash
# Generar reportes con timestamp
npm run test:timestamped
```

### Paso 2: Preparar Reportes para GitHub
```bash
# Copiar reportes a docs/ para GitHub Pages
npm run report:publish-github
```

### Paso 3: Subir a GitHub
```bash
# Hacer commit de los reportes
git add docs/reports/
git commit -m "Add Cypress test reports - $(date +%Y-%m-%d)"

# Subir a GitHub
git push origin main
```

### Paso 4: Ver Reportes Online
- **URL:** `https://tu-usuario.github.io/tu-repo/reports/`
- **Indice:** `https://tu-usuario.github.io/tu-repo/reports/index.html`
- **Por fecha:** `https://tu-usuario.github.io/tu-repo/reports/2025-09-25/`

## Estructura en GitHub

```
tu-repo/
├── docs/
│   └── reports/           # Reportes publicados
│       ├── index.html     # Indice principal
│       └── 2025-09-25/    # Reportes por fecha
│           ├── report-2025-09-25T10-30-15.html
│           └── assets/
├── cypress/
│   └── reports/           # Reportes locales (no subir)
└── .gitignore            # Excluir cypress/reports/
```

## Configuracion Inicial

### 1. Habilitar GitHub Pages
1. Ir a **Settings** → **Pages**
2. **Source:** "Deploy from a branch"
3. **Branch:** `main` + `/docs` folder

### 2. Configurar .gitignore
```gitignore
# Cypress reports locales (no subir)
cypress/reports/
cypress/screenshots/
cypress/videos/

# Pero SI subir docs/reports/
!docs/reports/
```

### 3. Crear docs/.nojekyll (Opcional)
```bash
# Para evitar problemas con archivos que empiezan con _
touch docs/.nojekyll
```

## Flujo Diario

### Manana - Planificacion
- Revisar GitHub Projects
- Asignar tareas de testing

### Durante el Dia - Desarrollo
```bash
# Despues de cada cambio importante
npm run test:timestamped    # Ejecutar pruebas
npm run report:publish-github  # Preparar para publicar
```

### Fin del Dia - Reporte
```bash
# Subir reportes del dia
git add docs/reports/
git commit -m "Daily test reports - $(date +%Y-%m-%d)"
git push origin main

# Actualizar GitHub Project
# - Marcar issues como completadas
# - Agregar enlaces a reportes
```

## Integracion con GitHub Projects

### Usar Issues para Tracking
- **Bug encontrado:** Crear issue con enlace al reporte
- **Test completado:** Referencia al reporte en la descripcion
- **Metricas:** Actualizar project board con resultados

### Labels Recomendadas
- `testing` - Issues relacionadas con pruebas
- `automated-test` - Tests automatizados
- `test-report` - Enlaces a reportes
- `qa-approved` - Tests aprobados

### Project Board Columns
```
Backlog    In Progress    Done    Reported
Bug 1      Test Feature X Bug Fixed Report: link
           Write Tests   Tests Pass
```

## Compartir Resultados

### Con el Equipo
- **Enlaces directos** en issues/PRs
- **Menciones** en comentarios: `@team Ver reportes: [link]`
- **Resumenes** en stand-ups

### Con Stakeholders
- **URL publica** de GitHub Pages
- **Enlaces** en correos de actualizacion
- **Acceso movil** a reportes

## Scripts Disponibles

```bash
# Ejecutar pruebas con reportes
npm run test:timestamped

# Ver historial local
npm run report:history

# Preparar reportes para GitHub
npm run report:publish-github

# Limpiar archivos temporales
npm run clean-reports
```

## Beneficios de Esta Estrategia

- **Reportes accesibles** desde cualquier lugar
- **Historial completo** en Git
- **Integracion natural** con GitHub Projects
- **Sin costo** (usa GitHub Pages gratis)
- **Colaborativo** - todo el equipo puede ver reportes
- **Versionado** - reportes ligados a commits

## Consideraciones

- **Limite GitHub:** 1GB por repo (reportes son livianos)
- **Actualizacion:** Reportes se actualizan al hacer push
- **Permisos:** Asegurar que el equipo tenga acceso al repo
- **Rendimiento:** GitHub Pages puede tener delay en updates
