import { FetcherState } from './IFetcherState';
import { ActionCreators } from './actions';

type TStateToProps = 
    FetcherState;

type TDispatchToProps =
    typeof ActionCreators;
    
type TOwnState = {
    text: string
}

export {
    TStateToProps,
    TDispatchToProps,
    TOwnState,
}
