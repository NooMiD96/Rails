import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export function AsyncComponent(ComponentLoader: any) {
    interface IState {
        Component: any;
    }
    class AsyncComponent extends React.Component<RouteComponentProps<{}>, IState> {
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
            const Component = this.state.Component;

            return (
                <div>
                    {
                        (Component && <Component routeProps />) || <p>Loading...</p>
                    }
                </div>
            );
        }
    }

    return AsyncComponent;
}
