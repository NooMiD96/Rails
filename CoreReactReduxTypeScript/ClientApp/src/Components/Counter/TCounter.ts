import { RouteComponentProps } from "react-router-dom";

import { CounterState } from "./ICounterState";
import { ActionCreators } from "./actions";

type TStateToProps =
    CounterState
    & RouteComponentProps<{}>;

type TDispatchToProps =
    typeof ActionCreators;

type TOwnState = {};

export {
    TStateToProps,
    TDispatchToProps,
    TOwnState,
};
