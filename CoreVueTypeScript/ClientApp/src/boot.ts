import "./css/site.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import Vue from "vue";
import VueRouter from "./routes";

import store from "./components/store";
import App from "./components/app/app.vue";

// tslint:disable:no-unused-expression
new Vue({
  el: "#app-root",
  router: VueRouter,
  store,
  render: h => h(App),
});
