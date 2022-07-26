describe("todo spec feature", () => {
  it("render correctly", () => {
    cy.visit("/");
    cy.get("#container").should("exist");
  });

  it("should add a syncronous todo task", () => {
    const tasks = ["Todo task 1", "Todo task 2"];

    cy.visit("/");
    cy.get("input").type(tasks[0]);
    cy.get('[data-testid="add-button"]').click();

    cy.get("input").type(tasks[1]);
    cy.get('[data-testid="add-button"]').click();

    cy.get("li").should("have.length", 2);
    cy.get("ul>li").each((el, index) => {
      cy.wrap(el).should("contain.text", tasks[index]);
    });
  });

  it("should not be able to add an empty todo task", () => {
    cy.visit("/");
    cy.get("input").type(" ");
    cy.get('[data-testid="add-button"]').click();
    cy.get("li").should("have.length", 0);
  });

  it("should not be able to add a task that already exists", () => {
    const tasks = ["Todo task 1", "Todo task 2"];

    cy.visit("/");
    cy.get("input").type(tasks[0]);
    cy.get('[data-testid="add-button-async"]').click();

    cy.get("li").should("have.length", 1);

    cy.get("input").type(tasks[1]);
    cy.get('[data-testid="add-button-async"]').click();

    cy.get("li").should("have.length", 2);
    cy.get("ul>li").each((el, index) => {
      cy.wrap(el).should("contain.text", tasks[index]);
    });
  });

  // it.todo("should add an asyncronous todo task");

  // it.todo("should not add async todo task when server responded with an error");

  // it.todo("should be able to remove a todo task");
});