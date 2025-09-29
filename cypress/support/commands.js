import { inputUsername, inputPassword, botonIngreso } from '../support/selectors';

Cypress.Commands.add('login', () => {
  // Usar variables de entorno en lugar de fixtures para mayor seguridad
  const username = Cypress.env('USER');
  const password = Cypress.env('PASS');

  cy.get(inputUsername).type(username);
  cy.get(inputPassword).type(password);
  cy.get(botonIngreso).click();
});

//aca usa el .env para poner el usuario