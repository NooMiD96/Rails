
import { connect } from "react-redux";

import { ApplicationState } from "@src/Store";
import { ActionCreators } from "./actions";
import {
    TStateToProps,
    TDispatchToProps,
} from "./TFetcher";
import { Fetcher } from "./Fetcher";

const mapStateToProps = (state: ApplicationState) => ({
    ...state.fetcher,
} as TStateToProps);

const mapDispatchToProps = {
    ...ActionCreators,
} as TDispatchToProps;

export default connect<TStateToProps, TDispatchToProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(Fetcher) as typeof Fetcher;
