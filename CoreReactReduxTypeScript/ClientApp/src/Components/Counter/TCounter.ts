import { CounterState } from "./ICounterState";
import { ActionCreators } from "./actions";
import { RouteComponentProps } from "react-router";
// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = CounterState;
export type TOwnProps = RouteComponentProps<{}>;
export type TMapStateToProps = TStateToProps
    & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof ActionCreators;
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
    & TMapDispatchToProps;
