import Vue from "vue";
import { State, Action } from "vuex-class";
import Component from "vue-class-component";

import { IState } from "./IFetchdata";

@Component
export default class UserDetail extends Vue {
  @State("fetchdata") fetchdata!: IState;
  @Action("getNewForecasts", { namespace: "fetchdata" }) getNewForecasts: any;

  mounted() {
    this.getNewForecasts();
  }
}
