import axios from "axios";
import { useRef, useState } from "react";

import { Container, List, TodoElement, TodoInput, Button } from "./styles";

interface Todo {
  task: string;
}

const Todos: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const validationToAddTodo = (todoAddFunctionCallback: Function) => {
    if (inputRef.current && inputRef.current.value.trim().length > 0) {
      const taskIsAlreadyExists = todos.some(
        (task) => task.task === inputRef.current?.value
      );

      return taskIsAlreadyExists ? alert("Task is already exists") : todoAddFunctionCallback();
    }

    return alert("Task is empty");
  };

  const handleAddTodo = (e: any) => {
    e.preventDefault();

    validationToAddTodo(() => {
      const task = inputRef.current?.value.trim() as string;
      setTodos([...todos, { task }]);
      inputRef.current!.value = "";
    });
  };

  const handleAsyncAddTodo = async (e: any) => {
    e.preventDefault();

    validationToAddTodo(async () => {
      const task = inputRef.current?.value.trim() as string;

      try {
        await axios.post("https://jsonplaceholder.typicode.com/todos", {
          userId: 10,
          title: task,
          completed: false,
        });

        await new Promise((resolve) => setTimeout(resolve, 500));

        setTodos([...todos, { task }]);
        inputRef.current!.value = "";
      } catch {
        alert("Server is not available");
      }
    });
  };

  const handleRemoveTodo = (task: string) => {
    setTodos(todos.filter((todo) => todo.task !== task));
  };

  return (
    <Container id="container">
      <h1>Todo List</h1>

      <form>
        <TodoInput data-testid="input-todo" ref={inputRef} />
        <Button onClick={handleAddTodo} data-testid="add-button" addBackground>
          +
        </Button>
        <Button
          onClick={handleAsyncAddTodo}
          data-testid="add-button-async"
          addBackground
        >
          + Async
        </Button>
      </form>

      <List>
        {todos &&
          todos.map((todo) => (
            <TodoElement key={todo.task}>
              {todo.task}
              <Button
                data-testid={`delete-${todo.task}`}
                onClick={() => handleRemoveTodo(todo.task)}
              >
                X
              </Button>
            </TodoElement>
          ))}
      </List>
    </Container>
  );
};

export default Todos;
