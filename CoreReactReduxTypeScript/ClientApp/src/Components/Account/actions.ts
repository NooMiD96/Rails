import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/IResponses";
import * as t from "./actionsType";
// ----------------
// ACTIONS
export const ActionsList = {
    AuthenticationRequest: (): t.IAuthenticationRequest => ({
        type: t.AUTHENTICATION_REQUEST,
    }),
    AuthenticationSuccess: (): t.IAuthenticationSuccess => ({
        type: t.AUTHENTICATION_SUCCESS,
    }),
    AuthenticationError: (errorMessage: string): t.IAuthenticationError => ({
        type: t.AUTHENTICATION_ERROR,
        errorMessage,
    }),
    LogoutRequest: (): t.ILogoutRequest => ({
        type: t.LOGOUT_REQUEST,
    }),
    LogoutSuccess: (): t.ILogoutSuccess => ({
        type: t.LOGOUT_SUCCESS,
    }),
    LogoutError: (errorMessage: string): t.ILogoutError => ({
        type: t.LOGOUT_ERROR,
        errorMessage,
    }),
    RemoveErrorMessage: (): t.IRemoveErrorMessage => ({
        type: t.REMOVE_ERROR_MESSAGE,
    }),
};
// ----------------
// ACTION CREATORS
export const ActionCreators = {
    Authentication: (): AppThunkAction<t.TAuthentication> => (dispatch, _getState) => {
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
                dispatch(ActionsList.AuthenticationSuccess());
            }).catch((err: string) => {
                console.log(err);
                dispatch(ActionsList.AuthenticationError(err));
            });

        addTask(fetchTask);
        dispatch(ActionsList.AuthenticationRequest());
    },
    Logout: (text: string): AppThunkAction<t.TLogout> => (dispatch, _getState) => {
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
                dispatch(ActionsList.LogoutSuccess());
            }).catch((err: string) => {
                console.log(err);
                dispatch(ActionsList.LogoutError(err));
            });

        addTask(fetchTask);
        dispatch(ActionsList.LogoutRequest());
    },
    RemoveErrorMessage: ActionsList.RemoveErrorMessage,
};
