import { RouteComponentProps } from 'react-router-dom';
import { CounterState } from './ICounterState';
import { actionCreators } from './actions';

type TStateToProps = 
    CounterState
    & RouteComponentProps<{}>;

type TDispatchToProps =
    typeof actionCreators;
    
type TOwnState = {}

export {
    TStateToProps,
    TDispatchToProps,
    TOwnState,
}
