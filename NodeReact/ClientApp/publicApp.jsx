import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0]
    ? document.getElementsByTagName('base')[0].getAttribute('href')
    : '/';
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window).initialReduxState;
const store = configureStore(history, initialState);

export function renderApp() {
    let routes = require(`./routes`).routes;
    // This code starts up the React app when it runs in a browser. It sets up the routing configuration
    // and injects the app into a DOM element.
    ReactDOM.render(
        <Provider store={ store }>
            <ConnectedRouter history={ history } children={ routes } />
        </Provider>,
        document.getElementById('react-app')
    );
}
