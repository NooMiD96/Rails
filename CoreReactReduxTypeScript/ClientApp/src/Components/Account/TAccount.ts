import { AccountState } from "./IAccountState";
import { ActionCreators } from "./actions";
// -----------------------------
// STATE OF COMPONENT
export enum ModalTypeEnums {
    Nothing,
    Authentication,
    Registration,
}
export type TComponentState = {
    modalType: ModalTypeEnums,
    loading: boolean,
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = AccountState;
export type TOwnProps = {};
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
