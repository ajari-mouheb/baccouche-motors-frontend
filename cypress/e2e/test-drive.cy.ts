describe("Test Drive", () => {
  it("test drive page loads with form", () => {
    cy.visit("/test-drive");

    cy.findByRole("heading", { name: /Réserver un Test Drive/i }).should(
      "be.visible"
    );
    cy.findByLabelText(/Nom complet/i).should("be.visible");
    cy.findByLabelText(/Téléphone/i).should("be.visible");
    cy.findByLabelText(/Email/i).should("be.visible");
    cy.findByLabelText(/Modèle souhaité/i).should("be.visible");
    cy.findByRole("button", {
      name: /Envoyer ma demande|Réserver mon test drive/i,
    }).should("be.visible");
  });

  it("test drive guest form shows validation on empty submit", () => {
    cy.visit("/test-drive");

    cy.findByRole("button", {
      name: /Envoyer ma demande|Réserver mon test drive/i,
    })
      .first()
      .click();

    cy.contains(
      /Le nom doit contenir au moins 2 caractères|Veuillez sélectionner/i,
      { timeout: 5000 }
    ).should("be.visible");
  });

  it("test drive guest form submit succeeds with API", function () {
    if (!Cypress.env("E2E_API_AVAILABLE")) {
      this.skip();
    }

    cy.visit("/test-drive");

    cy.get("body").then(($body) => {
      if (!$body.text().includes("Modèle souhaité")) {
        this.skip();
      }
    });

    cy.findByLabelText(/Modèle souhaité/i).should("exist");
    cy.findByLabelText(/Nom complet/i).type("E2E Test User");
    cy.findByLabelText(/Téléphone/i).type("+21612345678");
    cy.findByLabelText(/Email/i).type("e2e-test@example.com");
    cy.findByLabelText(/Modèle souhaité/i).click();
    cy.findByRole("option").first().click();

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    cy.findByLabelText(/Date préférée/i).type(
      futureDate.toISOString().split("T")[0]
    );

    cy.get("body").then(($body) => {
      if ($body.text().includes("Créneau")) {
        cy.findByLabelText(/Créneau/i).click();
        cy.findByRole("option", { name: /Matin|Après-midi/i }).first().click();
      }
    });

    cy.findByRole("button", { name: /Envoyer ma demande/i }).click();

    cy.contains(/Demande envoyée avec succès|Demande envoyée/i, {
      timeout: 10000,
    }).should("be.visible");
  });
});
