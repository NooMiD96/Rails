import * as React from 'react';
import { Route } from 'react-router-dom';

import { Layout } from './components/Layout';
import { AsyncComponent } from './core/AsyncComponent';

export const routes = <Layout>
    <Route exact path='/' component={ AsyncComponent(() => import(/* webpackChunkName: "Home" */ './components/Home/Home')) } />
    <Route exact path='/Fetcher' component={ AsyncComponent(() => import(/* webpackChunkName: "Fetcher" */ './components/Fetcher')) } />
    <Route exact path='/Counter' component={ AsyncComponent(() => import(/* webpackChunkName: "Counter" */ './components/Counter')) } />
</Layout>;
