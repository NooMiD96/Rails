import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from "./actions";
import Hot from "core/Hot";
import { Button } from "antd";

export class Counter extends React.Component {
    render() {
        return <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p>Current count: <strong>{this.props.counter.count}</strong></p>

            <Button onClick={() => { this.props.increment() }}>Increment</Button>
            <Button onClick={() => { this.props.decrement() }}>Decrement</Button>
        </div>;
    }
}

export default Hot(module,
    connect(
        state => ({
            counter: state.counter
        }),
        (actionCreators)
    )(Counter)
);