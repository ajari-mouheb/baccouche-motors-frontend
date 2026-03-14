Cypress.Commands.add("loginAsAdmin", () => {
  cy.visit("/admin/login");
  cy.findByLabelText(/Email/i).type("admin@baccouche-motors.com");
  cy.findByLabelText(/Mot de passe/i).type("Admin123!");
  cy.findByRole("button", { name: /Se connecter/i }).click();
  cy.url().should("match", /\/admin\/dashboard/);
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginAsAdmin(): Chainable<void>;
    }
  }
}
