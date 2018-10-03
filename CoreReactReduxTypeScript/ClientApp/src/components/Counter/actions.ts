import * as t from "./actionsType";
// ----------------
// ACTIONS
export const Actions = {
    IncrementCount: (): t.IIncrementCount => ({
        type: t.INCREMENT_COUNT,
    }),
    DecrementCount: (): t.IDecrementCount => ({
        type: t.DECREMENT_COUNT,
    }),
};
// ----------------
// ACTION CREATORS
export const ActionCreators = {
    Increment: Actions.IncrementCount,
    Decrement: Actions.DecrementCount,
};
