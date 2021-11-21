/* eslint-disable no-undef */

const imageLink =
  "https://www.oficinadanet.com.br/imagens/post/24347/330xNxfundo-transparente.jpg.pagespeed.ic.c7297c4891.jpg";

Cypress.Commands.add("setupDb", () => {
  cy.request("http://localhost:4000/setup-test-db");
});

Cypress.Commands.add("signin", () => {
  cy.visit("http://localhost:3000/login");

  cy.get("input[id=email]").type("admin@admin.com");
  cy.get("input[id=password").type("Admin@123");

  cy.get("button[type=submit]").click();
});

Cypress.Commands.add("signup", () => {
  cy.visit("http://localhost:3000/signup");

  cy.get("input[id=name]").type("Carlin Vrau");
  cy.get("input[id=email]").type("admin@admin.com");
  cy.get("input[id=password").type("Admin@123");
  cy.get('input[id="confirmPassword"').type("Admin@123");

  cy.get("button[type=submit]").click();
});
