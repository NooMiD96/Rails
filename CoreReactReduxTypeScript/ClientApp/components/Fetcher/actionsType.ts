import { IData } from "./IFetcherState";
// -----------------
// ACTIONS TYPE
export const POST_DATA_REQUEST = 'POST_DATA_REQUEST';
export const POST_DATA_SUCCESS = 'POST_DATA_SUCCESS';
export const POST_DATA_ERROR = 'POST_DATA_ERROR';

export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_ERROR = 'GET_DATA_ERROR';
// -----------------
// ACTIONS INTERFACE
export interface IPostDataRequest { type: typeof POST_DATA_REQUEST };
export interface IPostDataSuccess { type: typeof POST_DATA_SUCCESS };
export interface IPostDataError { type: typeof POST_DATA_ERROR };
export type TPostData = IPostDataRequest | IPostDataSuccess | IPostDataError;

export interface IGetDataRequest { type: typeof GET_DATA_REQUEST };
export interface IGetDataSuccess { type: typeof GET_DATA_SUCCESS, payload: IData[] };
export interface IGetDataError { type: typeof GET_DATA_ERROR };
export type TGetData = IGetDataRequest | IGetDataSuccess | IGetDataError;

type KnownAction = TPostData | TGetData;
export default KnownAction;
