
import { connect } from "react-redux";

import {
    TOwnProps,
    TMapStateToProps,
    TMapDispatchToProps,
} from "./TTodoList";
import { ApplicationState } from "@src/Store";

import { ActionCreators } from "./actions";
import { TodoList } from "./Component/TodoList";

const mapStateToProps = (state: ApplicationState, ownProp: TOwnProps): TMapStateToProps => ({
    ...state.todoList,
    ...ownProp,
});

const mapDispatchToProps: TMapDispatchToProps = {
    ...ActionCreators,
};

export default connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
