import { fireEvent, render, screen } from "../../../tests/test-utils";
import TodoList from "./TodoList";

describe("Todo List", () => {
  it("should render todos list", () => {
    const todos = ["todo-1", "todo-2", "todo-3"];
    render(<TodoList todos={todos} handleRemoveTodo={jest.fn()} />);

    screen.getAllByRole("listitem").forEach((element, index) => {
      expect(element).toHaveTextContent(todos[index]);
    });
  });

  it("should trigger remove todo function when click on remove button", () => {
    const todos = ["todo-1", "todo-2", "todo-3"];
    const handleRemoveTodoSpy = jest.fn();
    render(<TodoList todos={todos} handleRemoveTodo={handleRemoveTodoSpy} />);

    const removeButton = screen.getByTestId("delete-todo-1");
    fireEvent.click(removeButton);

    expect(handleRemoveTodoSpy).toHaveBeenCalledWith("todo-1");
  });
});
