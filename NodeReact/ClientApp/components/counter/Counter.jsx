import * as React from 'react';
import { connect } from 'react-redux';
import ActionCreators from "./actions";
import Hot from "core/Hot";
import { Button } from "antd";

export class Counter extends React.Component {
    render() {
        const { counter, Increment, Decrement } = this.props;
        return <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p>Current count: <strong>{counter.count}</strong></p>

            <Button onClick={() => { Increment() }}>Increment</Button>
            <Button onClick={() => { Decrement() }}>Decrement</Button>
        </div>;
    }
}

export default Hot(module,
    connect(
        state => ({
            counter: state.counter
        }),
        (ActionCreators)
    )(Counter)
);