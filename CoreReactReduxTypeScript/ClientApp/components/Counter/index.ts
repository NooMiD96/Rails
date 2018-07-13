
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { actionCreators } from './actions';
import {
    TStateToProps,
    TDispatchToProps,
    TOwnState
} from "./TCounter";
import { Counter } from "./Counter";

const mapStateToProps = (state: ApplicationState) => ({
    ...state.counter
} as TStateToProps);

const mapDispatchToProps = {
    ...actionCreators
} as TDispatchToProps

export default connect<TStateToProps, TDispatchToProps, TOwnState>(
    mapStateToProps,
    mapDispatchToProps
)(Counter) as typeof Counter;
