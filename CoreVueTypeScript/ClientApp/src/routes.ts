import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "name",
    component: () => import(/* webpackChunkName: "home" */ "./components/home/home.vue"),
  },
  {
    path: "/counter",
    name: "counter",
    component: () => import(/* webpackChunkName: "counter" */ "./components/counter/counter.vue"),
  },
  {
    path: "/fetchdata",
    name: "fetchdata",
    component: () => import(/* webpackChunkName: "fetchdata" */ "./components/fetchdata/fetchdata.vue"),
  },
];

const vueRouter = new VueRouter({
  mode: "history",
  routes: routes,
});

export default vueRouter;
