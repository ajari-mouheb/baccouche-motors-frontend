describe("Admin", () => {
  beforeEach(function () {
    if (!Cypress.env("E2E_API_AVAILABLE")) {
      this.skip();
    }
  });

  it("admin dashboard loads after login", () => {
    cy.loginAsAdmin();
    cy.url().should("match", /\/admin\/dashboard/);
    cy.contains(/Tableau de bord|Dashboard/i, { timeout: 5000 }).should(
      "be.visible"
    );
  });

  it("admin cars section loads", () => {
    cy.loginAsAdmin();
    cy.visit("/admin/cars");
    cy.get("body", { timeout: 10000 }).should(
      "satisfy",
      ($el) => /Véhicules|Ajouter un véhicule/.test($el.text())
    );
  });

  it("admin contacts section loads", () => {
    cy.loginAsAdmin();
    cy.visit("/admin/contacts");
    cy.get("body", { timeout: 10000 }).should(
      "satisfy",
      ($el) => /Contacts|Messages/.test($el.text())
    );
  });

  it("admin test drives section loads", () => {
    cy.loginAsAdmin();
    cy.visit("/admin/test-drives");
    cy.get("body", { timeout: 10000 }).should(
      "satisfy",
      ($el) => /Test drives|Essais/.test($el.text())
    );
  });
});
