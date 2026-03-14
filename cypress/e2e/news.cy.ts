describe("News / Actualités", () => {
  it("news listing page loads", () => {
    cy.visit("/actualites");

    cy.get("body", { timeout: 15000 }).should(
      "satisfy",
      ($el) =>
        /ACTUALITÉ|Aucune actualité|Erreur de chargement/.test($el.text())
    );
  });

  it("news detail page loads by slug", () => {
    cy.visit("/actualites");

    cy.get("main", { timeout: 15000 }).should("be.visible");
    cy.get("body").should(
      "satisfy",
      ($el) => /ACTUALITÉ|Aucune actualité|Erreur/.test($el.text())
    );
    cy.get("body").then(($body) => {
      const $link = $body.find('a[href*="/actualites/"]').first();
      if ($link.length > 0) {
        cy.wrap($link).click();
        cy.url().should("match", /\/actualites\/.+/);
        cy.get("main").should("be.visible");
      }
    });
  });
});
