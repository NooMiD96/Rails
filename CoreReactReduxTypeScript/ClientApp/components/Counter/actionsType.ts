// -----------------
// ACTIONS TYPE
export interface IncrementCountAction { type: 'INCREMENT_COUNT' }
export interface DecrementCountAction { type: 'DECREMENT_COUNT' }

type KnownAction = IncrementCountAction | DecrementCountAction;
export default KnownAction;
