import { IState as ICounterState } from "./counter/ICounter";
import { IState as IFetchdataState } from "./fetchdata/IFetchdata";

export type IStore = {
  counter: ICounterState;
  fetchdata: IFetchdataState;
};
