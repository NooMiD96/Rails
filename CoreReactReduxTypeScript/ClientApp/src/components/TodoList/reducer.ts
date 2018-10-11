// ----------------
// REDUCER
import { Reducer } from "redux";

import { TodoListState, UnloadedState } from "./ITodoListState";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<TodoListState> = (state: TodoListState = UnloadedState, action: KnownAction) => {
    switch (action.type) {
        case t.GET_TODO_LIST_REQUEST:
        case t.POST_TODO_LIST_REQUEST:
            return {
                ...state,
                pending: true,
            };

        case t.POST_TODO_LIST_SUCCESS:
            return {
                ...state,
                pending: false,
            };

        case t.GET_TODO_LIST_SUCCESS:
            return {
                ...state,
                data: action.payload,
                pending: false,
            };

        case t.GET_TODO_LIST_ERROR:
        case t.POST_TODO_LIST_ERROR:
            return {
                ...state,
                pending: false,
                errorMessage: action.errorMessage,
            };

        case t.REMOVE_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: "",
            };

        default:
            const exhaustiveCheck: never = action;
    }
    return state;
};
