import { fireEvent, render, waitFor } from "../../tests/test-utils";
import axios from "axios";
import AxiosMock from "axios-mock-adapter";

import Todos from ".";

const apiMock = new AxiosMock(axios, {
  delayResponse: 300,
});

const alertMock = jest.fn();

describe("Todo feature", () => {
  beforeAll(() => {
    apiMock.onPost().reply(201);
    window.alert = alertMock;
  });

  beforeEach(() => {
    alertMock.mockClear();
  });

  it("should render correctly", () => {
    const { getByText, getByTestId } = render(<Todos />);

    expect(getByText("Todo List")).toBeInTheDocument();
    expect(getByTestId("input-todo")).toBeInTheDocument();
    expect(getByTestId("add-button")).toBeInTheDocument();
  });

  it("should add a syncronous todo task", () => {
    const { getByText, getByTestId } = render(<Todos />);

    const inputTodo = getByTestId("input-todo");
    const addButton = getByTestId("add-button");

    addTodoTask(inputTodo, addButton, "Test task");

    expect(getByText("Test task")).toBeInTheDocument();
  });

  it("should not be able to add an empty todo task", () => {
    const { queryAllByRole, getByTestId } = render(<Todos />);

    const inputTodo = getByTestId("input-todo");
    const addButton = getByTestId("add-button");

    addTodoTask(inputTodo, addButton, " ");

    expect(queryAllByRole("listitem").length).toBe(0);
    expect(alertMock).toHaveBeenCalledWith("Task is empty");
  });

  it("should not be able to add a task that already exists", () => {
    const { getAllByRole, getByTestId } = render(<Todos />);

    const inputTodo = getByTestId("input-todo");
    const addButton = getByTestId("add-button");

    addTodoTask(inputTodo, addButton, "Test Task");
    addTodoTask(inputTodo, addButton, "Test Task");

    expect(getAllByRole("listitem").length).toBe(1);
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith("Task is already exists");
  });

  it("should add an asyncronous todo task", async () => {
    const { findByText, getByTestId } = render(<Todos />);

    const inputTodo = getByTestId("input-todo");
    const addButtonAsync = getByTestId("add-button-async");

    addTodoTask(inputTodo, addButtonAsync, "Test task");

    expect(await findByText("Test task")).toBeInTheDocument();
  });

  it("should not add async todo task when server responded with an error", async () => {
    apiMock.onPost().reply(500);

    const { queryByText, getByTestId, queryAllByRole } = render(<Todos />);

    const inputTodo = getByTestId("input-todo");
    const addButtonAsync = getByTestId("add-button-async");

    addTodoTask(inputTodo, addButtonAsync, "Test task 2");

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Server is not available");
    });
    
    expect(queryAllByRole("listitem").length).toBe(0);
    expect(queryByText("Test task 2")).toBeNull();
  });

  it("should be able to remove a todo task", async () => {
    const { getByTestId, queryByText, getByText } = render(<Todos />);

    const inputTodo = getByTestId("input-todo");
    const addButton = getByTestId("add-button");

    addTodoTask(inputTodo, addButton, "Test task");

    expect(getByText("Test task")).toBeInTheDocument();

    const removeButton = getByTestId("delete-Test task");
    fireEvent.click(removeButton);

    expect(queryByText("Test task")).toBeNull();
  });
});

const addTodoTask = (
  inputTodo: HTMLElement,
  addButton: HTMLElement,
  task: string
) => {
  fireEvent.change(inputTodo, { target: { value: task } });
  fireEvent.click(addButton);
};
