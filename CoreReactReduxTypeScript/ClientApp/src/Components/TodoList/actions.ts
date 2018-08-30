import { fetch, addTask } from "domain-task";
import { AppThunkAction } from "@src/Store";

import { IResponse } from "@core/IResponses";
import * as t from "./actionsType";
import { TTodoListModel } from "./TTodoList";
// ----------------
// ACTIONS
export const ActionsList = {
    GetTodoListRequest: (): t.IGetTodoListRequest => ({
        type: t.GET_TODO_LIST_REQUEST,
    }),
    GetTodoListSuccess: (payload: TTodoListModel): t.IGetTodoListSuccess => ({
        type: t.GET_TODO_LIST_SUCCESS,
        payload,
    }),
    GetTodoListError: (errorMessage: string): t.IGetTodoListError => ({
        type: t.GET_TODO_LIST_ERROR,
        errorMessage,
    }),
    PostTodoListRequest: (): t.IPostTodoListRequest => ({
        type: t.POST_TODO_LIST_REQUEST,
    }),
    PostTodoListSuccess: (): t.IPostTodoListSuccess => ({
        type: t.POST_TODO_LIST_SUCCESS,
    }),
    PostTodoListError: (errorMessage: string): t.IPostTodoListError => ({
        type: t.POST_TODO_LIST_ERROR,
        errorMessage,
    }),
    RemoveErrorMessage: (): t.IRemoveErrorMessage => ({
        type: t.REMOVE_ERROR_MESSAGE,
    }),
};
// ----------------
// ACTION CREATORS
export const ActionCreators = {
    GetTodoList: (): AppThunkAction<t.TGetTodoList> => (dispatch, _getState) => {
        const fetchTask = fetch("/adminapi/todo/getfirsttodolist", {
                method: "GET",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
            }).then((res: Response) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.resolve({ error: `Status is ${res.status}` });
                }
            }).then((value: IResponse<string>) => {
                if (value && value.error) {
                    throw value.error;
                }
                const data: TTodoListModel = JSON.parse(value.data);
                dispatch(ActionsList.GetTodoListSuccess(data));
            }).catch((err: Error) => {
                console.warn(`Error :-S in getting todo list: ${err.message}\r\n${err.stack}`);
                dispatch(ActionsList.GetTodoListError(err.message));
            });

        addTask(fetchTask);
        dispatch(ActionsList.GetTodoListRequest());
    },
    PostTodoList: (todoList: TTodoListModel): AppThunkAction<t.TPostTodoList | t.TGetTodoList> => (dispatch, _getState) => {
        const fetchTask = fetch("/adminapi/todo/savetodolist", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                body: JSON.stringify(todoList),
            }).then((res: Response) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.resolve({ error: `Status is ${res.status}` });
                }
            }).then((value: IResponse<string>) => {
                if (value && value.error) {
                    throw value.error;
                }
                dispatch(ActionsList.PostTodoListSuccess());
                ActionCreators.GetTodoList()(dispatch, _getState);
            }).catch((err: Error) => {
                console.warn(`Error :-S in sending todo list: ${err.message}\r\n${err.stack}`);
                dispatch(ActionsList.PostTodoListError(err.message));
            });

        addTask(fetchTask);
        dispatch(ActionsList.PostTodoListRequest());
    },
    RemoveErrorMessage: ActionsList.RemoveErrorMessage,
};
