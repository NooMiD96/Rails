import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import counter from "./counter/store";
import fetchdata from "./fetchdata/store";

import { IStore } from "./IStore";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store<IStore>({
  modules: {
    counter,
    fetchdata,
  },
  strict: debug,
  plugins: debug ? [createLogger({})] : [],
});
