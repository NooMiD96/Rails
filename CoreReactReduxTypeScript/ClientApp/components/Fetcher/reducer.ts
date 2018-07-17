// ----------------
// REDUCER
import { Reducer } from 'redux';

import { FetcherState, UnloadedState } from "./IFetcherState";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<FetcherState> = (state: FetcherState, action: KnownAction) => {
    switch (action.type) {
        case t.GET_DATA_REQUEST:
        case t.POST_DATA_REQUEST:
            return {
                ...state,
            }
        case t.GET_DATA_SUCCESS:
        case t.POST_DATA_SUCCESS:
            return {
                ...state,
            }
        case t.GET_DATA_ERROR:
        case t.POST_DATA_ERROR:
            return {
                ...state,
            }

        default:
            const exhaustiveCheck: never = action;
    }
    return state || UnloadedState;
};
