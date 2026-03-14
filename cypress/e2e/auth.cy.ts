describe("Authentication", () => {
  it("customer login page loads", () => {
    cy.visit("/customer/login");
    cy.contains(/Espace client/i).should("be.visible");
    cy.findByLabelText(/Email/i).should("be.visible");
    cy.findByLabelText(/Mot de passe/i).should("be.visible");
    cy.findByRole("button", { name: /Se connecter/i }).should("be.visible");
  });

  it("customer register page loads", () => {
    cy.visit("/customer/register");
    cy.contains(/Créer un compte/i).should("be.visible");
    cy.findByLabelText(/Nom complet/i).should("be.visible");
  });

  it("admin login page loads", () => {
    cy.visit("/admin/login");
    cy.contains(/Connexion Admin/i).should("be.visible");
    cy.findByLabelText(/Email/i).should("be.visible");
  });

  it("admin login with demo credentials succeeds and redirects to dashboard", function () {
    if (!Cypress.env("E2E_API_AVAILABLE")) {
      this.skip();
    }

    cy.visit("/admin/login");
    cy.findByLabelText(/Email/i).type("admin@baccouche-motors.com");
    cy.findByLabelText(/Mot de passe/i).type("Admin123!");
    cy.findByRole("button", { name: /Se connecter/i }).click();

    cy.url().should("match", /\/admin\/dashboard/, { timeout: 10000 });
  });

  it("forgot password page loads", () => {
    cy.visit("/customer/forgot-password");
    cy.url().should("include", "/customer/forgot-password");
    cy.contains(/Mot de passe oublié/i).should("be.visible");
    cy.findByLabelText(/Email/i).should("be.visible");
    cy.findByRole("button", { name: /Envoyer le lien/i }).should("be.visible");
  });

  it("customer registration succeeds with API", function () {
    if (!Cypress.env("E2E_API_AVAILABLE")) {
      this.skip();
    }

    cy.visit("/customer/register");
    const email = `test-${Date.now()}@example.com`;
    cy.findByLabelText(/Nom complet/i).type("Test User");
    cy.findByLabelText(/Email/i).type(email);
    cy.findByLabelText(/Mot de passe/i).first().type("TestPassword123!");
    cy.findByLabelText(/Confirmer le mot de passe/i).type("TestPassword123!");
    cy.findByRole("button", { name: /S'inscrire/i }).click();

    cy.url().should("match", /\/customer\/dashboard/, { timeout: 10000 });
  });
});
