import { fireEvent, render, waitFor } from "../../tests/test-utils";
import * as Api from "./api";
import Todos from ".";
import { AxiosResponse } from "axios";

const alertMock = vi.fn();

//some ways to mock something
// jest.mock("./api", () => ({
//   postTodo: () => Promise.resolve({}),
// }));

const postTodoMock = vi
  .spyOn(Api, "postTodo")
  .mockImplementation(() => Promise.resolve({} as AxiosResponse));

/*
  import * as Api from "./api";
  const postTodoSpy = jest.spyOn(Api, 'postTodo').mockResolveValue(...)
  expect(postTodoSpy).toHaveBeenCalled();
*/

/* 
  jest.mock("./api");
  const ApiMock = jest.requireMock('./api');
  const postTodoSpy = jest.spyOn(ApiMock, 'postTodo').mockResolveValue(...)
  expect(postTodoSpy).toHaveBeenCalled();
*/

/*
  import { postTodo } from "./api";
  ...
  jest.mock("./api");
  cosnt postTodoMock = jest.mocked(postTodo).mockResolvedValue("" as any); 
  or const postTodoMock = (postTodo as jest.Mock).mockRejectedValue({});

  expect(postTodoMock).toHaveBeenCalled();
*/

describe("Todo feature", () => {
  beforeAll(() => {
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
    postTodoMock.mockRejectedValue(() => {});

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

  it("should be able to remove a todo task", () => {
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
