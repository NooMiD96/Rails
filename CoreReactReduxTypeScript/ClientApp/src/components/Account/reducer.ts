// ----------------
// REDUCER
import { Reducer } from "redux";

import { UserTypeEnums } from "@core/constants";
import { AccountState, UnloadedState } from "./IAccountState";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<AccountState> = (state: AccountState = UnloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.REGISTRATION_REQUEST:
    case t.AUTHENTICATION_REQUEST:
    case t.LOGOUT_REQUEST:
      return {
        ...state,
        pending: true,
      };

    case t.REGISTRATION_SUCCESS:
    case t.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case t.LOGOUT_SUCCESS:
      return {
        ...UnloadedState,
      };

    case t.REGISTRATION_ERROR:
    case t.AUTHENTICATION_ERROR:
    case t.LOGOUT_ERROR:
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

    case t.SET_USER:
      return {
        ...state,
        userName: action.user.userName,
        userType: UserTypeEnums[action.user.userType] as any,
      };

    case t.SET_XPT:
      return {
        ...state,
        _xpt: action.xpt,
      };

    default:
      const exhaustiveCheck: never = action;
  }
  return state;
};
