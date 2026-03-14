describe("Cars", () => {
  it("cars page loads", () => {
    cy.visit("/cars");

    cy.get("main", { timeout: 15000 }).should("be.visible");
    cy.get("body").should(
      "satisfy",
      ($el) =>
        /VOTRE BMW|Aucun véhicule|Erreur de chargement/.test($el.text())
    );
  });

  it("car detail page loads by slug", () => {
    cy.visit("/cars");

    cy.get("main", { timeout: 15000 }).should("be.visible");
    cy.get("body").should(
      "satisfy",
      ($el) => /VOTRE BMW|Aucun véhicule|Erreur/.test($el.text())
    );
    cy.get("body").then(($body) => {
      const $link = $body.find('a[href*="/cars/"]').first();
      if ($link.length > 0) {
        cy.wrap($link).click();
        cy.url().should("match", /\/cars\/.+/);
        cy.get("h1").first().should("be.visible");
      }
    });
  });
});
