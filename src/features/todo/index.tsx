import { useRef, useState } from "react";

import { Container } from "./styles";
import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";
import { postTodo } from "./api";

const Todos: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<string[]>([]);

  const validationToAddTodo = (todoAddFunctionCallback: Function) => {
    if (inputRef.current && inputRef.current.value.trim().length > 0) {
      const taskIsAlreadyExists = todos.some(
        (task) => task === inputRef.current?.value
      );

      return taskIsAlreadyExists
        ? alert("Task is already exists")
        : todoAddFunctionCallback();
    }

    return alert("Task is empty");
  };

  const handleAddTodo = (e: any) => {
    e.preventDefault();

    validationToAddTodo(() => {
      const task = inputRef.current?.value.trim() as string;
      setTodos([...todos, task]);
      inputRef.current!.value = "";
    });
  };

  const handleAsyncAddTodo = async (e: any) => {
    e.preventDefault();

    validationToAddTodo(async () => {
      const task = inputRef.current?.value.trim() as string;

      try {
        await postTodo(task);
        await new Promise((resolve) => setTimeout(resolve, 500));

        setTodos([...todos, task]);
        inputRef.current!.value = "";
      } catch {
        alert("Server is not available");
      }
    });
  };

  const handleRemoveTodo = (task: string) => {
    setTodos(todos.filter((todo) => todo !== task));
  };

  return (
    <Container id="container">
      <h1>Todo List</h1>

      <TodoAdd
        handleAddTodo={handleAddTodo}
        handleAsyncAddTodo={handleAsyncAddTodo}
        ref={inputRef}
      />

      <TodoList todos={todos} handleRemoveTodo={handleRemoveTodo} />
    </Container>
  );
};

export default Todos;
