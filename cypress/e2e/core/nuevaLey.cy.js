import "../../support/commands";
import { botonMenuHamburguesa } from "../../support/selectors";
import { leyesPrivado } from "../../support/selectors";

describe("Nueva Ley", () => {
  beforeEach(() => {
    cy.visit(leyesPrivado);
    cy.login();
  });

  it("Deberia crear una nueva ley", () => {
    //Creacion de una nueva ley
    cy.get(botonMenuHamburguesa).should('exist').and('be.visible').click();
    // Esperar a que el menú esté completamente abierto
    cy.contains('Nueva Ley').should('be.visible').click();
    cy.get('#idLey').should('exist').and('be.visible').type('12345');
    
  });
  /*it("Deberia editar una ley existente", () => {
    //Edicion de una ley existente  
  });
  it("Deberia eliminar una ley existente", () => {
    //Eliminacion de una ley existente
  });*/
});
