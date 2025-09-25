import { inputUsername, inputPassword, botonIngreso } from '../support/selectors';

Cypress.Commands.add('login', () => {
  cy.fixture('../fixtures/usuario.json').then((data) => {
    cy.get(inputUsername).type(data.usuario.user);
    cy.get(inputPassword).type(data.usuario.pass);
    cy.get(botonIngreso).click(); 
  });
});
