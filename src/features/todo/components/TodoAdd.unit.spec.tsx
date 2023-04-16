import { render, screen, waitFor } from "../../../tests/test-utils";
import userEvent from "@testing-library/user-event";

import TodoAdd from "./TodoAdd";

const props = {
  handleAddTodo: jest.fn(),
  handleAsyncAddTodo: jest.fn(),
};

describe("Todo Add", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call function to add the todo on key press", async () => {
    const handleAddTodoSpy = jest.fn((e) => e.preventDefault());
    render(<TodoAdd {...props} handleAddTodo={handleAddTodoSpy} />);

    const input = screen.getByRole("textbox");
    userEvent.type(input, "task");
    input.focus();
    userEvent.keyboard("{enter}");

    await waitFor(() => {
      expect(handleAddTodoSpy).toHaveBeenCalled();
    });
  });

  it("should call function to add todo on Button click", async () => {
    const handleAddTodoSpy = jest.fn((e) => e.preventDefault());
    render(<TodoAdd {...props} handleAddTodo={handleAddTodoSpy} />);

    userEvent.type(screen.getByRole("textbox"), "task");
    userEvent.click(screen.getByTestId("add-button"));

    await waitFor(() => {
      expect(handleAddTodoSpy).toHaveBeenCalled();
    });
  });

  it("should call function to add todo asynchronously", async () => {
    const handleAsyncAddTodoSpy = jest.fn((e) => e.preventDefault());
    render(<TodoAdd {...props} handleAsyncAddTodo={handleAsyncAddTodoSpy} />);

    userEvent.type(screen.getByRole("textbox"), "task");
    userEvent.click(screen.getByTestId("add-button-async"));

    await waitFor(() => {
      expect(handleAsyncAddTodoSpy).toHaveBeenCalled();
    });
  });
});
