import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AsyncComponent } from './core/AsyncComponent';

export const routes = <Layout>
    <Route exact path='/' component={ AsyncComponent(() => import(/* webpackChunkName: "Home" */ './components/Home')) } />
    <Route exact path='/Comp2' component={ AsyncComponent(() => import(/* webpackChunkName: "Comp2" */ './components/Comp2')) } />
    <Route exact path='/Counter' component={ AsyncComponent(() => import(/* webpackChunkName: "Counter" */ './components/Counter')) } />
</Layout>;
