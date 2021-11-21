/* eslint-disable no-undef */
/// <reference types="cypress" />

beforeEach(() => {
  cy.setupDb();
});

describe("Login", () => {
  it("should login successfully", () => {
    cy.signup();
    cy.wait(2000);
    cy.visit("http://localhost:3000/login");

    cy.get("input[id=email]").type("admin@admin.com");
    cy.get("input[id=password").type("Admin@123");
    cy.get("button[type=submit]").click();

    cy.url().should("equal", "http://localhost:3000/plans");
  });
});
