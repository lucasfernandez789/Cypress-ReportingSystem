# Configuración de Variables de Entorno

## Seguridad de Credenciales

**Nunca subas credenciales reales al repositorio.** Las credenciales se configuran localmente usando variables de entorno.

## Configuración Local

1. **Crea un archivo `.env` en la raíz del proyecto:**
   ```env
   # Credenciales para testing (cambiar por valores reales)
   USER=tu_usuario_real
   PASS=tu_password_real

   # URL base de la aplicación
   CYPRESS_BASE_URL=https://testing.hlt.gob:3007
   ```

2. **El archivo `.env` ya está en `.gitignore`** para evitar que se suba al repositorio.

## Uso en Tests

En lugar de usar fixtures con credenciales, usa variables de entorno:

```javascript
// En commands.js
Cypress.Commands.add('login', () => {
  const username = Cypress.env('USER');
  const password = Cypress.env('PASS');

  cy.get(inputUsername).type(username);
  cy.get(inputPassword).type(password);
  cy.get(botonIngreso).click();
});
```

## Configuración en CI/CD

En pipelines de CI/CD, configura las variables de entorno directamente en la plataforma (GitHub Actions, Jenkins, etc.) en lugar de usar archivo `.env`.

## Verificación

Para verificar que las variables están cargadas correctamente:
```javascript
it('should have environment variables', () => {
  expect(Cypress.env('USER')).to.not.be.undefined;
  expect(Cypress.env('PASS')).to.not.be.undefined;
});
```