import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/IResponses";
import { IData } from "./IFetcherState";
import * as t from "./actionsType";
// ----------------
// ACTIONS
export const ActionsList = {
    PostDataRequest: (): t.IPostDataRequest => ({
        type: t.POST_DATA_REQUEST,
    }),
    PostDataSuccess: (): t.IPostDataSuccess => ({
        type: t.POST_DATA_SUCCESS,
    }),
    PostDataError: (): t.IPostDataError => ({
        type: t.POST_DATA_ERROR,
    }),
    GetDataRequest: (): t.IGetDataRequest => ({
        type: t.GET_DATA_REQUEST,
    }),
    GetDataSuccess: (payload: IData[]): t.IGetDataSuccess => ({
        type: t.GET_DATA_SUCCESS,
        payload,
    }),
    GetDataError: (): t.IGetDataError => ({
        type: t.GET_DATA_ERROR,
    }),
};
// ----------------
// ACTION CREATORS
export const ActionCreators = {
    GetData: (): AppThunkAction<t.TGetData> => (dispatch, _getState) => {
        const fetchTask = fetch("/api/Fetcher/GetStrings", {
                method: "GET",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
            }).then((res: Response) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.resolve({ error: `Status is ${res.status}` });
                }
            }).then((value: IResponse) => {
                if (value && value.error) {
                    throw value.error;
                }
                const data: IData[] = JSON.parse(value.data);
                dispatch(ActionsList.GetDataSuccess(data));
            }).catch((err: string) => {
                console.log(err);
                dispatch(ActionsList.GetDataError());
            });

        addTask(fetchTask);
        dispatch(ActionsList.GetDataRequest());
    },
    PostData: (text: string): AppThunkAction<t.TPostData | t.TGetData> => (dispatch, _getState) => {
        const fetchTask = fetch("/api/Fetcher/SaveString", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                body: JSON.stringify({ data: text }),
            }).then((res: Response) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.resolve({ error: `Status is ${res.status}` });
                }
            }).then((value: IResponse) => {
                if (value && value.error) {
                    throw value.error;
                }

                dispatch(ActionsList.PostDataSuccess());
                ActionCreators.GetData()(dispatch, _getState);
            }).catch((err: string) => {
                console.log(err);
                dispatch(ActionsList.PostDataError());
            });

        addTask(fetchTask);
        dispatch(ActionsList.PostDataRequest());
    },
};
