import * as React from 'react';
import { Spin } from 'antd';
import AsyncComponentWrapper from "./style/AsyncComponent.style";

class AsyncComponentClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Component: null
        };
    }

    async componentDidMount() {
        const Component = await this.props.ComponentLoader();
        this.setState({
            Component: Component.default
        });
    }

    render() {
        const { Component } = this.state;
        const isLoading = !Component;
        return <Spin
            spinning={isLoading}
            className="loading-spin-container"
            tip="Loading..."
        >
            <AsyncComponentWrapper
                isLoading={isLoading}
            >
                {(Component && <Component {...this.props} />)}
            </AsyncComponentWrapper>
        </Spin>
    }
}

export const AsyncComponent = (ComponentLoader) => (props) => (
    <AsyncComponentClass
        {...props}
        ComponentLoader={ComponentLoader}
    />
);
