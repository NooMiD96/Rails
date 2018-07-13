import { CounterState } from './components/Counter/ICounterState';
import { reducer as CounterReducer } from './components/Counter/reducer';

export interface ApplicationState {
    counter: CounterState;
}

export const reducers = {
    counter: CounterReducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
