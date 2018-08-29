// -----------------
// STATE
export interface TodoListState {
    todoList: TodoPayload[];
    pending: boolean;
    errorMessage: string;
}

export interface TodoPayload {
    done: boolean;
    content: string;
}

export const UnloadedState: TodoListState = {
    todoList: [{done: false, content: "1"}, {done: false, content: "1"}, {done: false, content: "1"}, {done: false, content: "1"}],
    pending: false,
    errorMessage: "",
};
