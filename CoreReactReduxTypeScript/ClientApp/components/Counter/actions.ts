import * as t from "./actionsType";

// ----------------
// ACTIONS
export const actions = {
    IncrementCount: (): t.IncrementCountAction => ({
        type: 'INCREMENT_COUNT',
    }),
    DecrementCount: (): t.DecrementCountAction => ({
        type: 'DECREMENT_COUNT',
    })
}

// ----------------
// ACTION CREATORS
export const actionCreators = {
    Increment: actions.IncrementCount,
    Decrement: actions.DecrementCount,
};
