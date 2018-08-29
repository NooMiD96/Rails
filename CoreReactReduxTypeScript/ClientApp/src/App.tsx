import * as React from "react";
import { Route } from "react-router-dom";

import { Layout } from "@src/components/Layout";
import { AsyncComponent } from "@src/core/AsyncComponent";

export const AppRoutes = <Layout>
    <Route exact path="/" component={ AsyncComponent(() => import(/* webpackChunkName: "Home" */ "@src/components/Home/Home")) } />
    <Route exact path="/fetcher" component={ AsyncComponent(() => import(/* webpackChunkName: "Fetcher" */ "@src/components/Fetcher")) } />
    <Route exact path="/counter" component={ AsyncComponent(() => import(/* webpackChunkName: "Counter" */ "@src/components/Counter")) } />
</Layout>;
