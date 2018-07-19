
import { connect } from "react-redux";

import { ApplicationState } from "@src/Store";
import { ActionCreators } from "./actions";
import {
    TStateToProps,
    TDispatchToProps,
} from "./TCounter";
import { Counter } from "./Counter";

const mapStateToProps = (state: ApplicationState) => ({
    ...state.counter,
} as TStateToProps);

const mapDispatchToProps = {
    ...ActionCreators,
} as TDispatchToProps;

export default connect<TStateToProps, TDispatchToProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(Counter) as typeof Counter;
