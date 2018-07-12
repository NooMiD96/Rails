import * as t from "./actionsType";

// ----------------
// ACTIONS
export const actions = {
    IncrementCount: () => ({
        type: t.IncrementCount
    }),
    DecrementCount: () => ({
        type: t.DecrementCount
    }),
}

// ----------------
// ACTION CREATORS
const ActionCreators = {
    Increment: actions.IncrementCount,
    Decrement: actions.DecrementCount,
}

export default ActionCreators;
