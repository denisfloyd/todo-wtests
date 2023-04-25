import { render, screen } from "../../../tests/test-utils";
import userEvent from "@testing-library/user-event";

import TodoAdd from "./TodoAdd";

const props = {
  handleAddTodo: vi.fn(),
  handleAsyncAddTodo: vi.fn(),
};

describe("Todo Add", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call function to add the todo on key press", async () => {
    const handleAddTodoSpy = vi.fn((e) => e.preventDefault());
    render(<TodoAdd {...props} handleAddTodo={handleAddTodoSpy} />);

    // need to wait for because userEvent works in an asyncronous way
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "task");
    input.focus();
    await userEvent.keyboard("{enter}");

    expect(handleAddTodoSpy).toHaveBeenCalled();
  });

  it("should call function to add todo on Button click", async () => {
    const handleAddTodoSpy = vi.fn((e) => e.preventDefault());
    render(<TodoAdd {...props} handleAddTodo={handleAddTodoSpy} />);

    // need to wait for because userEvent works in an asyncronous way
    await userEvent.type(screen.getByRole("textbox"), "task");
    await userEvent.click(screen.getByTestId("add-button"));

    expect(handleAddTodoSpy).toHaveBeenCalled();
  });

  it("should call function to add todo asynchronously", async () => {
    const handleAsyncAddTodoSpy = vi.fn((e) => e.preventDefault());
    render(<TodoAdd {...props} handleAsyncAddTodo={handleAsyncAddTodoSpy} />);

    // need to wait for because userEvent works in an asyncronous way
    await userEvent.type(screen.getByRole("textbox"), "task");
    await userEvent.click(screen.getByTestId("add-button-async"));

    expect(handleAsyncAddTodoSpy).toHaveBeenCalled();
  });
});
