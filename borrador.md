# Borrador: Sistema de Reportes Multi-Fork

## Contexto
- Repo de organización con limitaciones de minutos de deploy
- Sistema de baja prioridad vs sistemas de gestión existentes
- Uso limitado: solo el owner y quizás otros devs
- No queremos entorpecer recursos de CI/CD

## Problema Original
- Template actual incluye frontend completo en cada fork
- Duplica código innecesariamente
- Cada fork deploya su propio frontend (consume minutos)

## Arquitectura Deseada
- **Frontend centralizado**: Un solo frontend para todos los forks
- **Forks ligeros**: Solo Cypress + configuración apuntando al frontend central
- **Reportes publicados**: Cada fork deploya solo reportes (no frontend)

## Ideas Planteadas

### Opción 1: Repo Central de Reportes
- Crear repo `cypress-reports-central`
- Cada fork publica reportes al repo central vía GitHub Actions
- Frontend central lee del repo central
- **Pros**: Un solo lugar, fácil mantenimiento
- **Cons**: Requiere repo adicional, configuración de Actions en cada fork

### Opción 2: Frontend Multi-Fuente
- Frontend central configura `VITE_REPORTS_SOURCES=url1,url2,url3`
- Lee reportes directamente de GitHub Pages de cada fork
- **Pros**: Sin repo central, cada fork independiente
- **Cons**: Configuración manual de URLs, dependencias entre forks

### Opción 3: Híbrida con Fallback
- En desarrollo: lee local
- En producción: lee de URLs configuradas
- Fallback si URLs fallan

## Dudas y Consideraciones

### Deploy y Recursos
- **¿Cuántos minutos consume cada deploy?**
- **¿Cuántos forks simultáneos esperamos?**
- **¿Frecuencia de deploys?** (diaria, semanal, etc.)

### Mantenimiento
- **¿Quién mantiene el frontend central?**
- **¿Cómo se actualiza la configuración de fuentes?**
- **¿Qué pasa si un fork se elimina?**

### Uso Real
- **¿Necesitamos filtrado por sistema realmente?**
- **¿Basta con un frontend simple sin dropdown?**
- **¿Podemos usar GitHub Projects o similar en lugar de frontend?**

## Soluciones Posibles

### Mínima Viable (Actual)
- Mantener frontend en cada fork (como está ahora)
- Configurar `APP_NAME` diferente por fork
- Dropdown solo muestra el sistema local
- **Pros**: Simple, funciona ya
- **Cons**: Duplica frontend, consume minutos por fork

### Centralizada Simple
- Un fork "principal" mantiene el frontend
- Otros forks configuran `VITE_REPORTS_BASE_URL` apuntando al principal
- Frontend principal lee de múltiples fuentes
- **Pros**: Un solo frontend deployado
- **Cons**: Dependencia del fork principal

### Sin Deploy de Frontend
- Usar reportes HTML directos (ya generados por Cypress)
- O dashboard simple con GitHub Actions + webhooks
- O GitHub Projects para tracking visual
- **Pros**: Sin deploy de frontend, mínimo mantenimiento
- **Cons**: Menos funcionalidad, UX básica

### Híbrida Optimizada
- Frontend central liviano (solo reportes, sin build pesado)
- Forks publican solo JSON de reportes (no HTML completo)
- Deploy ultra-rápido del frontend central
- **Pros**: Mínimo consumo de minutos
- **Cons**: Requiere cambios en generación de reportes

## Recomendación Final
Dada las limitaciones de recursos y bajo uso, mantener la **Opción Mínima Viable** por ahora:
- Cada fork independiente con su frontend
- `APP_NAME` diferente por fork
- Aceptar el consumo de minutos (bajo uso justifica el costo)

Si el consumo se vuelve problemático, migrar a **Sin Deploy de Frontend** usando los reportes HTML nativos de Cypress.</content>
<parameter name="filePath">c:\Users\ljfernandez\Desktop\Cypress-Leyes\borrador.md