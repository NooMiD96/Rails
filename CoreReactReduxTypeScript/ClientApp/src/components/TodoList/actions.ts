import { fetch, addTask } from "domain-task";
import { AppThunkAction } from "@src/Store";

import { IResponse } from "@core/fetchHelper/IResponses";
import * as t from "./actionsType";
import { TTodoListModel } from "./TTodoList";
import { errorCreater, errorCatcher } from "@core/fetchHelper/errorCatcher";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";
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
  GetTodoList: (): AppThunkAction<t.TGetTodoList> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch("/adminapi/todo/getfirsttodolist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`Status is ${res.status}`);
      }
    }).then((value: IResponse<string>) => {
      if (value && value.error) {
        return errorCreater(value.error);
      }
      const data: TTodoListModel = JSON.parse(value.data);
      dispatch(ActionsList.GetTodoListSuccess(data));

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "TodoList",
      err,
      ActionsList.GetTodoListError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.GetTodoListRequest());
  },
  PostTodoList: (todoList: TTodoListModel): AppThunkAction<t.TPostTodoList | t.TGetTodoList> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch("/adminapi/todo/savetodolist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      body: JSON.stringify(todoList),
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`Status is ${res.status}`);
      }
    }).then((value: IResponse<string>) => {
      if (value && value.error) {
        return errorCreater(value.error);
      }
      dispatch(ActionsList.PostTodoListSuccess());
      ActionCreators.GetTodoList()(dispatch, getState);

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "TodoList",
      err,
      ActionsList.PostTodoListError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.PostTodoListRequest());
  },
  RemoveErrorMessage: ActionsList.RemoveErrorMessage,
};
