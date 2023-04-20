/// <reference types="cypress" />

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
    const tasks = ["Todo task 1", "Todo task 1"];

    cy.visit("/");
    cy.get("input").type(tasks[0]);
    cy.get('[data-testid="add-button"]').click();

    cy.get("input").type(tasks[1]);
    cy.get('[data-testid="add-button"]').click();

    cy.get("li").should("have.length", 1);
    cy.get("ul>li").each((el, index) => {
      cy.wrap(el).should("contain.text", tasks[index]);
    });
  });

  it("should add an asyncronous todo task", () => {
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

  it("should not add async todo task when server responded with an error", () => {
    cy.intercept(
      {
        method: "POST", // Route all POST requests
        url: "/todos", // that have a URL that matches '/todos'
      },
      { statusCode: 500 } // and force the status code to 500
    ).as("postTodo"); // and assign an alias

    cy.visit("/");
    cy.get("input").type("Todo task 1");
    cy.get('[data-testid="add-button-async"]').click();

    cy.wait("@postTodo");

    cy.get("li").should("have.length", 0);
    cy.on("window:alert", (alertMessage) => {
      expect(alertMessage).to.contains("Server is not available");
    });
  });

  it("should be able to remove a todo task", () => {
    const tasks = ["Todo task 1"];

    cy.visit("/");
    cy.get("input").type(tasks[0]);
    cy.get('[data-testid="add-button"]').click();

    cy.get("li").should("have.length", 1);
    cy.get(`[data-testid="delete-${tasks[0]}"]`).click();

    cy.get("li").should("have.length", 0);
  });
});
