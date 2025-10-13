import "../../support/commands";
import { botonMenuHamburguesa } from "../../support/selectors";
import { leyesPrivado } from "../../support/selectors";

describe("Nueva Ley Features", () => {
  beforeEach(() => {
    cy.visit(leyesPrivado);
    cy.login();
  });

  it("Deberia crear una nueva ley", () => {
    //esta es la creacion de una nueva ley pero en features
  });
});
  