import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponses";

import { TRegistrationModel, TAuthenticationModel, TUserModel } from "./TAccount";
import * as t from "./actionsType";
import { errorCreater, errorCatcher } from "@core/fetchHelper/errorCatcher";
import { GetXsrf, XPT, GetXsrfToHeader } from "@core/helpers/auth/xsrf";

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
  SetUser: (user: TUserModel): t.ISetUser => ({
    type: t.SET_USER,
    user,
  }),
  RemoveErrorMessage: (): t.IRemoveErrorMessage => ({
    type: t.REMOVE_ERROR_MESSAGE,
  }),
  SetXsrf: (xpt: XPT): t.ISetXPTAction => ({
    type: t.SET_XPT,
    xpt,
  }),
};
// ----------------
// ACTION CREATORS
export const ActionCreators = {
  Registration: (data: TRegistrationModel): AppThunkAction<t.TRegistration | t.ISetUser | t.ISetXPTAction> => (dispatch, _getState) => {
    const fetchTask = fetch("/api/Account/Registration", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`Status is ${res.status}`);
      }
    }).then(async (value: IResponse<TUserModel>) => {
      if (value && value.error) {
        return errorCreater(value.error);
      }
      let xpt: false | XPT | undefined;

      try {
        xpt = await GetXsrf(data);
      } catch (err) {
        return errorCreater("Please try again...");
      }

      if (xpt) {
        dispatch(ActionsList.RegistrationSuccess());
        dispatch(ActionsList.SetUser(value.data));
        dispatch(ActionsList.SetXsrf(xpt));
      } else {
        return errorCreater("Please try again...");
      }

      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Account",
      err,
      ActionsList.RegistrationError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.RegistrationRequest());
  },
  Authentication: (data: TAuthenticationModel): AppThunkAction<t.TAuthentication | t.ISetUser | t.ISetXPTAction> => (dispatch, _getState) => {
    const fetchTask = fetch("/api/Account/Authentication", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
    }).then((res: Response) => {
      if (res.ok) {
        return res.json();
      } else {
        return errorCreater(`Status is ${res.status}`);
      }
    }).then(async (value: IResponse<TUserModel>) => {
      if (value && value.error) {
        return errorCreater(value.error);
      }
      let xpt: false | XPT | undefined;

      try {
        xpt = await GetXsrf(data);
      } catch (err) {
        return errorCreater("Please try again...");
      }

      if (xpt) {
        dispatch(ActionsList.AuthenticationSuccess());
        dispatch(ActionsList.SetUser(value.data));
        dispatch(ActionsList.SetXsrf(xpt));
      } else {
        return errorCreater("Please try again...");
      }
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Account",
      err,
      ActionsList.AuthenticationError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.AuthenticationRequest());
  },
  Logout: (): AppThunkAction<t.TLogout> => (dispatch, getState) => {
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch("/api/Account/Logout", {
      method: "POST",
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
      dispatch(ActionsList.LogoutSuccess());
      return Promise.resolve();
    }).catch((err: Error) => errorCatcher(
      "Account",
      err,
      ActionsList.LogoutError,
      dispatch
    ));

    addTask(fetchTask);
    dispatch(ActionsList.LogoutRequest());
  },
  RemoveErrorMessage: ActionsList.RemoveErrorMessage,
};
