import { FormEvent, useRef, useState } from "react";

import { Container, List, TodoElement, TodoInput, Button } from "./styles";

interface Todo {
  task: string;
}

const Todos: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if task is empty or has already been added
    if (inputRef.current && inputRef.current.value.trim().length > 0) {
      const taskIsAlreadyExists = todos.some(
        (task) => task.task === inputRef.current?.value
      );

      if (!taskIsAlreadyExists) {
        const task = inputRef.current.value.trim();
        setTodos([...todos, { task }]);
        inputRef.current.value = "";
      }
    }
  };

  const handleRemoveTodo = (task: string) => {
    setTodos(todos.filter((todo) => todo.task !== task));
  };

  return (
    <Container>
      <h1>Todo List</h1>

      <form onSubmit={handleAddTodo}>
        <TodoInput id="input-todo" ref={inputRef} />
        <Button type="submit" data-testid="add-button" addBackground>
          +
        </Button>
        <Button type="submit" data-testid="add-button-async" addBackground>
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
