import * as React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { replace } from "connected-react-router";
import { renderToString } from "react-dom/server";
import { createMemoryHistory } from "history";
import { createServerRenderer, RenderResult } from "aspnet-prerendering";

import configureStore from "./configureStore";
import { AppRoutes } from "@src/App";
import initReduxForComponent from "@core/BootServerHelper";
import { ActionsList } from "@components/Account/actions";

export default createServerRenderer(params =>
  new Promise<RenderResult>(async (resolve, reject) => {
    // Prepare Redux store with in-memory history, and dispatch a navigation event
    // corresponding to the incoming URL
    const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
    const urlAfterBasename = params.url.substring(basename.length);
    const history = createMemoryHistory();
    history.replace(urlAfterBasename);
    const store = configureStore(history);
    // store.dispatch(replace(urlAfterBasename));

    // Prepare an instance of the application and perform an inital render that will
    // cause any async tasks (e.g., data access) to begin
    const splitedUrl = urlAfterBasename.split("/").filter(Boolean);
    initReduxForComponent(splitedUrl, store);
    if (params.data.user) {
      store.dispatch(
        ActionsList.SetUser(
          JSON.parse(params.data.user)
        )
      );
    }
    const routerContext: any = {};

    const app = (
      <Provider store={store}>
        <StaticRouter
          basename={basename}
          context={routerContext}
          // location={urlAfterBasename}
          location={{pathname: urlAfterBasename}}
          children={AppRoutes}
        />
      </Provider>
    );

    renderToString(app);

    // If there's a redirection, just send this information back to the host application
    if (routerContext.url) {
      resolve({ redirectUrl: routerContext.url });
      return;
    }

    // Once any async tasks are done, we can perform the final render
    // We also send the redux store state, so the client can continue execution where the server left off
    params.domainTasks.then(() => {
      resolve({
        html: renderToString(app),
        globals: {
          initialReduxState: store.getState(),
          data: JSON.parse(params.data.user),
          urlAfterBasename: urlAfterBasename,
          history: history,
        },
      });
    }, reject); // Also propagate any errors back into the host application
  })
);
