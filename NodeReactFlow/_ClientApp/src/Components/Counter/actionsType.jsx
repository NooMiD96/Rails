// -----------------
// ACTIONS TYPE
export const INCREMENT_COUNT = "INCREMENT_COUNT";
export const DECREMENT_COUNT = "DECREMENT_COUNT";
// -----------------
// ACTIONS INTERFACE
export interface IIncrementCount { type: typeof INCREMENT_COUNT; }
export interface IDecrementCount { type: typeof DECREMENT_COUNT; }

type KnownAction = IIncrementCount | IDecrementCount;
export default KnownAction;
