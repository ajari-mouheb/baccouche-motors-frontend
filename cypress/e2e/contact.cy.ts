describe("Contact", () => {
  it("contact page displays form and info", () => {
    cy.visit("/contact");

    cy.findByRole("heading", { name: "CONTACT", exact: true }).should(
      "be.visible"
    );
    cy.contains(/Nos coordonnées/i).should("be.visible");
    cy.get("main").contains(/Route Ceinture Oued Arouk/i).should("be.visible");

    cy.findByLabelText(/Nom complet/i).should("be.visible");
    cy.findByLabelText(/Email/i).first().should("be.visible");
    cy.findByLabelText(/Sujet/i).should("be.visible");
    cy.findByLabelText(/Message/i).should("be.visible");
  });

  it("contact form shows validation on empty submit", () => {
    cy.visit("/contact");

    cy.findByRole("button", { name: /Envoyer/i }).click();

    cy.contains(/Le nom doit contenir au moins 2 caractères/i, {
      timeout: 5000,
    }).should("be.visible");
  });

  it("contact form submit succeeds with API", function () {
    if (!Cypress.env("E2E_API_AVAILABLE")) {
      this.skip();
    }

    cy.visit("/contact");
    cy.findByLabelText(/Nom complet/i).type("E2E Test User");
    cy.findByLabelText(/Email/i).first().type("e2e-test@example.com");
    cy.findByLabelText(/Sujet/i).type("Test E2E");
    cy.findByLabelText(/Message/i).type(
      "Ceci est un message de test E2E."
    );
    cy.findByRole("button", { name: /Envoyer/i }).click();

    cy.contains(/Message envoyé avec succès/i, { timeout: 10000 }).should(
      "be.visible"
    );
  });
});
