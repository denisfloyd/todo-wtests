import axios from "axios";

export const postTodo = (todo: string) => {
  return axios.post("https://jsonplaceholder.typicode.com/todos", {
    userId: 10,
    title: todo,
    completed: false,
  });
};
