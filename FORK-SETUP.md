# Guía de Configuración para Forks

Esta guía explica cómo configurar un nuevo fork del sistema Cypress para testing automatizado.

## Proceso de Configuración

### Paso 1: Preparar el proyecto
```bash
# Clonar tu fork
git clone https://github.com/TU-USUARIO/tu-repo.git
cd tu-repo

# Instalar dependencias
npm install

# Configuración automática
npm run setup
```

### Paso 2: Configurar variables de entorno
Edita el archivo `.env` con esta configuración esencial:

```env
# URL de la aplicación que vas a testear
CYPRESS_BASE_URL=http://tu-aplicacion.com

# Nombre único de tu sistema (cada fork debe tener uno diferente)
APP_NAME=MiSistemaUnico

# Carpeta centralizada donde se guardan todos los reportes
REPORTS_DIR=C:\Users\TU_USUARIO\Desktop\cypress\reports

# URL del frontend donde se ven los reportes
VITE_REPORTS_BASE_URL=https://tu-frontend.com

# Credenciales para tests (si son necesarias)
USER=usuario_test
PASS=password_test
```

### Paso 3: Crear y ejecutar tests
```bash
# Crear estructura básica de tests
npm run setup:tests

# Crear tus tests en cypress/e2e/core/ y cypress/e2e/features/

# Ejecutar tests
npm run test:core

# Ver reportes en el frontend
npm start
```

## Configuración por Sistema

Cada fork genera reportes en carpetas nombradas con el `APP_NAME`:

```
cypress/reports/
  2025-11-10/                    # Sistema por Defecto
  2025-11-10_MiSistemaUnico/     # Tu sistema
  2025-11-10_OtroSistema/        # Otro fork
```

El frontend detecta automáticamente todos los sistemas y permite filtrar por ellos.

## Verificación

Para verificar que todo funciona:
- Tests se ejecutan correctamente
- Reportes aparecen en la carpeta centralizada
- Frontend muestra los reportes de tu sistema
- Selector de sistemas incluye tu `APP_NAME`

## Solución de Problemas

- **Tests no se ejecutan**: Verificar `CYPRESS_BASE_URL`
- **Reportes no aparecen**: Verificar `REPORTS_DIR` y `APP_NAME`
- **Frontend no carga reportes**: Verificar `VITE_REPORTS_BASE_URL`
- **Sistema no aparece en filtro**: Verificar que `APP_NAME` sea único
