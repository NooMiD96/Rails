import * as React from "react";
import { Route } from "react-router-dom";

import { Layout } from "@components/Layout";
import { AsyncComponent } from "@core/HOC/AsyncComponent";

export const AppRoutes = (
  <Layout>
    <Route exact path="/" component={AsyncComponent(() => import(/* webpackChunkName: "Home" */ "@src/components/Home/Home"))} />
    <Route exact path="/fetcher" component={AsyncComponent(() => import(/* webpackChunkName: "Fetcher" */ "@src/components/Fetcher"))} />
    <Route exact path="/counter" component={AsyncComponent(() => import(/* webpackChunkName: "Counter" */ "@src/components/Counter"))} />
    <Route exact path="/todolist" component={AsyncComponent(() => import(/* webpackChunkName: "TodoList" */ "@src/components/TodoList"))} />
  </Layout>
);
