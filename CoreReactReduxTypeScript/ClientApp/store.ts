import { CounterState } from './components/Counter/ICounterState';
import { reducer as CounterReducer } from './components/Counter/reducer';
import { FetcherState } from './components/Fetcher/IFetcherState';
import { reducer as FetcherReducer } from './components/Fetcher/reducer';

export interface ApplicationState {
    counter: CounterState;
    fetcher: FetcherState;
}

export const reducers = {
    counter: CounterReducer,
    fetcher: FetcherReducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
