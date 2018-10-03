import { TTodoListModel } from "./TTodoList";
// -----------------
// ACTIONS TYPE
export const GET_TODO_LIST_REQUEST = "GET_TODO_LIST_REQUEST";
export const GET_TODO_LIST_SUCCESS = "GET_TODO_LIST_SUCCESS";
export const GET_TODO_LIST_ERROR = "GET_TODO_LIST_ERROR";

export const POST_TODO_LIST_REQUEST = "POST_TODO_LIST_REQUEST";
export const POST_TODO_LIST_SUCCESS = "POST_TODO_LIST_SUCCESS";
export const POST_TODO_LIST_ERROR = "POST_TODO_LIST_ERROR";

export const REMOVE_ERROR_MESSAGE = "REMOVE_ERROR_MESSAGE";
// -----------------
// ACTIONS INTERFACE
export interface IGetTodoListRequest { type: typeof GET_TODO_LIST_REQUEST; }
export interface IGetTodoListSuccess { type: typeof GET_TODO_LIST_SUCCESS; payload: TTodoListModel; }
export interface IGetTodoListError { type: typeof GET_TODO_LIST_ERROR; errorMessage: string; }
export type TGetTodoList = IGetTodoListRequest | IGetTodoListSuccess | IGetTodoListError;

export interface IPostTodoListRequest { type: typeof POST_TODO_LIST_REQUEST; }
export interface IPostTodoListSuccess { type: typeof POST_TODO_LIST_SUCCESS; }
export interface IPostTodoListError { type: typeof POST_TODO_LIST_ERROR; errorMessage: string; }
export type TPostTodoList = IPostTodoListRequest | IPostTodoListSuccess | IPostTodoListError;

export interface IRemoveErrorMessage { type: typeof REMOVE_ERROR_MESSAGE; }

type KnownAction = IRemoveErrorMessage | TGetTodoList | TPostTodoList;
export default KnownAction;
