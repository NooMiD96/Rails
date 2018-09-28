// -----------------
// STATE
export interface TodoListState {
  todoList: TodoPayload[];
  todoListlabel: string;
  pending: boolean;
  errorMessage: string;
}

export interface TodoPayload {
  done: boolean;
  content: string;
}

export const UnloadedState: TodoListState = {
  todoList: [
    { done: false, content: "Test1" },
    { done: false, content: "Test2" },
    { done: false, content: "Test3" },
    { done: false, content: "Test4" },
  ],
  todoListlabel: "Example1",
  pending: false,
  errorMessage: "",
};
