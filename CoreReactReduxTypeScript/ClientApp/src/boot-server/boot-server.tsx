import * as React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { createMemoryHistory } from "history";
import { createServerRenderer, RenderResult } from "aspnet-prerendering";

import configureStore from "./configureStore";
import { AppRoutes } from "@src/App";
import initReduxForComponent from "@core/BootServerHelper";
import { ActionsList } from "@components/Account/actions";
import { UnloadedState } from "@components/Account/IAccountState";
import { TUserModel } from "@components/Account/TAccount";
import { getUrlPathnameToCheck, isUserHavePermissions } from "@core/helpers/route";
import { routesArray } from "@core/constants";

export default createServerRenderer(params =>
  new Promise<RenderResult>(async (resolve, reject) => {
    // Prepare Redux store with in-memory history, and dispatch a navigation event
    const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
    const urlAfterBasename = params.url.substring(basename.length);
    const history = createMemoryHistory();
    // init user model
    let userModel: TUserModel = {
      userName: "",
      userType: UnloadedState.userType,
    };
    if (params.data.user) {
      userModel = JSON.parse(params.data.user);
    }
    // check access to the requested url and change history entries
    if (isUserHavePermissions(
      userModel.userType,
      getUrlPathnameToCheck(urlAfterBasename)
    )) {
      history.replace(urlAfterBasename);
    } else {
      // If there's a redirection, just send this information back to the host application
      resolve({ redirectUrl: routesArray[0] });
      return;
    }
    // create a store and dispatch the user information
    const store = configureStore(history);
    store.dispatch(ActionsList.SetUser(userModel));
    // init state corresponding to the incoming URL
    const splitedUrl = urlAfterBasename.split("?")[0].split("/").filter(Boolean);
    initReduxForComponent(splitedUrl, store);
    // Prepare an instance of the application and perform an inital render that will
    // cause any async tasks (e.g., data access) to begin
    const app = (
      <Provider store={store}>
        <StaticRouter
          basename={basename}
          context={{}}
          location={params.location.path}
          children={AppRoutes}
        />
      </Provider>
    );
    // Once any async tasks are done, we can perform the final render
    // We also send the redux store state, so the client can continue execution where the server left off
    params.domainTasks.then(() => {
      resolve({
        html: renderToString(app),
        globals: {
          initialReduxState: store.getState(),
        },
      });
    }, reject); // Also propagate any errors back into the host application
  })
);
