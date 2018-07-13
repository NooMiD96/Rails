import * as React from 'react';
import {
    TStateToProps,
    TDispatchToProps,
    TOwnState
} from "./TCounter";
import Button from "antd/lib/button/button";
import ButtonGroup from "antd/lib/button/button-group";
import Icon from "antd/lib/icon/index";
import "antd/lib/button/style/css";
import "antd/lib/icon/style/css";
import CounterWrapper from "./Counter.style";

export class Counter extends React.Component<TStateToProps & TDispatchToProps, TOwnState> {
    public render() {
        const { count, Increment, Decrement } = this.props;

        return <CounterWrapper>
            <h1>Counter</h1>
            <p>Current count: <Button
                shape="circle"
                className="display-button-current-count"
            >
                {count}
            </Button></p>
            
            <ButtonGroup>
                <Button
                    type="primary"
                    ghost
                    onClick={() => Decrement()}
                >
                    <Icon type="down-circle-o" />Decrement
                </Button>
                <Button
                    type="primary"
                    ghost
                    onClick={() => Increment()}
                >
                    Increment<Icon type="up-circle-o" />
                </Button>
            </ButtonGroup>
        </CounterWrapper>;
    }
}
