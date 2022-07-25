describe("todo spec feature", () => {
  it("render correctly", () => {
    cy.visit("/");
    cy.get("#container").should("exist");
  });
});
