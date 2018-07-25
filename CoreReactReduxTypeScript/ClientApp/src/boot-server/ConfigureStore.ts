import { createStore, applyMiddleware, combineReducers, ReducersMapObject } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";

import * as StoreModule from "@src/Store";
const { reducers } = StoreModule;
type ApplicationState = StoreModule.ApplicationState;

export default function configureStore(history: History) {
    const allReducers = connectRouter(history)(buildRootReducer(reducers));
    const store = createStore(
        allReducers,
        applyMiddleware(thunk, routerMiddleware(history))
    );

    return store;
}

function buildRootReducer(allReducers: ReducersMapObject) {
    return combineReducers<ApplicationState>(Object.assign({}, allReducers));
}
