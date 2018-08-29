import { RouteComponentProps } from "react-router";
import { TodoListState } from "./ITodoListState";
import { ActionCreators } from "./actions";
// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
    text: string;
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = TodoListState;
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
