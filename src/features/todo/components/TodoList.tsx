import { List, TodoElement } from "../styles";

interface Props {
  todos: string[];
}

const TodoList = ({ todos }: Props) => {
  return (
    <List>
      {todos &&
        todos.map((todo) => (
          <TodoElement key={todo}>
            {todo}
            {/* <Button
                data-testid={`delete-${todo.task}`}
                onClick={() => handleRemoveTodo(todo.task)}
              >
                X
              </Button> */}
          </TodoElement>
        ))}
    </List>
  );
};

export default TodoList;
