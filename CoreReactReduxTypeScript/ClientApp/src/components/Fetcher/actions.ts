import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponses";
import { IData } from "./IFetcherState";

import * as t from "./actionsType";
import { errorCreater, errorCatcher } from "@core/fetchHelper/errorCatcher";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";
// ----------------
// ACTIONS
export const ActionsList = {
  PostDataRequest: (): t.IPostDataRequest => ({
    type: t.POST_DATA_REQUEST,
  }),
  PostDataSuccess: (): t.IPostDataSuccess => ({
    type: t.POST_DATA_SUCCESS,
  }),
  PostDataError: (errorMessage: string): t.IPostDataError => ({
    type: t.POST_DATA_ERROR,
    errorMessage,
  }),
  GetDataRequest: (): t.IGetDataRequest => ({
    type: t.GET_DATA_REQUEST,
  }),
  GetDataSuccess: (payload: IData[]): t.IGetDataSuccess => ({
    type: t.GET_DATA_SUCCESS,
    payload,
  }),
  GetDataError: (errorMessage: string): t.IGetDataError => ({
    type: t.GET_DATA_ERROR,
    errorMessage,
  }),
  RemoveErrorMessage: (): t.IRemoveErrorMessage => ({
    type: t.REMOVE_ERROR_MESSAGE,
  }),
};
// ----------------
// ACTION CREATORS
export const ActionCreators = {
  GetData: (): AppThunkAction<t.TGetData> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch("/api/Fetcher/GetStrings", {
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
      const data: IData[] = JSON.parse(value.data);
      dispatch(ActionsList.GetDataSuccess(data));

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Fetcher",
      err,
      ActionsList.GetDataError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.GetDataRequest());
  },
  PostData: (text: string): AppThunkAction<t.TPostData | t.TGetData> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch("/api/Fetcher/SaveString", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
      body: JSON.stringify({ data: text }),
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
      dispatch(ActionsList.PostDataSuccess());
      ActionCreators.GetData()(dispatch, getState);
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Fetcher",
      err,
      ActionsList.PostDataError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.PostDataRequest());
  },
  RemoveErrorMessage: ActionsList.RemoveErrorMessage,
};
