import { forwardRef } from "react";
import { Button, TodoInput } from "../styles";

interface Props {
  handleAddTodo: (e: any) => void;
  handleAsyncAddTodo: (e: any) => void;
}

const TodoAdd = forwardRef<HTMLInputElement, Props>(function TodoAdd(
  { handleAddTodo, handleAsyncAddTodo },
  ref
) {
  return (
    <form>
      <TodoInput data-testid="input-todo" ref={ref} />
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
  );
});

export default TodoAdd;
