import { ActionContext } from "vuex";

import { IState } from "./ICounter";
import { IStore } from "../IStore";

// initial state
const state: IState = {
  count: 0,
};

// getters
const getters = {
  nextCount: (state: IState, _getters: {}, _rootState: IStore) => state.count + 1,
};

// actions
const actions = {
  incrementCounter({ commit }: ActionContext<IState, IStore>) {
    commit("inc");
  },
};

// mutations
const mutations = {
  inc(state: IState) {
    state.count++;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
