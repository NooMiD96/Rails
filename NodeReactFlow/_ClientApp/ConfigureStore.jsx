import { createStore, applyMiddleware, compose, combineReducers, ReducersMapObject } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";

import * as StoreModule from "@src/Store";
const { reducers } = StoreModule;
type ApplicationState = StoreModule.ApplicationState;

export default function configureStore(history: History, initialState: ApplicationState) {
    let devToolsExtension;
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
        devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;
    }
    if (initialState.router) {
        delete initialState.router;
    }

    const store = createStore(
        connectRouter(history)(buildRootReducer(reducers)),
        initialState,
        compose(
            applyMiddleware(thunk, routerMiddleware(history)),
            devToolsExtension ? devToolsExtension() : (next) => next
        )
    );

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept("@src/Store", () => {
            // tslint:disable-next-line
            const nextRootReducer = require<typeof StoreModule>("@src/Store");
            store.replaceReducer(
                connectRouter(history)(
                    buildRootReducer(nextRootReducer.reducers)
                )
            );
        });
    }

    return store;
}

function buildRootReducer(allReducers: ReducersMapObject) {
    return combineReducers<ApplicationState>(Object.assign({}, allReducers));
}
