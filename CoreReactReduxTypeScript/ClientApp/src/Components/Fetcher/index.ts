
import { connect } from "react-redux";

import { ActionCreators } from "./actions";
import {
    TOwnProps,
    TMapStateToProps,
    TMapDispatchToProps,
} from "./TFetcher";
import Fetcher from "./Component";
import { ApplicationState } from "@src/Store";

const mapStateToProps = (state: ApplicationState, ownProp: TOwnProps): TMapStateToProps => ({
    ...state.fetcher,
    ...ownProp,
});

const mapDispatchToProps: TMapDispatchToProps = {
    ...ActionCreators,
};

export default connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(Fetcher);
