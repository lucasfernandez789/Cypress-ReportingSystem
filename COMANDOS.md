# 📋 Comandos npm - Guía Rápida

## 🚀 Inicio Rápido

```bash
# Desarrollo
npm start              # Servidor de desarrollo
npm run build          # Compilar para producción
npm run lint           # Verificar código

# Testing
npm run test           # Tests completos + reportes automáticos
npm run test:core      # Solo tests Core
npm run test:features  # Solo tests Features
npm run cypress:open   # Cypress interactivo

# API y eliminación
npm run api-server     # Servidor para eliminación web
```

## 📋 Comandos por Categoría

### Desarrollo
| Comando | Descripción | Cuándo usar |
|---------|-------------|-------------|
| `npm start` | Servidor desarrollo con hot reload | Desarrollo diario |
| `npm run build` | Compilar para producción | Antes de desplegar |
| `npm run lint` | Verificar código con ESLint | Antes de commits |
| `npm run lint:fix` | Corregir código automáticamente | Después de lint |

### Testing
| Comando | Descripción | Categoría |
|---------|-------------|-----------|
| `npm run test` | **PRINCIPAL** - Tests completos + reportes | Mixed |
| `npm run test:core` | Solo funcionalidades base | Core |
| `npm run test:features` | Solo features específicas | Features |
| `npm run cypress:open` | Interfaz gráfica Cypress | Desarrollo |
| `npm run cypress:run` | Tests básicos headless | CI/CD simple |

### Gestión de Reportes
| Comando | Descripción | Uso |
|---------|-------------|-----|
| `npm run api-server` | Servidor API para eliminación web | Desarrollo completo |
| `npm run clean-reports` | Limpiar archivos JSON | Mantenimiento |
| `npm run delete-report` | Eliminar reporte específico | Terminal |

## 🎯 Flujo de Trabajo Recomendado

### Desarrollo Diario
```bash
npm start                    # Iniciar desarrollo
npm run cypress:open         # Escribir/debug tests
npm run lint                 # Verificar código
```

### Testing por Categorías
```bash
npm run test:core           # Funcionalidades base
npm run test:features       # Features específicas
npm run test                # Testing completo
```

### Eliminación de Reportes
```bash
# Terminal 1
npm start

# Terminal 2
npm run api-server

# Ahora eliminar desde web
```

## 🔧 Solución de Problemas

### Tests fallan
```bash
npm run clean-reports
npm run test
```

### API no funciona
```bash
npm run api-server
# Verificar http://localhost:3001/api/health
```

### Código con errores
```bash
npm run lint:fix
```

## 📖 Referencias

- **README.md**: Información general del proyecto
- **STRUCTURE.md**: Arquitectura técnica

---

**Versión:** 4.2 | **Actualizado:** Octubre 2025