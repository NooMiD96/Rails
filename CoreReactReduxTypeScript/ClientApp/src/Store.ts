import { RouterState } from "connected-react-router";
import { CounterState } from "@src/components/Counter/ICounterState";
import { reducer as CounterReducer } from "@src/components/Counter/reducer";
import { FetcherState } from "@src/components/Fetcher/IFetcherState";
import { reducer as FetcherReducer } from "@src/components/Fetcher/reducer";
import { AccountState } from "@src/components/Account/IAccountState";
import { reducer as AccountReducer } from "@src/components/Account/reducer";
import { TodoListState } from "@src/components/TodoList/ITodoListState";
import { reducer as TodoListReducer } from "@src/components/TodoList/reducer";

export interface ApplicationState {
    account: AccountState;
    counter: CounterState;
    fetcher: FetcherState;
    router: RouterState;
    todoList: TodoListState;
}

export const reducers = {
    account: AccountReducer,
    counter: CounterReducer,
    fetcher: FetcherReducer,
    todoList: TodoListReducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
