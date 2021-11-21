/* eslint-disable no-undef */
/// <reference types="cypress" />

beforeEach(() => {
  cy.setupDb();
});

describe("Sign up", () => {
  it("should signup successfully", () => {
    cy.signup();
    cy.url().should("equal", "http://localhost:3000/login");
  });
});
