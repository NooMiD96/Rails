// ----------------
// REDUCER
import { Reducer } from "redux";

import { CounterState, UnloadedState } from "./ICounterState";
import KnownAction from "./actionsType";

export const reducer: Reducer<CounterState> = (state: CounterState = UnloadedState, action: KnownAction) => {
    switch (action.type) {
        case "INCREMENT_COUNT":
            return { count: state.count + 1 };
        case "DECREMENT_COUNT":
            return { count: state.count - 1 };
        default:
            const exhaustiveCheck: never = action;
    }
    return state;
};
