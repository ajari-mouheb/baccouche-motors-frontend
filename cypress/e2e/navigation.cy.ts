describe("Navigation", () => {
  it("homepage loads and has key content", () => {
    cy.visit("/");
    cy.title().should("match", /Baccouche Automobiles/);
    cy.get("nav").within(() => {
      cy.findByRole("link", { name: /Accueil/i }).should("be.visible");
      cy.findByRole("link", { name: /Véhicules/i }).should("be.visible");
    });
  });

  it("navigates to About page", () => {
    cy.visit("/");
    cy.get("nav").within(() => {
      cy.findByRole("link", { name: /À propos/i }).click();
    });
    cy.url().should("include", "/about");
    cy.findByRole("heading", { name: /À PROPOS/i }).should("be.visible");
  });

  it("navigates to Cars page", () => {
    cy.visit("/");
    cy.get("nav").within(() => {
      cy.findByRole("link", { name: /Véhicules/i }).click();
    });
    cy.url().should("include", "/cars");
    cy.get("body", { timeout: 10000 }).should(
      "satisfy",
      ($el) =>
        /VOTRE BMW|Aucun véhicule|Erreur de chargement/.test($el.text())
    );
  });

  it("navigates to Contact page", () => {
    cy.visit("/");
    cy.get("nav").within(() => {
      cy.findByRole("link", { name: /Contact/i }).click();
    });
    cy.url().should("include", "/contact");
    cy.findByRole("heading", { name: "CONTACT", exact: true }).should(
      "be.visible"
    );
  });

  it("navigates to Actualités page", () => {
    cy.visit("/");
    cy.get("nav").within(() => {
      cy.findByRole("link", { name: /Actualités/i }).click();
    });
    cy.url().should("include", "/actualites");
    cy.get("body", { timeout: 10000 }).should(
      "satisfy",
      ($el) =>
        /ACTUALITÉ|Aucune actualité|Erreur de chargement/.test($el.text())
    );
  });

  it("navigates to Test Drive page", () => {
    cy.visit("/");
    cy.findAllByRole("link", { name: /Test Drive/i }).first().click();
    cy.url().should("include", "/test-drive");
    cy.findByRole("heading", { name: /Réserver un Test Drive/i }).should(
      "be.visible"
    );
  });

  it("navigates to customer login", () => {
    cy.visit("/");
    cy.get("header").within(() => {
      cy.findByRole("link", { name: /Espace client/i }).click();
    });
    cy.url().should("include", "/customer/login");
  });
});
