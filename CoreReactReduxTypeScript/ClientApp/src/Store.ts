import { RouterState } from "connected-react-router";
import { CounterState } from "@src/components/Counter/ICounterState";
import { reducer as CounterReducer } from "@src/components/Counter/reducer";
import { FetcherState } from "@src/components/Fetcher/IFetcherState";
import { reducer as FetcherReducer } from "@src/components/Fetcher/reducer";

export interface ApplicationState {
    router: RouterState;
    counter: CounterState;
    fetcher: FetcherState;
}

export const reducers = {
    counter: CounterReducer,
    fetcher: FetcherReducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
