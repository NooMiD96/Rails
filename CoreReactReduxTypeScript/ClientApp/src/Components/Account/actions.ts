import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/IResponses";
import { TRegistrationModel, TAuthenticationModel } from "./TAccount";
import * as t from "./actionsType";
// ----------------
// ACTIONS
export const ActionsList = {
    RegistrationRequest: (): t.IRegistrationRequest => ({
        type: t.REGISTRATION_REQUEST,
    }),
    RegistrationSuccess: (): t.IRegistrationSuccess => ({
        type: t.REGISTRATION_SUCCESS,
    }),
    RegistrationError: (errorMessage: string): t.IRegistrationError => ({
        type: t.REGISTRATION_ERROR,
        errorMessage,
    }),
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
    Registration: (data: TRegistrationModel): AppThunkAction<t.TRegistration> => (dispatch, _getState) => {
        const fetchTask = fetch("/api/Account/Registration", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data),
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
            dispatch(ActionsList.RegistrationSuccess());
        }).catch((err: string) => {
            console.log(err);
            dispatch(ActionsList.RegistrationError(err));
        });

        addTask(fetchTask);
        dispatch(ActionsList.RegistrationRequest());
    },
    Authentication: (data: TAuthenticationModel): AppThunkAction<t.TAuthentication> => (dispatch, _getState) => {
        const fetchTask = fetch("/api/Account/Authentication", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data),
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
    Logout: (): AppThunkAction<t.TLogout> => (dispatch, _getState) => {
        const fetchTask = fetch("/api/Account/Logout", {
            method: "POST",
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
