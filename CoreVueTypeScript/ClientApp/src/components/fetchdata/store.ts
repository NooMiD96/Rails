import { ActionContext } from "vuex";

import { IState, WeatherForecast } from "./IFetchdata";
import { IStore } from "../IStore";
import * as api from "./api";
// initial state
const state: IState = {
  forecasts: [],
  pending: false,
};

// getters
const getters = {};

// actions
const actions = {
  getNewForecasts({ commit }: ActionContext<IState, IStore>) {
    commit("startPending");

    api.getForecasts(
      (data: WeatherForecast[]) => {
        commit("setNewForecasts", data);
      },
      (err: Error) => {
        console.error(err);
        commit("endPending");
      }
    );
  },
};

// mutations
const mutations = {
  setNewForecasts(state: IState, payload: WeatherForecast[]) {
    state.forecasts = payload;
    state.pending = false;
  },
  startPending(state: IState) {
    state.pending = true;
  },
  endPending(state: IState) {
    state.pending = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
