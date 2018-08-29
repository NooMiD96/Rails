// -----------------
// STATE
export interface TodoListState {
    data: string[];
    pending: boolean;
    errorMessage: string;
}

export const UnloadedState: TodoListState = { data: ["1", "2", "3", "sdasdasda"], pending: false, errorMessage: "" };
