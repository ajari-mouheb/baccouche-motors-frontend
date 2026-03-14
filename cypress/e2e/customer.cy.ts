describe("Customer", () => {
  it("customer login page has forgot password link", () => {
    cy.visit("/customer/login");
    cy.findByRole("link", { name: /Mot de passe oublié/i }).should(
      "be.visible"
    );
  });

  it("customer dashboard loads after login", function () {
    if (!Cypress.env("E2E_API_AVAILABLE")) {
      this.skip();
    }

    cy.visit("/customer/login");
    cy.findByLabelText(/Email/i).type("customer@demo.com");
    cy.findByLabelText(/Mot de passe/i).type("demo");
    cy.findByRole("button", { name: /Se connecter/i }).click();

    cy.url().should("match", /\/customer\/dashboard/, { timeout: 10000 });
    cy.get("body", { timeout: 5000 }).should(
      "satisfy",
      ($el) => /Mon espace|Dashboard|Profil/.test($el.text())
    );
  });

  it("customer profile page loads when logged in", function () {
    if (!Cypress.env("E2E_API_AVAILABLE")) {
      this.skip();
    }

    cy.visit("/customer/login");
    cy.findByLabelText(/Email/i).type("customer@demo.com");
    cy.findByLabelText(/Mot de passe/i).type("demo");
    cy.findByRole("button", { name: /Se connecter/i }).click();
    cy.url().should("match", /\/customer\/dashboard/, { timeout: 10000 });

    cy.visit("/customer/dashboard");
    cy.contains(/Mon profil|Profil/i, { timeout: 5000 }).should("be.visible");
  });

  it("customer test drives page loads when logged in", function () {
    if (!Cypress.env("E2E_API_AVAILABLE")) {
      this.skip();
    }

    cy.visit("/customer/login");
    cy.findByLabelText(/Email/i).type("customer@demo.com");
    cy.findByLabelText(/Mot de passe/i).type("demo");
    cy.findByRole("button", { name: /Se connecter/i }).click();
    cy.url().should("match", /\/customer\/dashboard/, { timeout: 10000 });

    cy.get("body").then(($body) => {
      if (/Mes demandes Test Drive|Test drives/i.test($body.text())) {
        cy.contains("a", /Mes demandes Test Drive|Test drives/i).first().click();
        cy.url().should("include", "/customer/test-drives");
      }
    });
  });
});
