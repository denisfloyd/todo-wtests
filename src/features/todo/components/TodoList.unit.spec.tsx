import { render, screen } from "../../../tests/test-utils";
import TodoList from "./TodoList";

describe("Todo List", () => {
  it("should render todos list", () => {
    const todos = ["todo-1", "todo-2", "todo-3"];
    render(<TodoList todos={todos} />);

    screen.getAllByRole("listitem").forEach((element, index) => {
      expect(element).toHaveTextContent(todos[index]);
    });
  });
});
