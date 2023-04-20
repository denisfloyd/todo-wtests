import { Button, List, TodoElement } from "../styles";

interface Props {
  todos: string[];
  handleRemoveTodo: (todo: string) => void;
}

const TodoList = ({ todos, handleRemoveTodo }: Props) => {
  return (
    <List>
      {todos &&
        todos.map((todo) => (
          <TodoElement
            key={todo.concat(String(Math.floor(Math.random() * 1000)))}
          >
            {todo}
            <Button
              data-testid={`delete-${todo}`}
              onClick={() => handleRemoveTodo(todo)}
            >
              X
            </Button>
          </TodoElement>
        ))}
    </List>
  );
};

export default TodoList;
