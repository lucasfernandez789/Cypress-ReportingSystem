# Todo List - Sistema Cypress Reporting

## Completadas
- [x] Sistema completamente configurable - Sin valores hardcodeados
  - Eliminar rutas hardcodeadas en scripts
  - Reemplazar alias hardcodeado en Vite
  - Sistema robusto de variables de entorno
- [x] Variables de entorno configurables
  - REPORTS_DIR para ubicacion centralizada
  - APP_NAME para identificador unico
  - CYPRESS_BASE_URL configurable
  - VITE_REPORTS_* para configuracion de forks
- [x] Scripts npm robustos y sin errores
- [x] Categorizacion automatica de reportes
- [x] Sincronizacion automatica desarrollo  produccion
- [x] Documentacion completa en README

## Proximas Etapas Disponibles

### 1. Watchers para Sincronizacion Automatica
- [ ] Detectar cambios en reportes automaticamente
- [ ] Sincronizacion en tiempo real sin comandos manuales
- [ ] Mejor experiencia de desarrollo

### 2. Sistema de Carga Dinamica de Reportes
- [ ] Cambiar de imports estaticos a fetch dinamico
- [ ] Deshabilitar polling agresivo
- [ ] Implementar carga manual con boton refresh

### 3. Template Cypress Optimizado
- [ ] Crear version template sin frontend
- [ ] Solo Cypress + scripts de reportes
- [ ] Configuracion apuntando a frontend externo

## Objetivos del Sistema
- [x] Sistema centralizado de reportes con directorio compartido
- [x] Filtrado automatico por sistema/fork usando APP_NAME
- [x] Sincronizacion automatica de reportes
- [x] Frontend dinamico que detecta nuevos sistemas automaticamente
- [x] Template Cypress optimizado sin frontend
- [x] Configuracion simplificada para forks

## Estructura Final Esperada
```
cypress/reports/                    # Directorio centralizado
 2025-11-10/                     # Sistema por defecto
 2025-11-10_Sistema1/            # Fork 1
 2025-11-10_Sistema2/            # Fork 2
 report.json                     # Metadata de todos los reportes

cypress-template/                   # Template para nuevos forks
 cypress/
 scripts/
 .env
 package.json (solo Cypress)
```
