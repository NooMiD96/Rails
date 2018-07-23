import * as React from "react";

import Spin from "@core/Spin";
import AsyncComponentWrapper from "./style/AsyncComponent.style";

export function AsyncComponent(ComponentLoader: any) {
    interface IState {
        Component: any;
    }
    class AsyncComponent extends React.Component<any, IState> {
        state: IState = {
            Component: null,
        };

        async componentDidMount() {
            const Component = await ComponentLoader();
            this.setState({
                Component: Component.default,
            });
        }

        render() {
            const { Component } = this.state;
            const isLoading = !Component;
            return (
                <Spin
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
            );
        }
    }

    return AsyncComponent;
}
