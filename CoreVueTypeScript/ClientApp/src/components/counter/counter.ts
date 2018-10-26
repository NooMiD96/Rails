import Vue from "vue";
import { State, Action, Getter } from "vuex-class";
import Component from "vue-class-component";

import { IState } from "./ICounter";
const namespace = "counter";

@Component
export default class CounterComponent extends Vue {
  @State("counter") counter!: IState;
  @Getter("nextCount", { namespace }) nextCount!: number;
  @Action("incrementCounter", { namespace }) incrementCounter: any;
}
