// ----------------
// REDUCER
import { Reducer } from "redux";

import { AccountState, UnloadedState } from "./IAccountState";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<AccountState> = (state: AccountState, action: KnownAction) => {
    switch (action.type) {
        case t.AUTHENTICATION_REQUEST:
        case t.LOGOUT_REQUEST:
            return {
                ...state,
                pending: true,
            };

        case t.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                pending: false,
            };

        case t.LOGOUT_SUCCESS:
            return {
                ...state,
                pending: false,
            };

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

        default:
            const exhaustiveCheck: never = action;
    }
    return state || UnloadedState;
};
